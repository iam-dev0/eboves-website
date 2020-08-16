import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@models/product.model';
import { PaginationService } from '@services/pagination.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() customClasses: string = '';
  @Input() cardType: string = 'simple';
  page: number = 1;

  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {
    this.paginationService.resetPageListener().subscribe(() => {
      this.page = 1;
    });
  }
}
