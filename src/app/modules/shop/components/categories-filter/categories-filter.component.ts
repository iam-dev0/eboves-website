import { Category } from '@models/category.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.scss'],
})
export class CategoriesFilterComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  activeCategory: string;
  activeSubCategory: string;
  activePart: string;

  private subscriptions = new SubSink();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
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
        const slug = query[field];
        switch (field) {
          case 'catSlug':
            this.activeCategory = slug;
            break;
          case 'subCatSlug':
            this.activeSubCategory = slug;
            break;
          case 'partSlug':
            this.activePart = slug;
            break;
          default:
            break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
