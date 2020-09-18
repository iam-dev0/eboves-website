import { Cart } from '@models/cart.model';
import { Observable } from 'rxjs';
import { CartService } from '@services/cart.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('thankYouModal') thankYouModal: ElementRef;

  cart$: Observable<Cart>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart();
    this.cartService.isOrderPlaced.subscribe((isOrderPlaced) => {
      if (isOrderPlaced) {
        this.thankYouModal.nativeElement.click();
      }
    });
  }
}
