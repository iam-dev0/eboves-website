import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { ProductCardVertActionsComponent } from './components/product-card-vert-actions/product-card-vert-actions.component';
import { ProductCardSimpleComponent } from './components/product-card-simple/product-card-simple.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';

@NgModule({
  declarations: [
    SignInModalComponent,
    ProductCardVertActionsComponent,
    ProductCardSimpleComponent,
    ProductCarouselComponent,
  ],
  imports: [CommonModule, CarouselModule],
  exports: [
    SignInModalComponent,
    ProductCardVertActionsComponent,
    ProductCardSimpleComponent,
    ProductCardSimpleComponent,
    ProductCarouselComponent,
  ],
})
export class SharedModule {}
