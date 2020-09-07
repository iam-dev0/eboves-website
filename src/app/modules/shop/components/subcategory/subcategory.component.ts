import { BehaviorSubject } from 'rxjs';
import { Brand } from '@models/brand.model';
import { Product } from '@models/product.model';
import { Category } from '@models/category.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@services/seo.service';
import { CategoriesService } from '@services/categories.service';
import { PaginationService } from '@services/pagination.service';
import { getMetaTags } from '@utils';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss'],
})
export class SubcategoryComponent implements OnInit {
  subcategory: Category;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  parts: PartsListItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.subcategory = this.route.snapshot.data.subcategory;
    this.setMetaData(this.subcategory);
    this.setupParamsSubscription();
    this.setupQueryParamsSubscription();
  }

  setupParamsSubscription() {
    this.route.params.subscribe((params) => {
      this.categoriesService
        .getSubCategoryProducts(params.subCatSlug)
        .subscribe((response) => {
          this.products = response;
          this.getParts(response);
          this.filteredProducts = response;
          const part = this.route.snapshot.queryParamMap.get('part');
          if (part) {
            this.filteredProducts = this.filterPartProducts(response, part);
          }
        });
    });
  }

  setupQueryParamsSubscription() {
    this.route.queryParams.subscribe((query) => {
      if (query.part) {
        this.filteredProducts = this.filterPartProducts(
          this.products,
          query.part
        );
      } else {
        this.filteredProducts = this.products;
      }
    });
  }

  getParts(products: Product[]) {
    let parts: PartsListItem[] = [];
    products.forEach(({ category }) => {
      const part = parts.find(
        ({ category: { slug } }) => slug === category.slug
      );
      if (!part) {
        parts.push({ category, productCount: 1 });
      } else {
        parts = parts.map((p) =>
          p.category.slug === part.category.slug
            ? { ...p, productCount: p.productCount + 1 }
            : p
        );
      }
    });
    this.parts = parts;
  }

  filterPartProducts(products: Product[], part: string): Product[] {
    return products.filter((product) => product.category.slug === part);
  }

  setMetaData(category: Category) {
    this.seoService.setTitle(category?.metaTitle);
    this.seoService.setMetaTags(getMetaTags(category));
  }

  isActive(slug: string): boolean {
    return this.route.snapshot.queryParamMap.get('part') === slug;
  }
}

interface PartsListItem {
  category: Category;
  productCount: number;
}
