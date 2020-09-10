import { Observable } from 'rxjs';
import { CartService } from '@services/cart.service';
import { SHIPPING_TYPES } from './../../../../../../../constants';
import { Cart } from '@models/cart.model';
import { Component, OnInit, Input } from '@angular/core';
import { SHIPPING_CHARGES } from 'src/constants';
import { CartItem } from '@models/cart-item.model';
import { getDiscountedPrice } from '@utils';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() cart: Cart;
  shippingCharges: number = 0;
  formStatus: Observable<string> = this.cartService.formStatus;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.shippingCharges =
      SHIPPING_CHARGES[this.cart.shippingType || SHIPPING_TYPES.STANDARD];
  }

  placeOrder() {
    this.cartService.placeOrder().subscribe((order) => {
      console.log(order);
    });
  }

  getPrice({ variation, qty }: CartItem): number {
    return getDiscountedPrice(variation) * qty;
  }
}
