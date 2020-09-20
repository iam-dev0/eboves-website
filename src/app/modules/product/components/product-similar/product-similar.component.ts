import { Product } from '@models/product.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-similar',
  templateUrl: './product-similar.component.html',
  styleUrls: ['./product-similar.component.scss'],
})
export class ProductSimilarComponent implements OnInit {
  @Input() products: Product[] = [];

  customOptions: OwlOptions = {
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    responsive: {
      0: {
        items: 1,
      },
      360: {
        items: 2,
      },
      480: {
        items: 3,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 4,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
