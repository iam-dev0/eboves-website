import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandComponent } from './components/brand/brand.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';

@NgModule({
  declarations: [
    ShopComponent,
    CategoryComponent,
    BrandComponent,
    SubcategoryComponent,
  ],
  imports: [CommonModule, ShopRoutingModule],
})
export class ShopModule {}
