import { RouterModule } from '@angular/router';
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
import { ProductQuickViewComponent } from './components/product-quick-view/product-quick-view.component';
import { ProductFeaturesComponent } from './components/product-features/product-features.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ProductAttributeComponent } from './components/product-attribute/product-attribute.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

@NgModule({
  declarations: [
    SignInModalComponent,
    ProductCardVertActionsComponent,
    ProductCardSimpleComponent,
    ProductCarouselComponent,
    ProductGridComponent,
    TabsComponent,
    ProductQuickViewComponent,
    ProductFeaturesComponent,
    ImageGalleryComponent,
    ProductAttributeComponent,
    EllipsisPipe,
  ],
  imports: [CommonModule, CarouselModule, NgxPaginationModule, RouterModule],
  exports: [
    SignInModalComponent,
    ProductCardVertActionsComponent,
    ProductCardSimpleComponent,
    ProductCardSimpleComponent,
    ProductCarouselComponent,
    ProductGridComponent,
    TabsComponent,
    ProductFeaturesComponent,
    ImageGalleryComponent,
    EllipsisPipe,
  ],
})
export class SharedModule {}
