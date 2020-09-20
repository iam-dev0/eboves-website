import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

import { BehaviorSubject } from 'rxjs';
import { Options, ChangeContext } from 'ng5-slider';
import { SubSink } from 'subsink';

import { Product } from '@models/product.model';
import { Brand } from '@models/brand.model';
import { PriceRange } from '@models/price-range.model';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit, OnChanges, OnDestroy {
  @Input() products: Product[] = [];
  @Input() showBrandFilter: boolean = true;
  isBrowser: boolean;
  brands: Brand[] = [];
  products$ = new BehaviorSubject<Product[]>([]);
  priceRangeStart: number = 0;
  priceRangeEnd: number = 200;
  priceRangeOptions: Options = {
    floor: 0,
    ceil: 200,
    translate: (value: number): string => `Rs. ${value}`,
  };
  filterOptions: FilterOptions = {};
  filterOptions$ = new BehaviorSubject<FilterOptions>(this.filterOptions);
  isFiltersDrawerOpen: boolean = false;
  private subscriptions = new SubSink();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.updateData(this.products);
    this.setupFilterSubscription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'products': {
            this.updateData(changes[propName].currentValue);
            this.resetFilters();
          }
        }
      }
    }
  }

  updateData(products: Product[]) {
    this.updateBrands(products);
    this.updatePriceRange(products);
    this.products$.next(products);
  }

  setupFilterSubscription() {
    this.subscriptions.sink = this.filterOptions$.subscribe((options) => {
      this.filterOptions = options;
      this.products$.next(this.filterProducts(this.products, options));
    });
  }

  updatePriceRange(products: Product[]) {
    let max = 0;

    products?.forEach(({ variations }) =>
      variations.forEach(({ price }) => {
        max = price > max ? price : max;
      })
    );

    this.priceRangeOptions = Object.assign(
      {},
      { ...this.priceRangeOptions, ceil: max }
    );
    this.priceRangeEnd = max;
  }

  onPriceRangeChange(change: ChangeContext) {
    this.filterOptions$.next({
      ...this.filterOptions,
      priceRange: { min: change.value, max: change.highValue },
    });
  }

  resetFilters() {
    this.filterOptions$.next({});
  }

  updateBrands(products: Product[]) {
    let brands: Brand[] = [];
    products?.forEach(({ brand }) => {
      if (!brands.find(({ slug }) => brand.slug === slug)) {
        brands.push(brand);
      }
    });
    this.brands = brands;
  }

  filterProducts(products: Product[], filterOptions: FilterOptions): Product[] {
    let filteredProducts = products;

    for (const field in filterOptions) {
      if (Object.prototype.hasOwnProperty.call(filterOptions, field)) {
        switch (field) {
          case 'selectedBrands': {
            filteredProducts = filterOptions['selectedBrands'].length
              ? filteredProducts.filter(({ brand }) => {
                  if (
                    filterOptions['selectedBrands'].find(
                      ({ slug }) => slug === brand.slug
                    )
                  ) {
                    return true;
                  }
                  return false;
                })
              : products;
            break;
          }
          case 'priceRange': {
            const { min, max } = filterOptions['priceRange'];
            filteredProducts = filteredProducts.filter(({ variations }) =>
              variations.find(({ price }) => price >= min && price <= max)
                ? true
                : false
            );
            break;
          }
        }
      }
    }

    return filteredProducts;
  }

  onBrandsSelectionChange(event: any, brand: Brand) {
    const selectedBrands = this.filterOptions.selectedBrands || [];
    if (event.target.checked) {
      selectedBrands.push(brand);
    } else {
      selectedBrands.splice(selectedBrands.indexOf(brand), 1);
    }
    this.filterOptions$.next({ ...this.filterOptions, selectedBrands });
  }

  toggleIsFilterDrawerOpen() {
    this.isFiltersDrawerOpen = !this.isFiltersDrawerOpen;
    if (this.isFiltersDrawerOpen) {
      this.renderer.addClass(this.document.body, 'noscroll');
    } else {
      this.renderer.removeClass(this.document.body, 'noscroll');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

interface FilterOptions {
  priceRange?: PriceRange;
  selectedBrands?: Brand[];
}
