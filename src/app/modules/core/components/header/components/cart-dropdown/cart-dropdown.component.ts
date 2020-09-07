import { Observable } from 'rxjs';
import { CartService } from './../../../../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from '@models/cart.model';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.scss'],
})
export class CartDropdownComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart();
  }

  removeFromCart(varSlug: string) {
    this.cartService.removeFromCart(varSlug);
  }
}
