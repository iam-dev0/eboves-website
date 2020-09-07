import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
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
export class CategoryComponent implements OnInit {
  category: Category;
  featuredProducts$: Observable<Product[]>;
  bestSellerProducts$: Observable<Product[]>;
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

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.data.category;
    // console.log(this.route.snapshot.data.category);
    this.setMetaData(this.category);
    this.featuredProducts$ = this.categoriesService.getFeatured(
      this.category.slug,
      15
    );
    this.bestSellerProducts$ = this.categoriesService.getBestSeller(
      this.category.slug
    );
  }

  setMetaData(category: Category) {
    this.seoService.setTitle(category.metaTitle);
    this.seoService.setMetaTags(getMetaTags(category));
  }
}
