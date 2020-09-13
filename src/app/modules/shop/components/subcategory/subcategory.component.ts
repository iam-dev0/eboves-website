import { Product } from '@models/product.model';
import { Category } from '@models/category.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@services/seo.service';
import { CategoriesService } from '@services/categories.service';
import { getMetaTags } from '@utils';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss'],
})
export class SubcategoryComponent implements OnInit, OnDestroy {
  subcategory: Category;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  parts: PartsListItem[] = [];

  private subscriptions = new SubSink();

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
    this.subscriptions.sink = this.route.params.subscribe((params) => {
      this.subscriptions.sink = this.categoriesService
        .getCategoryInfo(params.subCatSlug)
        .subscribe((category) => {
          this.subcategory = category;
          this.setMetaData(category);
        });
      this.subscriptions.sink = this.categoriesService
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
    this.subscriptions.sink = this.route.queryParams.subscribe((query) => {
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

interface PartsListItem {
  category: Category;
  productCount: number;
}
