import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@modules/home/services/api.service';
import { Product } from '@models/product.model';
import { Tab } from '@models/tab.model';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.scss'],
})
export class TopSellingProductsComponent implements OnInit {
  products: Product[] = [];
  tabs: Tab[] = [];

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.service.getTopSellers().subscribe((data) => {
      this.products = data;
      this.tabs = this.getTabs(data);
    });
  }

  getTabs(data: Product[]): Tab[] {
    return [{ name: 'All', products: data }];
  }
}
