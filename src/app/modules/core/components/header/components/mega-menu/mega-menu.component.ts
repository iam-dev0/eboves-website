import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '@models/brand.model';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
})
export class MegaMenuComponent implements OnInit {
  @Input() brands: Brand[] = [];

  constructor() {}

  ngOnInit(): void {}
}
