import { Observable } from 'rxjs';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CategoriesService } from '@services/categories.service';
import { Category } from '@models/category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'eboves-Angular';
  showScrollTop: boolean = false;
  categories$: Observable<Category[]>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getCategories();
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

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
