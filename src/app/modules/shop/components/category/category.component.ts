import { SubSink } from 'subsink';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@services/categories.service';
import { SeoService } from '@services/seo.service';
import { Category } from '@models/category.model';
import { getMetaTags } from '@utils';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  category: Category;
  featuredProducts$: Observable<Product[]>;
  bestSellerProducts$: Observable<Product[]>;
  subcategories: Category[] = [];
  carouselOptions: OwlOptions = {
    nav: true,
    dots: false,
    margin: 20,
    loop: false,
    navText: ['<span><</span>', '<span>></span>'],
    responsive: {
      0: {
        items: 2,
      },
      480: {
        items: 2,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 4,
      },
    },
  };

  private subscriptions = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.data.category;
    // console.log(this.route.snapshot.data.category);
    this.setMetaData(this.category);
    if (this.category) {
      this.featuredProducts$ = this.categoriesService.getFeatured(
        this.category.slug,
        15
      );
      this.bestSellerProducts$ = this.categoriesService.getBestSeller(
        this.category.slug
      );
    }

    // this.subscriptions.sink = this.categoriesService.categories.subscribe(
    //   (categories) => {
    //     this.subcategories = categories.find(
    //       ({ slug }) => slug === this.category?.slug
    //     )?.childrens;
    //   }
    // );
  }

  setMetaData(category: Category) {
    this.seoService.setTitle(category?.metaTitle);
    this.seoService.setMetaTags(getMetaTags(category));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
