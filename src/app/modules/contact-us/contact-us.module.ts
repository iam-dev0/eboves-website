import { ContactUsRoutingModule } from './contact-us-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsComponent } from './contact-us.component';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [ContactUsRoutingModule, CommonModule],
})
export class ContactUsModule {}
