import { SeoService } from '@services/seo.service';
import { CartItem } from '@models/cart-item.model';
import { Cart } from '@models/cart.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';
import { SHIPPING_CHARGES, SHIPPING_TYPES } from 'src/constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;
  shippingCharges = SHIPPING_CHARGES;
  shippingTypes = SHIPPING_TYPES;
  selectedShipping: string = SHIPPING_TYPES.STANDARD;

  constructor(
    private cartService: CartService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setTitle('Cart - eboves');
    this.seoService.setMetaTags();
    this.cartService.checkStock();
    this.cart$ = this.cartService.getCart();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.variation.slug);
  }

  updateQty(event) {
    this.cartService.updateQty(event?.cartItem?.variation?.slug, event?.newQty);
  }

  handleShippingChange(event, shippingType) {
    if (event.target.checked) {
      this.selectedShipping = shippingType;
    }
  }
}
