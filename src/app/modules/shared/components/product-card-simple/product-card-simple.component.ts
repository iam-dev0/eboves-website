import { Product } from '@models/product.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card-simple',
  templateUrl: './product-card-simple.component.html',
  styleUrls: ['./product-card-simple.component.scss'],
})
export class ProductCardSimpleComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit(): void {}

  // getTagClasses() {
  //   if (this.product.tag === 'New') {
  //     return 'product-label label-circle label-new';
  //   } else if (this.product.tag === 'Sale') {
  //     return 'product-label label-circle label-sale';
  //   } else {
  //     return 'product-label label-circle';
  //   }
  // }
}
