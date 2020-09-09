import { ProductVariation } from '@models/product-variation.model';
import { map, tap } from 'rxjs/operators';
import { Response } from '@models/api-responses/response.model';
import { SHIPPING_TYPES, ORDER_SOURCE } from 'src/constants';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FORM_STATUS } from './../../constants';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { CartItem } from '@models/cart-item.model';
import { Cart } from '@models/cart.model';
import { CART_KEY } from '../../constants';
import { BillingForm } from '@models/billing-form.model';
import { OrderRequest } from '@models/api-requests/order-request.model';
import { OrderResponse } from '@models/api-responses/order-response.model';
import { StockResponse } from '@models/api-responses/stock-response.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$ = new BehaviorSubject<Cart>({ items: [], total: 0 });

  private formStatus$ = new BehaviorSubject<string>(FORM_STATUS.INVALID);
  formStatus: Observable<string> = this.formStatus$.asObservable();

  private formValues$ = new BehaviorSubject<BillingForm>({});
  formValues: Observable<BillingForm> = this.formValues$.asObservable();

  constructor(
    private localStorage: LocalStorageService,
    private client: HttpClient,
    private device: DeviceDetectorService
  ) {
    const cart = this.localStorage.get(CART_KEY);
    if (cart) this.cart$.next(cart);
  }

  bindFormStatus(formStatus: Observable<string>) {
    formStatus.subscribe(this.formStatus$);
  }

  bindFormValues(formValues: Observable<BillingForm>) {
    formValues.subscribe(this.formValues$);
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

  private isFormValid(): boolean {
    return this.formStatus$.value === FORM_STATUS.VALID;
  }

  private getOrder(): OrderRequest {
    const { items, shippingType } = this.cart$.value;
    const {
      firstName,
      lastName,
      email,
      phone,
      addressLineOne,
      addressLineTwo,
      city,
    } = this.formValues$.value;
    return new OrderRequest(
      this.device.isMobile()
        ? ORDER_SOURCE.WEBSITE_MOBILE
        : ORDER_SOURCE.WEBSITE_DESKTOP,
      shippingType || SHIPPING_TYPES.STANDARD,
      items.map(({ variation: { id }, qty: quantity }) => ({ id, quantity })),
      firstName,
      lastName,
      email,
      phone,
      `${addressLineOne} ${addressLineTwo}`,
      city
    );
  }

  private isCartEmpty(): boolean {
    return !this.getCartList().length;
  }

  private canPlaceOrder(): boolean {
    return this.isFormValid() && !this.isCartEmpty();
  }

  placeOrder(): Observable<OrderResponse> {
    if (this.canPlaceOrder()) {
      return this.client
        .post<Response<OrderResponse>>(
          `${environment.apiUrl}/orders/place-order`,
          this.getOrder()
        )
        .pipe(map(({ data }) => data));
    }

    return of(null);
  }

  private getSlugs(): string {
    return this.getCartList()
      .map((item) => item.variation.slug)
      .toString();
  }

  private updateStock(stocks: StockResponse[]) {
    const cart: CartItem[] = this.getCartList().map((item) => {
      const newStock = stocks.find(({ id }) => id === item.variation.id);
      return {
        ...item,
        variation: {
          ...item.variation,
          availableQuantity: newStock?.availableQuantity,
        },
      };
    });
    this.updateCart(cart);
  }

  checkStock() {
    this.client
      .get<Response<StockResponse[]>>(
        `${environment.apiUrl}/products/get-stock?slugs=${this.getSlugs()}`
      )
      .pipe(
        map(({ data }) => data),
        tap((data) => this.updateStock(data))
      );
  }
}
