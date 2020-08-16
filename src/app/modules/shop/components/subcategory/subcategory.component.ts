import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
import { Category } from '@models/category.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@services/seo.service';
import { CategoriesService } from '@services/categories.service';
import { PaginationService } from '@services/pagination.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss'],
})
export class SubcategoryComponent implements OnInit {
  subcategory: Category;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService,
    private categoriesService: CategoriesService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap);
    this.subcategory = this.route.snapshot.data.subcategory;
    this.setMetaData(this.subcategory);
    // console.log(
    //   'calling getSubcategoryProducts: subCategorySlug: ',
    //   this.route.snapshot.paramMap.get('subCatSlug'),
    //   ' part: ',
    //   this.route.snapshot.queryParamMap.get('part')
    // );
    this.route.params.subscribe((params) => {
      console.log(params);

      this.categoriesService
        .getSubCategoryProducts(params.subCatSlug)
        .subscribe((response) => {
          this.products = response;
          this.filteredProducts = response;
          const part = this.route.snapshot.queryParamMap.get('part');
          if (part && part !== '') {
            this.filteredProducts = this.filterPartProducts(response, part);
          }
          this.paginationService.resetPage();
        });
    });
    this.route.queryParams.subscribe((query) => {
      console.log(query);

      if (query.part && query.part !== '') {
        this.filteredProducts = this.filterPartProducts(
          this.products,
          query.part
        );
      } else {
        this.filteredProducts = this.products;
      }
      this.paginationService.resetPage();
    });
  }

  filterPartProducts(products: Product[], part: string): Product[] {
    return products.filter((product) => product.category.slug === part);
  }

  setMetaData(category: Category) {
    this.seoService.setTitle(category.metaTitle);
    this.seoService.setMetaTags(this.getTags(category));
  }

  getTags(category: Category): Map<string, string> {
    const tags: Map<string, string> = new Map<string, string>();
    tags.set('keywords', category.metaKeywords);
    tags.set('descriptions', category.metaDescription);
    return tags;
  }
}
