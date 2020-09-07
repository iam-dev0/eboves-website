import { Observable, of } from 'rxjs';
import { Product } from '@models/product.model';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ProductService } from '@services/product.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Product> {
  constructor(private service: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product | Observable<Product> | Promise<Product> {
    return this.service
      .getProduct(
        route.paramMap.get('slug'),
        route.queryParamMap.get('varSlug')
      )
      .pipe(
        catchError(() => {
          return of(null);
        })
      );
  }
}
