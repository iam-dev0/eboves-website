import { CartComponent } from './components/cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [CartComponent, CheckoutComponent],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
