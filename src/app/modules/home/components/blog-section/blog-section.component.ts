import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.scss'],
})
export class BlogSectionComponent implements OnInit {
  customOptions: OwlOptions = {
    nav: false,
    dots: true,
    items: 3,
    margin: 20,
    loop: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
