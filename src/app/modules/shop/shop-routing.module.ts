import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { BrandComponent } from './components/brand/brand.component';
import { CategoryComponent } from './components/category/category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { BrandsResolver } from '@services/resolvers/brands.resolver';
import { CategoriesResolver } from '@services/resolvers/categories.resolver';
import { SearchComponent } from './components/search/search.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
