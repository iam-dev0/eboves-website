import { CartItem } from '@models/cart-item.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-dropdown-item',
  templateUrl: './cart-dropdown-item.component.html',
  styleUrls: ['./cart-dropdown-item.component.scss'],
})
export class CartDropdownItemComponent implements OnInit {
  @Output() onRemoveItem = new EventEmitter<string>();
  @Input() item: CartItem;

  constructor() {}

  ngOnInit(): void {}

  removeItem() {
    this.onRemoveItem.emit(this.item.variation.slug);
  }
}
