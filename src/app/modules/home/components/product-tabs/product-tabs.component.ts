import { Response } from '@models/api-responses/response.model';
import { HomeService } from '@services/home.service';
import { Product } from './../../../../models/product.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainTabs } from '@models/api-responses/main-tabs.model';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss'],
})
export class ProductTabsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  onSaleProducts: Product[] = [];
  topRatedProducts: Product[] = [];
  private subscriptions = new SubSink();

  constructor(private HomeService: HomeService) {}

  ngOnInit(): void {
    this.subscriptions.sink = this.HomeService.getMainTabsProducts().subscribe(
      (response: Response<MainTabs>) => {
        this.featuredProducts = response.data.featured;
        this.onSaleProducts = response.data.onSale;
        this.topRatedProducts = response.data.topRated;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
