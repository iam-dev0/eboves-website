import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eboves-Angular';
  showScrollTop: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const scrollTop = this.document.documentElement.scrollTop;
    if (scrollTop >= 400) {
      this.showScrollTop = true;
    } else {
      this.showScrollTop = false;
    }
  }

  isScrollTopVisible() {
    if (this.showScrollTop) {
      return 'show';
    } else {
      return '';
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
