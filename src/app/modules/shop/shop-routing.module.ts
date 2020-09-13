import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { BrandComponent } from './components/brand/brand.component';
import { CategoryComponent } from './components/category/category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandsResolver } from '@services/resolvers/brands.resolver';
import { CategoriesResolver } from '@services/resolvers/categories.resolver';
import { SearchComponent } from './components/search/search.component';
import { Under999Component } from './components/under999/under999.component';

const routes: Routes = [
  {
    path: 'category',
    children: [
      {
        path: ':catSlug',
        children: [
          {
            path: '',
            component: CategoryComponent,
            resolve: { category: CategoriesResolver },
            pathMatch: 'full',
          },
          {
            path: ':subCatSlug',
            children: [
              {
                path: '',
                component: SubcategoryComponent,
                resolve: { subcategory: CategoriesResolver },
                pathMatch: 'full',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'brand/:brandSlug',
    component: BrandComponent,
    resolve: { brand: BrandsResolver },
  },
  {
    path: 'search/:value',
    component: SearchComponent,
  },
  {
    path: 'best-seller',
    component: BestSellerComponent,
  },
  {
    path: 'under999',
    component: Under999Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
