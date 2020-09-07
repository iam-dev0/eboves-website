import { ProductAttribute } from '@models/product-attribute.model';
import { ProductVariation } from '@models/product-variation.model';
import { map, tap } from 'rxjs/operators';
import { Response } from '@models/api-responses/response.model';
import { Product } from '@models/product.model';
import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private selectedVariation$ = new ReplaySubject<ProductVariation>();

  private product: Product;
  private selectedAttributes: ProductAttribute[] = [];

  constructor(
    private client: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getProduct(slug: string, varSlug: string): Observable<Product> {
    return this.client
      .get<Response<Product>>(`${environment.apiUrl}products/${slug}`)
      .pipe(
        map(({ data }) => data),
        tap((product) => {
          this.product = product;
          if (varSlug) {
            this.selectedVariation$.next(this.getVariation(product, varSlug));
          }
        })
      );
  }

  getSelectedVariation(): Observable<ProductVariation> {
    return this.selectedVariation$.asObservable();
  }

  getVariation(product: Product, varSlug: string) {
    return product?.variations?.find(({ slug }) => slug === varSlug);
  }

  updateAttributeValue(attribute: ProductAttribute) {
    const index = this.selectedAttributes.findIndex(
      ({ id, name, type }) =>
        id === attribute.id &&
        name === attribute.name &&
        type === attribute.type
    );
    if (index > -1) {
      this.selectedAttributes.splice(index, 1, attribute);
    } else {
      this.selectedAttributes.push(attribute);
    }
    this.updateSelectedVariation();
  }

  updateSelectedVariation() {
    const selectedVariation: ProductVariation = this.product.variations.find(
      ({ attributes }) => {
        let foundAll = true;
        attributes.forEach((av) => {
          if (
            foundAll &&
            !this.selectedAttributes.find(
              ({ id, name, type, value: v }) =>
                id === av.id &&
                name === av.name &&
                type === av.type &&
                v.value === av.value.value
            )
          ) {
            foundAll = false;
          }
        });
        return foundAll;
      }
    );

    this.selectedVariation$.next(selectedVariation);
    this.updateUrl(selectedVariation);
  }

  updateUrl(selectedVariation: ProductVariation) {
    this.router.navigate([], {
      queryParams: { varSlug: selectedVariation.slug },
      relativeTo: this.route,
      replaceUrl: true,
      queryParamsHandling: 'merge',
    });
  }
}
