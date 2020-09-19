import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@models/category.model';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, Renderer2, Input } from '@angular/core';
import { Brand } from '@models/brand.model';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() brands: Brand[] = [];
  searchValue: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  closeMobileDrawer() {
    this.renderer.removeClass(this.document.body, 'mmenu-active');
    this.renderer.removeClass(this.document.body, 'noscroll');
  }

  onChange(event) {
    this.searchValue = event.target.value;
  }

  onKeyDown(event) {
    if (event.key === 'Enter' && this.searchValue) {
      this.onSubmit();
    }
  }

  onSubmit(event?) {
    event?.preventDefault();
    this.router.navigate(['/shop/search', this.searchValue], {
      relativeTo: this.route,
    });
    this.closeMobileDrawer();
  }
}
