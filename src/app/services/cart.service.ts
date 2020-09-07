import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { CartItem } from '@models/cart-item.model';
import { Cart } from '@models/cart.model';
import { CART_KEY } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$ = new BehaviorSubject<Cart>({ items: [], total: 0 });

  constructor(private localStorage: LocalStorageService) {
    const cart = this.localStorage.get(CART_KEY);
    if (cart) this.cart$.next(cart);
  }

  getCart(): Observable<Cart> {
    return this.cart$.asObservable();
  }

  addToCart(item: CartItem) {
    const cart = this.getCartList();
    const itemIndex = this.getItemIndex(item.variation.slug);
    if (itemIndex > -1) {
      cart[itemIndex].qty = item.qty;
    } else {
      cart.push(item);
    }
    this.updateCart(cart);
  }

  removeFromCart(varSlug: string) {
    const cart = this.getCartList();
    const itemIndex = this.getItemIndex(varSlug);
    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
      this.updateCart(cart);
    }
  }

  updateQty(varSlug: string, newQty: number) {
    const cart = this.getCartList();
    const itemIndex = this.getItemIndex(varSlug);
    if (itemIndex > -1) {
      cart[itemIndex].qty = newQty;
      this.updateCart(cart);
    }
  }

  private getItemIndex(varSlug: string): number {
    const cart = this.getCartList();
    return cart.findIndex(({ variation }) => variation.slug === varSlug);
  }

  private updateCart(cartItems: CartItem[]) {
    const cart: Cart = {
      items: cartItems,
      total: this.getTotal(cartItems),
    };
    this.cart$.next(cart);
    this.localStorage.set(CART_KEY, cart);
  }

  private getCartList(): CartItem[] {
    return this.cart$.value.items;
  }

  private getTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((acc, cur) => acc + this.getItemPrice(cur), 0);
  }

  private getItemPrice(cartItem: CartItem): number {
    const { qty, variation } = cartItem;
    return moment().isBetween(
      variation.discountStartTime,
      variation.discountEndTime
    )
      ? variation.discountPrice * qty
      : variation.price * qty;
  }
}
