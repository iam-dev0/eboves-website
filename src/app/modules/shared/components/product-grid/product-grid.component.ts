import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() customClasses: string = '';
  @Input() cardType: string = 'simple';
  @Input() pagination: boolean = true;
  @Input() showToolbox: boolean = true;
  page: number = 1;
  isMobile: boolean = false;
  itemsPerPage: number = 10;
  selectedProductSlug: string = '';

  constructor(private device: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.device.isMobile();
    if (this.isMobile || !this.pagination) {
      this.itemsPerPage = this.products.length;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'products': {
            this.resetPage();
          }
        }
      }
    }
  }

  resetPage() {
    this.page = 1;
  }

  openQuickViewModal(productSlug: string) {
    this.selectedProductSlug = productSlug;
  }
}
