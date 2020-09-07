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
}
