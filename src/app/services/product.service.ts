import { ProductAttribute } from '@models/product-attribute.model';
import { ProductVariation } from '@models/product-variation.model';
import { map, tap } from 'rxjs/operators';
import { Response } from '@models/api-responses/response.model';
import { Product } from '@models/product.model';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneObject } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private selectedVariation$ = new Subject<ProductVariation>();

  private product: Product;
  private selectedAttributes: ProductAttribute[] = [];

  constructor(
    private client: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getProduct(slug: string, varSlug?: string): Observable<Product> {
    return this.client
      .get<Response<Product>>(`${environment.apiUrl}products/${slug}`)
      .pipe(
        map(({ data }) => data),
        tap((product) => {
          this.product = product;
          const selectedVariation = varSlug
            ? this.getVariation(product, varSlug)
            : product.variations[0];
          this.selectedVariation$.next(selectedVariation);
<<<<<<< HEAD
          this.updateUrl(selectedVariation);
=======
          this.setSelectedAttributes(selectedVariation.attributes);
          // this.updateUrl(selectedVariation);
>>>>>>> develop
        })
      );
  }

  setSelectedAttributes(attributes: ProductAttribute[]) {
    const newAttributes: ProductAttribute[] = [];
    attributes.forEach((attr) => newAttributes.push(cloneObject(attr)));
    this.selectedAttributes = newAttributes;
  }

  getSelectedVariation(): Observable<ProductVariation> {
    return this.selectedVariation$.asObservable();
  }

  getVariation(product: Product, varSlug: string) {
    return product.variations.find(({ slug }) => slug === varSlug);
  }

  updateAttributeValue(attribute: ProductAttribute) {
    const attr = cloneObject(attribute);
    const index = this.selectedAttributes.findIndex(
      ({ id, name, type }) =>
        id === attr.id && name === attr.name && type === attr.type
    );
    if (index > -1) {
      this.selectedAttributes.splice(index, 1, attr);
    } else {
      this.selectedAttributes.push(attr);
    }
    this.updateSelectedVariation(attr);
  }

  updateSelectedVariation(attribute: ProductAttribute) {
    let selectedVariation: ProductVariation = this.product.variations.find(
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

    if (!selectedVariation) {
      selectedVariation = this.product.variations.find(
        ({ attributes }) =>
          !!attributes.find(
            (attr) =>
              attr.id === attribute.id &&
              attr.type === attribute.type &&
              attr.name === attribute.name &&
              attr.value.value === attribute.value.value
          )
      );
      this.setSelectedAttributes(selectedVariation.attributes);
    }
    this.selectedVariation$.next(selectedVariation);
    // this.updateUrl(selectedVariation);
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
