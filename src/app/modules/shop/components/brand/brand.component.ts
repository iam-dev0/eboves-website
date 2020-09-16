import { SubSink } from 'subsink';
import { Category } from '@models/category.model';
import { Brand } from '@models/brand.model';
import { Product } from '@models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BrandsService } from '@services/brands.service';
import { SeoService } from '@services/seo.service';
import { getMetaTags, getCategoryTree, filterProducts } from '@utils';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  brand: Brand;
  categories: Category[];

  private subscriptions = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private brandsService: BrandsService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.brand = this.route.snapshot.data.brand;
    this.setMetaData(this.route.snapshot.data.brand);
    this.setupParamsSubscription();
    this.setupQuerySubscription();
  }

  setupParamsSubscription() {
    this.subscriptions.sink = this.route.params.subscribe((params) => {
      this.subscriptions.sink = this.brandsService
        .getBrandProducts(params.brandSlug)
        .subscribe((products) => {
          this.categories = getCategoryTree(products);
          this.products = products;
          this.filteredProducts = products;
        });
    });
  }

  setupQuerySubscription() {
    this.subscriptions.sink = this.route.queryParams.subscribe(
      (query: Params) => {
        this.handleQueryChange(query);
      }
    );
  }

  handleQueryChange(query: Params) {
    for (const field in query) {
      if (Object.prototype.hasOwnProperty.call(query, field)) {
        const slug = query[field];
        switch (field) {
          case 'catSlug':
            this.filteredProducts = filterProducts(this.products, {
              catSlug: slug,
            });
            break;
          case 'subCatSlug':
            this.filteredProducts = filterProducts(this.products, {
              subCatSlug: slug,
            });
            break;
          case 'partSlug':
            this.filteredProducts = filterProducts(this.products, {
              partSlug: slug,
            });
            break;
          default:
            break;
        }
      }
    }
  }

  setMetaData(brand: Brand) {
    this.seoService.setTitle(brand.metaTitle);
    this.seoService.setMetaTags(getMetaTags(brand));
  }

  isActive(slug: string): boolean {
    return this.route.snapshot.queryParamMap.get('catSlug') === slug;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
