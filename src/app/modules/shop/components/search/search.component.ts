import { SeoService } from '@services/seo.service';
import { getCategoryTree, filterProducts } from '@utils';
import { Category } from '@models/category.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '@models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '@services/search.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[];
  searchValue: string = '';
  filteredProducts: Product[] = [];

  private subscriptions = new SubSink();

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.setupParamsSubscription();
    this.setupQuerySubscription();
  }

  setupParamsSubscription() {
    this.subscriptions.sink = this.route.params.subscribe((params) => {
      this.searchValue = params.value;
      this.seoService.setTitle(`${this.searchValue} - Search - eboves`);
      this.seoService.setMetaTags();
      this.subscriptions.sink = this.searchService
        .search(params.value)
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
