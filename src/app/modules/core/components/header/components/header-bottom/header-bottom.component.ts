import { Component, OnInit, Input } from '@angular/core';
import { Category } from '@models/category.model';

@Component({
  selector: 'app-header-bottom',
  templateUrl: './header-bottom.component.html',
  styleUrls: ['./header-bottom.component.scss'],
})
export class HeaderBottomComponent implements OnInit {
  @Input() categories: Category[] = [];

  constructor() {}

  ngOnInit(): void {}
}
