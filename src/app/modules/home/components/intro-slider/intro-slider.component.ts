import { Banners } from '@models/api-responses/banners.model';
import { Response } from '@models/api-responses/response.model';
import { Banner } from '@models/banner.model';
import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-intro-slider',
  templateUrl: './intro-slider.component.html',
  styleUrls: ['./intro-slider.component.scss'],
})
export class IntroSliderComponent implements OnInit {
  carouselOptions: OwlOptions = {
    nav: false,
    items: 1,
    loop: true,
    margin: 0,
    navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
    dots: true,
    smartSpeed: 400,
    autoplay: true,
    autoplayTimeout: 15000,
  };

  @Input() banners: Banner[] = [];

  constructor(private service: ApiService) {}

  ngOnInit(): void {}

  getBannerStyle(banner: any): string {
    return `background-image: url(${banner.image});`;
  }
}
