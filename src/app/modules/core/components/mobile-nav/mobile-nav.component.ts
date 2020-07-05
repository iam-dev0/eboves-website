import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  closeMobileDrawer() {
    this.renderer.removeClass(this.document.body, 'mmenu-active');
    // this.renderer.removeClass(this.document.getElementsByClassName('mobile-menu-toggler'), 'active');
    // console.log('closing drawer!!!');
  }
}
