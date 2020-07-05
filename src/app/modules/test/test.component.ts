import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(private store: Store<AppState>) {
    // this.products = store.select('product');
  }

  ngOnInit(): void {}
}
