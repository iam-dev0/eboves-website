import { Observable } from 'rxjs';
import { CartService } from '@services/cart.service';
import { Cart } from '@models/cart.model';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SHIPPING_CHARGES, SHIPPING_TYPES } from 'src/constants';
import { CartItem } from '@models/cart-item.model';
import { getDiscountedPrice } from '@utils';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() cart: Cart;
  shippingCharges: number = 0;
  formStatus: Observable<string> = this.cartService.formStatus;

  private subscriptions = new SubSink();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const change in changes) {
      if (changes.hasOwnProperty(change)) {
        const cart = changes[change];
        switch (change) {
          case 'cart':
            this.shippingCharges =
              cart.currentValue?.total > 3000
                ? SHIPPING_CHARGES[SHIPPING_TYPES.FREE]
                : SHIPPING_CHARGES[
                    this.cart.shippingType || SHIPPING_TYPES.STANDARD
                  ];
            break;
          default:
        }
      }
    }
  }

  placeOrder() {
    this.subscriptions.sink = this.cartService
      .placeOrder()
      .subscribe((order) => {
        console.log(order);
      });
  }

  getPrice({ variation, qty }: CartItem): number {
    return getDiscountedPrice(variation) * qty;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
