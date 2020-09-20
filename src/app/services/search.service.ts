import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { map } from 'rxjs/operators';
import { Response } from '@models/api-responses/response.model';
import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private client: HttpClient) {}

  search(value: string): Observable<Product[]> {
    return this.client
      .get<Response<Product[]>>(
        `${environment.apiUrl}products?search=${value}&pageSize=100`
      )
      .pipe(map(({ data }) => data));
  }

  getBestSeller(): Observable<Product[]> {
    return this.client
      .get<Response<Product[]>>(
        `${environment.apiUrl}products?bestSeller=true&pageSize=100`
      )
      .pipe(map(({ data }) => data));
  }

  getUnder999(): Observable<Product[]> {
    return this.client
      .get<Response<Product[]>>(
        `${environment.apiUrl}products?pricelte=1000&pricegte=0&pageSize=100`
      )
      .pipe(map(({ data }) => data));
  }
}
