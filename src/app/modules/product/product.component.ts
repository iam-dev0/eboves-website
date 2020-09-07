import { ProductVariation } from '@models/product-variation.model';
import { AttributeValue } from '@models/attribute-value.model';
import { ProductAttribute } from '@models/product-attribute.model';
import { Product } from '@models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@services/seo.service';
import { getMetaTags, getPriceRange } from '@utils';
import { ProductService } from '@services/product.service';
import { PriceRange } from '@models/pricae-range.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product;
  galleryImages: string[] = [];
  price: string = '';
  shortDescription: string = '';
  attributes: ProductAttribute[] = [];

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
    this.galleryImages = this.getProductImages(this.product);
    this.attributes = this.getAttributesWithValues(this.product);
    this.price = this.getProductPriceRange(this.product);

    this.setMetaData(this.route.snapshot.data.product);

    this.productService.getSelectedVariation().subscribe((variation) => {
      this.price = `Rs. ${variation.price}`;
      this.shortDescription = variation.shortDescription;
      this.galleryImages = [variation.mainImage, ...variation.images];
    });
  }

  getProductImages(product: Product): string[] {
    return [product?.mainImage, ...product?.images];
  }

  getAttributesWithValues(product: Product): ProductAttribute[] {
    return product.attributes.map((attribute) => {
      return {
        ...attribute,
        attributeValues: this.getAttributeValues(product.variations, attribute),
      };
    });
  }

  getAttributeValues(
    variations: ProductVariation[],
    attribute: ProductAttribute
  ): AttributeValue[] {
    const values: AttributeValue[] = [];
    variations.forEach(({ attributes }) => {
      attributes.forEach(({ id, name, type, value }) => {
        if (
          id === attribute.id &&
          name === attribute.name &&
          type === attribute.type
        ) {
          if (!values.find(({ id }) => id === value.id)) values.push(value);
        }
      });
    });
    return values;
  }

  getProductPriceRange(product: Product): string {
    const priceRange: PriceRange = getPriceRange(product);
    return `Rs. ${priceRange.min} - ${priceRange.max}`;
  }

  setMetaData(product: Product) {
    this.seoService.setTitle(product.metaTitle);
    this.seoService.setMetaTags(getMetaTags(product));
  }
}
