import { SeoService } from '@services/seo.service';
import { Cart } from '@models/cart.model';
import { Observable } from 'rxjs';
import { CartService } from '@services/cart.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('thankYouModal') thankYouModal: ElementRef;

  cart$: Observable<Cart>;

  private subscriptions = new SubSink();

  constructor(
    private cartService: CartService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setTitle('Checkout - eboves');
    this.seoService.setMetaTags();
    this.cart$ = this.cartService.getCart();
    this.subscriptions.sink = this.cartService.isOrderPlaced.subscribe(
      (isOrderPlaced) => {
        if (isOrderPlaced) {
          this.thankYouModal.nativeElement.click();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
