import { SeoService } from '@services/seo.service';
import { HomeService } from '@services/home.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Banners } from '@models/api-responses/banners.model';
import { Response } from '@models/api-responses/response.model';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  banners: Banners;
  private subscriptions = new SubSink();

  constructor(private service: HomeService, private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setTitle('eboves');
    this.seoService.setMetaTags();
    this.subscriptions.sink = this.service
      .getBanners()
      .subscribe((banners: Banners) => {
        this.banners = banners;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
