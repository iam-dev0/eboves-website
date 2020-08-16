import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { ProductCardVertActionsComponent } from './components/product-card-vert-actions/product-card-vert-actions.component';
import { ProductCardSimpleComponent } from './components/product-card-simple/product-card-simple.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [
    SignInModalComponent,
    ProductCardVertActionsComponent,
    ProductCardSimpleComponent,
    ProductCarouselComponent,
    ProductGridComponent,
    TabsComponent,
  ],
  imports: [CommonModule, CarouselModule, NgxPaginationModule],
  exports: [
    SignInModalComponent,
    ProductCardVertActionsComponent,
    ProductCardSimpleComponent,
    ProductCardSimpleComponent,
    ProductCarouselComponent,
    ProductGridComponent,
    TabsComponent,
  ],
})
export class SharedModule {}
