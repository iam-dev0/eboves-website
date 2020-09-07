import { CartItem } from '@models/cart-item.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isDiscountAvailable } from '@utils';
import { CART_ITEM_LIMIT } from 'src/constants';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  @Output() onRemoveItem = new EventEmitter<CartItem>();
  @Output() onUpdateQty = new EventEmitter<{
    cartItem: CartItem;
    newQty: number;
  }>();
  @Input() cartList: CartItem[] = [];

  constructor() {}

  ngOnInit(): void {}

  getPrice(cartItem: CartItem): number {
    const { variation } = cartItem;
    return isDiscountAvailable(variation)
      ? variation.discountPrice
      : variation.price;
  }

  getItemTotal(cartItem: CartItem): number {
    return this.getPrice(cartItem) * cartItem.qty;
  }

  removeItem(cartItem: CartItem) {
    this.onRemoveItem.emit(cartItem);
  }

  decrementQty(item: CartItem) {
    item.qty > 1 &&
      this.onUpdateQty.emit({ cartItem: item, newQty: item.qty - 1 });
  }

  incrementQty(item: CartItem) {
    item.qty < CART_ITEM_LIMIT &&
      item.qty < item.variation.availableQuantity &&
      this.onUpdateQty.emit({ cartItem: item, newQty: item.qty + 1 });
  }
}
