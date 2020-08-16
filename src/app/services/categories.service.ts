import { Product } from '@models/product.model';
import { map, filter } from 'rxjs/operators';
import { Response } from '@models/api-responses/response.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Category } from '@models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private client: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.client
      .get<Response<Category[]>>(`${environment.apiUrl}categories`)
      .pipe(map(({ data }) => data));
  }

  getCategoryInfo(catSlug: string): Observable<Category> {
    return this.client
      .get<Response<Category>>(`${environment.apiUrl}categories/${catSlug}`)
      .pipe(map(({ data }) => data));
  }

  getFeatured(catSlug: string, pageSize: number = 10): Observable<Product[]> {
    return this.client
      .get<Response<Product[]>>(
        `${environment.apiUrl}products?featured=true&catSlug=${catSlug}&pageSize=${pageSize}`
      )
      .pipe(map(({ data }) => data));
  }

  getBestSeller(
    catSlug: string,
    pageSize: number = 100
  ): Observable<Product[]> {
    return this.client
      .get<Response<Product[]>>(
        `${environment.apiUrl}products?bestSeller=true&categorySlug=${catSlug}&pageSize=${pageSize}`
      )
      .pipe(map(({ data }) => data));
  }

  getSubCategoryProducts(
    subCatSlug: string,
    pageSize: number = 100
  ): Observable<Product[]> {
    return this.client
      .get<Response<Product[]>>(
        `${environment.apiUrl}products?subCategorySlug=${subCatSlug}&pageSize=${pageSize}`
      )
      .pipe(
        map(({ data }) => {
          return data;
        })
      );
  }
}
