import { AboutUsComponent } from '@modules/core/components/about-us/about-us.component';
import { NotFoundComponent } from '@modules/core/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqsComponent } from '@modules/core/components/faqs/faqs.component';
import { TermsAndConditionsComponent } from '@modules/core/components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'product',
    loadChildren: () =>
      import('@modules/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('@modules/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('@modules/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('@modules/contact-us/contact-us.module').then(
        (m) => m.ContactUsModule
      ),
  },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'faqs', component: FaqsComponent },
  // 404 path
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
