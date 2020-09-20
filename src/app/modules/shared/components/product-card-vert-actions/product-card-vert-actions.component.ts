import { ProductVariation } from '@models/product-variation.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() onQuickViewClick = new EventEmitter<string>();
  @Input() product: Product;
  tagLabel: string = '';
  tagClass: string = '';
  price: string = '';
  values: AttributeValue[] = [];
  selectionAttribute: ProductAttribute;
  image: string = '';
  selectedVariation: ProductVariation;
  campaignName: string = '';

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

    this.campaignName = this.product?.variations.find(
      ({ discountReason }) => !!discountReason
    )?.discountReason;
    this.selectionAttribute = this.product.variations[0].attributes.find(
      (value) => value.type === 'image'
    );
    this.selectedVariation = this.product.variations[0];
    this.image = this.selectedVariation?.mainImage;
    if (this.selectionAttribute) {
      this.values = this.product.variations
        .map(
          ({ attributes }) =>
            attributes.find(({ type }) => type === 'image')?.value
        )
        .filter(
          (value, index, arr) =>
            arr.findIndex((v) => v.value === value.value) === index
        );
    }
  }

  checkIfPreOrder(): boolean {
    return this.product.variations.reduce(
      (acc, cur) => (!acc ? false : cur.preOrder),
      true
    );
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
    const isBestSeller: boolean = this.product.variations.reduce(
      (acc, cur) => (!acc ? false : cur.bestSeller),
      true
    );
    const isTopRated: boolean = this.product.variations.reduce(
      (acc, cur) => (!acc ? false : cur.topRated),
      true
    );
    const isOutOfStock: boolean = this.product.variations.reduce(
      (acc, cur) => (!acc ? false : !cur.availableQuantity),
      true
    );
    const isPreOrder: boolean = this.checkIfPreOrder();
    if (isOutOfStock && !isPreOrder) {
      this.tagClass = 'label-out';
      this.tagLabel = `Out Of Stock`;
    } else if (discountRange) {
      this.tagClass = 'label-sale';
      this.tagLabel = `${discountRange} Off`;
    } else if (isTopRated) {
      this.tagClass = 'label-top';
      this.tagLabel = 'Top';
    } else if (isBestSeller) {
      this.tagClass = 'label-sale';
      this.tagLabel = `Best Seller`;
    }
  }

  setPrice() {
    const { min, max } = getPriceRange(this.product);
    this.price = min === max ? `Rs. ${min}` : `Rs. ${min} - Rs. ${max}`;
  }

  changeVariation(attributeValue: AttributeValue) {
    this.selectedVariation = this.product.variations.find(
      ({ attributes }) =>
        attributes.findIndex(
          (attr) =>
            attr?.value.id === attributeValue.id &&
            attr?.value?.value === attributeValue?.value
        ) > -1
    );
    this.image = this.selectedVariation?.mainImage;
  }

  handleQuickViewClick() {
    this.onQuickViewClick.emit(this.product.slug);
  }
}
