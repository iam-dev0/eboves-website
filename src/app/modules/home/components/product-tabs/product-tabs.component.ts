import { Response } from '@models/api-responses/response.model';
import { HomeService } from '@services/home.service';
import { Product } from './../../../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { MainTabs } from '@models/api-responses/main-tabs.model';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss'],
})
export class ProductTabsComponent implements OnInit {
  featuredProducts: Product[] = [];
  onSaleProducts: Product[] = [];
  topRatedProducts: Product[] = [];

  constructor(private HomeService: HomeService) {}

  ngOnInit(): void {
    // this.featuredProducts = this.HomeService.getFeaturesProducts();
    // this.topRatedProducts = this.HomeService.getTopRatedProducts();
    // this.onSaleProducts = this.HomeService.getOnSaleProducts();
    this.HomeService.getMainTabsProducts().subscribe(
      (response: Response<MainTabs>) => {
        this.featuredProducts = response.data.featured;
        this.onSaleProducts = response.data.onSale;
        this.topRatedProducts = response.data.topRated;
      }
    );
  }
}
