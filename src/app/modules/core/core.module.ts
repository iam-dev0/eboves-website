import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    AboutUsComponent,
    ComingSoonComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    AboutUsComponent,
    ComingSoonComponent,
    NotFoundComponent,
  ],
})
export class CoreModule {}
