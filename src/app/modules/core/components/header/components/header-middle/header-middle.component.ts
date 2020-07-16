import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header-middle',
  templateUrl: './header-middle.component.html',
  styleUrls: ['./header-middle.component.scss'],
})
export class HeaderMiddleComponent implements OnInit {
  mobileDrawerOpen: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  toggleMobileDrawer() {
    this.mobileDrawerOpen = !this.mobileDrawerOpen;
    this.renderer.addClass(this.document.body, 'mmenu-active');
  }
}
