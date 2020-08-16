import { Category } from '@models/category.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-dropdown-item',
  templateUrl: './category-dropdown-item.component.html',
  styleUrls: ['./category-dropdown-item.component.scss'],
})
export class CategoryDropdownItemComponent implements OnInit {
  @Input() categories: Category[];
  @Input() baseLink: string;

  constructor() {}

  ngOnInit(): void {}
}
