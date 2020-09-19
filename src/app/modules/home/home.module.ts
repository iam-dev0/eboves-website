import { NewsletterModalComponent } from './components/newsletter-modal/newsletter-modal.component';
import { HomeService } from '@services/home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IntroSliderComponent } from './components/intro-slider/intro-slider.component';
import { BrandsListComponent } from './components/brands-list/brands-list.component';
import { BannersComponent } from './components/banners/banners.component';
import { ProductTabsComponent } from './components/product-tabs/product-tabs.component';
import { DealsSectionComponent } from './components/deals-section/deals-section.component';
import { TopSellingProductsComponent } from './components/top-selling-products/top-selling-products.component';
import { BlogSectionComponent } from './components/blog-section/blog-section.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    IntroSliderComponent,
    BrandsListComponent,
    BannersComponent,
    ProductTabsComponent,
    DealsSectionComponent,
    TopSellingProductsComponent,
    BlogSectionComponent,
    NewsletterModalComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, CarouselModule, SharedModule],
})
export class HomeModule {}
