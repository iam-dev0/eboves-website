import { Observable } from 'rxjs';
import { ProductVariation } from '@models/product-variation.model';
import { ProductService } from '@services/product.service';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Product } from '@models/product.model';
import { SubSink } from 'subsink';
import { ProductAttribute } from '@models/product-attribute.model';
import { getAttributesWithValues } from '@utils';

@Component({
  selector: 'app-product-quick-view',
  templateUrl: './product-quick-view.component.html',
  styleUrls: ['./product-quick-view.component.scss'],
})
export class ProductQuickViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedProductSlug: string;
  galleryImages: string[] = [];
  price: string = '';
  shortDescription: string = '';
  product: Product;
  attributes: ProductAttribute[] = [];

  private subscriptions = new SubSink();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscriptions.sink = this.productService
      .getSelectedVariation()
      .subscribe((variation) => {
        this.price = `Rs. ${variation.price}`;
        this.shortDescription = variation.shortDescription;
        this.galleryImages = [variation.mainImage, ...variation.images];
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName];
        switch (propName) {
          case 'selectedProductSlug':
            change.currentValue &&
              (this.subscriptions.sink = this.productService
                .getProduct(change.currentValue)
                .subscribe((product) => {
                  this.product = product;
                  this.attributes = getAttributesWithValues(product);
                }));
            break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
