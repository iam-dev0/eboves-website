import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product-card-vert-actions',
  templateUrl: './product-card-vert-actions.component.html',
  styleUrls: ['./product-card-vert-actions.component.scss'],
})
export class ProductCardVertActionsComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit(): void {}
}
