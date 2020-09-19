import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsComponent } from './contact-us.component';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    ContactUsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ContactUsModule {}
