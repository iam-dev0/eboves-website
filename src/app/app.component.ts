import { SubSink } from 'subsink';
import { filter, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { BrandsService } from '@services/brands.service';
import { Observable } from 'rxjs';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CategoriesService } from '@services/categories.service';
import { Category } from '@models/category.model';
import { Brand } from '@models/brand.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'eboves-Angular';
  showScrollTop: boolean = false;
  categories$: Observable<Category[]>;
  brands$: Observable<Brand[]>;

  private subscriptions = new SubSink();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private categoriesService: CategoriesService,
    private brandsService: BrandsService
  ) {
    this.subscriptions.sink = router.events
      .pipe(filter((value) => value instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToTop('auto');
      });
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService
      .getCategories()
      .pipe(shareReplay(1));
    this.brands$ = this.brandsService.getBrands().pipe(shareReplay(1));
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const scrollTop = this.document.documentElement.scrollTop;
    if (scrollTop >= 400) {
      this.showScrollTop = true;
    } else {
      this.showScrollTop = false;
    }
  }

  isScrollTopVisible() {
    if (this.showScrollTop) {
      return 'show';
    } else {
      return '';
    }
  }

  scrollToTop(behavior: ScrollBehavior = 'smooth') {
    if (isPlatformBrowser(this.platformId)) {
      window?.scrollTo({
        top: 0,
        behavior,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
