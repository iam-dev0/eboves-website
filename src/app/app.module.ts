import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorsProvider } from '@services/http-interceptors';
import { NotifierConfig, NotifierModule } from 'angular-notifier';

const notifierConfig: NotifierConfig = {
  animations: {
    enabled: true,
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
  behaviour: {
    autoHide: 6000,
    onClick: false,
    onMouseover: false,
    showDismissButton: true,
    stacking: 6,
  },
  position: {
    horizontal: {
      distance: 20,
      position: 'right',
    },
    vertical: {
      distance: 30,
      position: 'top',
      gap: 10,
    },
  },
  theme: 'material',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    BrowserTransferStateModule,
    NotifierModule.withConfig(notifierConfig),
  ],
  providers: [HttpInterceptorsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
