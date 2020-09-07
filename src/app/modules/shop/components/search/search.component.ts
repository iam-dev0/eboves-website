import { getCategoryTree } from '@utils';
import { Category } from '@models/category.model';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchValue = this.route.snapshot.paramMap.get('value');
    this.setupParamsSubscription();
    this.setupQuerySubscription();
  }

  setupParamsSubscription() {
    this.subscriptions.sink = this.route.params.subscribe((params) => {
      this.searchValue = params.value;
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
            this.filteredProducts = this.filterProducts(this.products, {
              catSlug: query[field],
            });
            break;
          case 'subCatSlug':
            this.filteredProducts = this.filterProducts(this.products, {
              subCatSlug: query[field],
            });
            break;
          case 'partSlug':
            this.filteredProducts = this.filterProducts(this.products, {
              partSlug: query[field],
            });
            break;
          default:
            break;
        }
      }
    }
  }

  filterProducts(
    products: Product[],
    { catSlug = '', subCatSlug = '', partSlug = '' }
  ): Product[] {
    if (partSlug) {
      return products.filter(({ category: { slug } }) => slug === partSlug);
    }
    if (subCatSlug) {
      return products.filter(
        ({
          category: {
            parent: { slug },
          },
        }) => slug === subCatSlug
      );
    }
    if (catSlug) {
      return products.filter(
        ({
          category: {
            parent: {
              parent: { slug },
            },
          },
        }) => slug === catSlug
      );
    }
    return products;
  }

  isActive(slug: string): boolean {
    return this.route.snapshot.queryParamMap.get('catSlug') === slug;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
