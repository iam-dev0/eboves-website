import { ProductVariation } from '@models/product-variation.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { AttributeValue } from '@models/attribute-value.model';
import { ProductAttribute } from '@models/product-attribute.model';
import { Product } from '@models/product.model';
import { getPriceRange } from '@utils';

@Component({
  selector: 'app-product-card-vert-actions',
  templateUrl: './product-card-vert-actions.component.html',
  styleUrls: ['./product-card-vert-actions.component.scss'],
})
export class ProductCardVertActionsComponent implements OnInit {
  @Input() product: Product;
  tagLabel: string = '';
  tagClass: string = '';
  price: string = '';
  values: AttributeValue[] = [];
  selectionAttribute: ProductAttribute;
  image: string = '';
  selectedVariation: ProductVariation;

  customOptions: OwlOptions = {
    nav: true,
    dots: false,
    margin: 2,
    loop: false,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2,
      },
      100: {
        items: 3,
      },
      130: {
        items: 4,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.setLabel();
    this.setPrice();
    this.image = this.product.mainImage;
    this.selectionAttribute = this.product.variations[0].attributes.find(
      (value) => value.type === 'image'
    );
    if (this.selectionAttribute) {
      this.values = this.product.variations.map(
        ({ attributes }) =>
          attributes.find(({ type }) => type === 'image')
            ?.ProductVariationAttributeValues
      );
    }
  }

  setLabel() {
    const discounts = this.product.variations
      .filter(
        ({ discountPercentage, discountStartTime, discountEndTime }) =>
          discountPercentage &&
          moment().isBetween(discountStartTime, discountEndTime)
      )
      .map(({ discountPercentage }) => discountPercentage)
      .sort((a, b) => a - b);
    const discountRange =
      discounts.length > 1
        ? `${discounts[0]}% - ${discounts[discounts.length - 1]}%`
        : discounts.length === 1
        ? `${discounts[0]}%`
        : '';
    if (discountRange) {
      this.tagClass = 'label-sale';
      this.tagLabel = `${discountRange} Off`;
    } else if (this.product.topRated) {
      this.tagClass = 'label-top';
      this.tagLabel = 'Top';
    }
  }

  setPrice() {
    const priceRange = getPriceRange(this.product);
    this.price = `Rs. ${priceRange.min} - Rs. ${priceRange.max}`;
  }

  changeVariation(attributeValue: AttributeValue) {
    this.selectedVariation = this.product.variations.find(
      ({ attributes }) =>
        attributes.findIndex(
          (attr) =>
            attr?.ProductVariationAttributeValues.id === attributeValue.id &&
            attr?.ProductVariationAttributeValues?.value ===
              attributeValue?.value
        ) > -1
    );
    this.image = this.selectedVariation?.mainImage;
  }
}
