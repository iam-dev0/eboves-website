import { ActivatedRoute } from '@angular/router';
import { CartService } from './../../../../services/cart.service';
import { Brand } from './../../../../models/brand.model';
import { Category } from '@models/category.model';
import { ProductAttribute } from '@models/product-attribute.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductVariation } from '@models/product-variation.model';
import {
  isDiscountAvailable,
  getDiscountedPrice,
  getVariationName,
} from '@utils';
import { ProductService } from '@services/product.service';
import { CART_ITEM_LIMIT } from 'src/constants';

@Component({
  selector: 'app-product-features',
  templateUrl: './product-features.component.html',
  styleUrls: ['./product-features.component.scss'],
})
export class ProductFeaturesComponent implements OnInit {
  @Output() onVariationChange = new EventEmitter<string>();
  @Input() price: string;
  @Input() description: string;
  @Input() name: string;
  @Input() attributes: ProductAttribute[];
  @Input() category: Category;
  @Input() brand: Brand;
  selectedVariation: ProductVariation;
  qty: number = 1;
  qtyLimit: number = 5;
  isOutOfStock: boolean = false;
  isDiscountAvailable: boolean = false;
  discountedPrice: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.getSelectedVariation().subscribe((variation) => {
      this.selectedVariation = variation;
      this.isOutOfStock = variation.availableQuantity < 1;
      this.isDiscountAvailable = isDiscountAvailable(variation);
      this.isDiscountAvailable &&
        (this.discountedPrice = getDiscountedPrice(variation));
      this.qty = 1;
    });
  }

  onAttributeValueChange(event: ProductAttribute) {
    this.productService.updateAttributeValue(event);
  }

  incrementQty() {
    this.qty =
      this.qty < CART_ITEM_LIMIT &&
      this.qty < this.selectedVariation?.availableQuantity
        ? this.qty + 1
        : this.qty;
  }

  decrementQty() {
    this.qty = this.qty > 1 ? this.qty - 1 : this.qty;
  }

  addToCart() {
    this.cartService.addToCart({
      variation: this.selectedVariation,
      qty: this.qty,
      productName: this.name,
      productSlug: this.getProductSlug(),
      variationName: getVariationName(
        this.selectedVariation.attributes,
        this.name
      ),
    });
  }

  private getProductSlug(): string {
    return this.route.snapshot.paramMap.get('slug') || '';
  }
}
