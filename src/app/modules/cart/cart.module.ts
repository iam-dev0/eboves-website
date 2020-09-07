import { CartComponent } from './components/cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartListComponent } from './components/cart/components/cart-list/cart-list.component';
import { CartListItemComponent } from './components/cart/components/cart-list-item/cart-list-item.component';

@NgModule({
  declarations: [CartComponent, CheckoutComponent, CartListComponent, CartListItemComponent],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
