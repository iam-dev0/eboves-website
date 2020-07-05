import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss'],
})
export class BrandsListComponent implements OnInit {
  customOptions: OwlOptions = {
    nav: false,
    dots: false,
    margin: 0,
    loop: false,
    responsive: {
      0: {
        items: 2,
      },
      420: {
        items: 3,
      },
      600: {
        items: 4,
      },
      900: {
        items: 5,
      },
      1024: {
        items: 7,
      },
      1360: {
        items: 7,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
