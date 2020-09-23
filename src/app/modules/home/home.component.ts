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

  constructor(private service: HomeService) {}

  ngOnInit(): void {
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
