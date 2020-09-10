import { CartItem } from '@models/cart-item.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getDiscountedPrice } from '@utils';

@Component({
  selector: 'app-cart-dropdown-item',
  templateUrl: './cart-dropdown-item.component.html',
  styleUrls: ['./cart-dropdown-item.component.scss'],
})
export class CartDropdownItemComponent implements OnInit {
  @Output() onRemoveItem = new EventEmitter<string>();
  @Input() item: CartItem;
  price: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.price = getDiscountedPrice(this.item.variation);
  }

  removeItem() {
    this.onRemoveItem.emit(this.item.variation.slug);
  }
}
