import { CartComponent } from './components/cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CartRoutingModule } from './cart-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartListComponent } from './components/cart/components/cart-list/cart-list.component';
import { CartListItemComponent } from './components/cart/components/cart-list-item/cart-list-item.component';
import { OrderDetailsComponent } from './components/checkout/components/order-details/order-details.component';
import { BillingFormComponent } from './components/checkout/components/billing-form/billing-form.component';

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    CartListComponent,
    CartListItemComponent,
    OrderDetailsComponent,
    BillingFormComponent,
  ],
  imports: [CommonModule, CartRoutingModule, ReactiveFormsModule, FormsModule],
})
export class CartModule {}
