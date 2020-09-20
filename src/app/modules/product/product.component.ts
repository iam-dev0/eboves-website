import { Observable } from 'rxjs';
import { ProductAttribute } from '@models/product-attribute.model';
import { Product } from '@models/product.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@services/seo.service';
import { getMetaTags, getPriceRange } from '@utils';
import { ProductService } from '@services/product.service';
import { PriceRange } from '@models/price-range.model';

import { getAttributesWithValues } from '@utils';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product;
  galleryImages: string[] = [];
  price: string = '';
  shortDescription: string = '';
  attributes: ProductAttribute[] = [];
  similarProducts$: Observable<Product[]>;
  private subscriptions = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
    this.galleryImages = this.getProductImages(this.product);
    this.attributes = getAttributesWithValues(this.product);
    this.price = this.getProductPriceRange(this.product);

    this.setMetaData(this.route.snapshot.data.product);

    this.subscriptions.sink = this.productService
      .getSelectedVariation()
      .subscribe((variation) => {
        this.price = `Rs. ${variation.price}`;
        this.shortDescription = variation.shortDescription;
        this.galleryImages = [variation.mainImage, ...variation.images];
      });

    this.product &&
      (this.similarProducts$ = this.productService.getSimilarProducts(
        this.product.slug
      ));
  }

  getProductImages(product: Product): string[] {
    return [product?.mainImage];
  }

  getProductPriceRange(product: Product): string {
    const priceRange: PriceRange = getPriceRange(product);
    return `Rs. ${priceRange.min} - ${priceRange.max}`;
  }

  setMetaData(product: Product) {
    this.seoService.setTitle(product.metaTitle);
    this.seoService.setMetaTags(getMetaTags(product));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
