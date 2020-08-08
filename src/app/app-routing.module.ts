import { AboutUsComponent } from '@modules/core/components/about-us/about-us.component';
import { ComingSoonComponent } from '@modules/core/components/coming-soon/coming-soon.component';
import { NotFoundComponent } from '@modules/core/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqsComponent } from '@modules/core/components/faqs/faqs.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
  },
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
    path: 'wishlist',
    loadChildren: () =>
      import('@modules/wishlist/wishlist.module').then((m) => m.WishlistModule),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('@modules/contact-us/contact-us.module').then(
        (m) => m.ContactUsModule
      ),
  },
  { path: 'coming-soon', component: ComingSoonComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'faqs', component: FaqsComponent },
  {
    path: 'test',
    loadChildren: () =>
      import('@modules/test/test.module').then((m) => m.TestModule),
  },
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
