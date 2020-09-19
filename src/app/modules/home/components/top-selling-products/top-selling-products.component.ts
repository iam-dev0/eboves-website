import { Category } from '@models/category.model';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '@services/home.service';
import { Product } from '@models/product.model';
import { Tab } from '@models/tab.model';
import { filterProducts } from '@utils';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.scss'],
})
export class TopSellingProductsComponent implements OnInit {
  products: Product[] = [];
  tabs: Tab[] = [];

  constructor(private service: HomeService) {}

  ngOnInit(): void {
    this.service.getTopSellers().subscribe((data) => {
      this.products = data;
      this.tabs = this.getTabs(data);
    });
  }

  getTabs(data: Product[]): Tab[] {
    const categories: Category[] = this.getMainCategories(data);
    return [
      { name: 'All', products: data, id: 0 },
      ...categories.map(({ slug, name, id }) => ({
        id,
        name,
        products: filterProducts(data, { catSlug: slug }),
      })),
    ];
  }

  getMainCategories(products: Product[]): Category[] {
    const categories: Category[] = products.map(
      ({ category }) => category?.parent?.parent
    );
    return categories.filter(
      (category, index) =>
        categories.findIndex(({ slug }) => category.slug === slug) === index
    );
  }
}
