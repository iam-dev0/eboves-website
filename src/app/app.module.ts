import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { productReducer } from './store/reducers/product.reducer';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorsProvider } from '@services/http-interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot({
      product: productReducer,
    }),
    HttpClientModule,
    BrowserTransferStateModule,
  ],
  providers: [HttpInterceptorsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
