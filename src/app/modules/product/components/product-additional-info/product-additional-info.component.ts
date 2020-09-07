import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-additional-info',
  templateUrl: './product-additional-info.component.html',
  styleUrls: ['./product-additional-info.component.scss'],
})
export class ProductAdditionalInfoComponent implements OnInit {
  @Input() additionalInfo: string;

  constructor() {}

  ngOnInit(): void {}
}
