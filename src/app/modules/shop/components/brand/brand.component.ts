import { Brand } from '@models/brand.model';
import { Observable } from 'rxjs';
import { Product } from '@models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '@services/brands.service';
import { SeoService } from '@services/seo.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  products$: Observable<Product[]>;
  brand: Brand;

  constructor(
    private route: ActivatedRoute,
    private brandsService: BrandsService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.brand = this.route.snapshot.data.brand;
    this.setMetaData(this.route.snapshot.data.brand);
    this.products$ = this.brandsService.getBrandProducts(
      this.route.snapshot.paramMap.get('brandSlug')
    );
  }

  setMetaData(brand: Brand) {
    this.seoService.setTitle(brand.metaTitle);
    this.seoService.setMetaTags(this.getTags(brand));
  }

  getTags(brand: Brand): Map<string, string> {
    const tags: Map<string, string> = new Map<string, string>();
    tags.set('keywords', brand.metaKeywords);
    tags.set('descriptions', brand.metaDescription);
    return tags;
  }
}
