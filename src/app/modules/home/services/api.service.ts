import { Product } from './../../../models/product.model';
import { Injectable } from '@angular/core';
import {
  featuredProducts,
  onSaleProducts,
  topRatedProducts,
} from './mock-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private client: HttpClient) {}

  getBanners() {
    console.log('getting banners');
    return this.client.get(`${this.BASE_URL}/banners`);
  }

  getFeaturesProducts(): Product[] {
    return featuredProducts;
  }

  getOnSaleProducts(): Product[] {
    return onSaleProducts;
  }

  getTopRatedProducts(): Product[] {
    return topRatedProducts;
  }
}
