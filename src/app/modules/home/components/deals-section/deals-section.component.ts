import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '@models/banner.model';

@Component({
  selector: 'app-deals-section',
  templateUrl: './deals-section.component.html',
  styleUrls: ['./deals-section.component.scss'],
})
export class DealsSectionComponent implements OnInit {
  @Input() deals: Banner[] = [];

  constructor() {}

  ngOnInit(): void {}
}
