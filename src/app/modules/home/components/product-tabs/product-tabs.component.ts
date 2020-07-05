import { ApiService } from './../../services/api.service';
import { Product } from './../../../../models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss'],
})
export class ProductTabsComponent implements OnInit {
  featuredProducts: Product[];
  onSaleProducts: Product[];
  topRatedProducts: Product[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.featuredProducts = this.apiService.getFeaturesProducts();
    this.topRatedProducts = this.apiService.getTopRatedProducts();
    this.onSaleProducts = this.apiService.getOnSaleProducts();
  }
}
