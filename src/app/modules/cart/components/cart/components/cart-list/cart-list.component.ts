import { CartItem } from '@models/cart-item.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isDiscountAvailable, getDiscountedPrice } from '@utils';
import { CART_ITEM_LIMIT } from 'src/constants';
import { CartService } from '@services/cart.service';

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  getPrice(cartItem: CartItem): number {
    return getDiscountedPrice(cartItem.variation);
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
