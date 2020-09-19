import { Response } from '@models/api-responses/response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Banners } from '@models/api-responses/banners.model';
import { MainTabs } from '@models/api-responses/main-tabs.model';
import { Brand } from '@models/brand.model';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private client: HttpClient) {}

  getBanners(): Observable<Response<Banners>> {
    // console.log('getting banners');
    return this.client.get<Response<Banners>>(`${environment.apiUrl}banners`);
  }

  getMainTabsProducts(): Observable<Response<MainTabs>> {
    return this.client.get<Response<MainTabs>>(
      `${environment.apiUrl}products/main-tabs`
    );
  }

  getFeaturedBrands(): Observable<Brand[]> {
    return this.client
      .get<Response<Brand[]>>(`${environment.apiUrl}brands`)
      .pipe(map((response) => response.data));
  }

  getTopSellers(): Observable<Product[]> {
    return this.client
      .get<Response<Product[]>>(
        `${environment.apiUrl}products?top-sellers=true&pageSize=10&pricelte=10000&pricegte=100`
      )
      .pipe(map(({ data }) => data));
  }
}
