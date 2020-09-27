import { RouterModule } from '@angular/router';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderTopComponent } from './components/header/components/header-top/header-top.component';
import { HeaderMiddleComponent } from './components/header/components/header-middle/header-middle.component';
import { HeaderBottomComponent } from './components/header/components/header-bottom/header-bottom.component';
import { HeaderSearchComponent } from './components/header/components/header-search/header-search.component';
import { CategoryDropdownComponent } from './components/header/components/category-dropdown/category-dropdown.component';
import { MegaMenuComponent } from './components/header/components/mega-menu/mega-menu.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { CategoryDropdownItemComponent } from './components/header/components/category-dropdown-item/category-dropdown-item.component';
import { CartDropdownComponent } from './components/header/components/cart-dropdown/cart-dropdown.component';
import { CartDropdownItemComponent } from './components/header/components/cart-dropdown-item/cart-dropdown-item.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { GTMComponent } from './components/gtm/gtm.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    AboutUsComponent,
    ComingSoonComponent,
    NotFoundComponent,
    HeaderTopComponent,
    HeaderMiddleComponent,
    HeaderBottomComponent,
    HeaderSearchComponent,
    CategoryDropdownComponent,
    MegaMenuComponent,
    FaqsComponent,
    CategoryDropdownItemComponent,
    CartDropdownComponent,
    CartDropdownItemComponent,
    LoaderComponent,
    TermsAndConditionsComponent,
    GTMComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    AboutUsComponent,
    ComingSoonComponent,
    NotFoundComponent,
    LoaderComponent,
    TermsAndConditionsComponent,
    GTMComponent,
  ],
})
export class CoreModule {}
