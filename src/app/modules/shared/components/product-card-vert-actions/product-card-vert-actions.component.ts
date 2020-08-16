import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product-card-vert-actions',
  templateUrl: './product-card-vert-actions.component.html',
  styleUrls: ['./product-card-vert-actions.component.scss'],
})
export class ProductCardVertActionsComponent implements OnInit {
  @Input() product: Product;
  tagLabel: string = '';
  tagClass: string = '';

  constructor() {}

  ngOnInit(): void {
    if (this.product.topRated) {
      this.tagClass = 'label-top';
      this.tagLabel = 'Top';
    }
  }
}
