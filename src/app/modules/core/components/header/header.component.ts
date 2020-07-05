import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
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
