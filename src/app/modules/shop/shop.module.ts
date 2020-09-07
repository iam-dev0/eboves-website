import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandComponent } from './components/brand/brand.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { SharedModule } from '@modules/shared/shared.module';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    ShopComponent,
    CategoryComponent,
    BrandComponent,
    SubcategoryComponent,
    ProductListingComponent,
    SearchComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule, Ng5SliderModule],
})
export class ShopModule {}
