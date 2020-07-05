import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-newsletter-modal',
  templateUrl: './newsletter-modal.component.html',
  styleUrls: ['./newsletter-modal.component.scss'],
})
export class NewsletterModalComponent implements OnInit, AfterViewInit {
  @ViewChild('subscriptionModal') subscriptionModal: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.subscriptionModal.nativeElement.click();
      }, 5000);
    }
  }
}
