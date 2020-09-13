import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductStickyBarComponent } from './components/product-sticky-bar/product-sticky-bar.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ProductAdditionalInfoComponent } from './components/product-additional-info/product-additional-info.component';
import { ProductShippingAndReturnsComponent } from './components/product-shipping-and-returns/product-shipping-and-returns.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { ProductSimilarComponent } from './components/product-similar/product-similar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductStickyBarComponent,
    ProductDescriptionComponent,
    ProductAdditionalInfoComponent,
    ProductShippingAndReturnsComponent,
    ProductReviewsComponent,
    ProductSimilarComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, CarouselModule, SharedModule],
})
export class ProductModule {}
