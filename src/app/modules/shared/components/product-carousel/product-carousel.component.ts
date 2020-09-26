import { Product } from './../../../../models/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
})
export class ProductCarouselComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() type: string = 'simple';

  @Input() customOptions: OwlOptions = {
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    responsive: {
      0: {
        items: 2,
      },
      500: {
        items: 3,
      },
      768: {
        items: 3,
      },
      930: {
        items: 4,
      },
      1200: {
        items: 5,
      },
      1600: {
        items: 6,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
