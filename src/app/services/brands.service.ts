import { map, delay, catchError } from 'rxjs/operators';
import { Product } from '@models/product.model';
import { Response } from '@models/api-responses/response.model';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Brand } from '@models/brand.model';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private client: HttpClient) {}

  getBrandProducts(brandSlug: string): Observable<Product[]> {
    return this.client
      .get<Response<Product[]>>(
        `${environment.apiUrl}products?brandSlug=${brandSlug}&pageSize=100`
      )
      .pipe(map(({ data }) => data));
  }

  getBrandInfo(brandSlug: string): Observable<Brand> {
    return this.client
      .get<Response<Brand>>(`${environment.apiUrl}brands/${brandSlug}`)
      .pipe(map(({ data }) => data));
  }
}
