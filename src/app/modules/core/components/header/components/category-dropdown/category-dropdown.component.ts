import { Component, OnInit, Input } from '@angular/core';
import { Category } from '@models/category.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-category-dropdown',
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.scss'],
})
export class CategoryDropdownComponent implements OnInit {
  @Input() categories: Category[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  getHTML() {
    return this.sanitizer.bypassSecurityTrustHtml(`<li>
    <a>Main 1</a>
    <ul class="menu-vertical sf-arrows">
      <li><a>Action 1</a></li>
      <li>
        <a>Action 2</a>
        <ul class="menu-vertical sf-arrows">
          <li><a>SubAction 1</a></li>
          <li>
            <a>SubAction 2</a>
          </li>
          <li><a>SubAction 3</a></li>
        </ul>
      </li>
      <li><a>Action 3</a></li>
    </ul>
  </li>
  <li><a>Main 2</a></li>
  <li><a>Main 3</a></li>`);
  }
}
