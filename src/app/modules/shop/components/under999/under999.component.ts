import { SeoService } from '@services/seo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@models/product.model';
import { Category } from '@models/category.model';
import { SubSink } from 'subsink';
import { SearchService } from '@services/search.service';
import { ActivatedRoute, Params } from '@angular/router';
import { filterProducts, getCategoryTree } from '@utils';

@Component({
  selector: 'app-under999',
  templateUrl: './under999.component.html',
  styleUrls: ['./under999.component.scss'],
})
export class Under999Component implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[];
  filteredProducts: Product[] = [];

  private subscriptions = new SubSink();

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setTitle('eboves - Under 999');
    this.subscriptions.sink = this.searchService
      .getUnder999()
      .subscribe((products) => {
        this.categories = getCategoryTree(products);
        this.products = products;
        this.filteredProducts = products;
      });
    this.setupQuerySubscription();
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
        switch (field) {
          case 'catSlug':
            this.filteredProducts = filterProducts(this.products, {
              catSlug: query[field],
            });
            break;
          case 'subCatSlug':
            this.filteredProducts = filterProducts(this.products, {
              subCatSlug: query[field],
            });
            break;
          case 'partSlug':
            this.filteredProducts = filterProducts(this.products, {
              partSlug: query[field],
            });
            break;
          default:
            break;
        }
      }
    }
  }

  isActive(slug: string): boolean {
    return this.route.snapshot.queryParamMap.get('catSlug') === slug;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
