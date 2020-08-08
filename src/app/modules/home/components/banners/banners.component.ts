import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '@models/banner.model';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {
  @Input() banners: Banner[] = [];

  constructor() {}

  ngOnInit(): void {}

  getImage(index: number): string {
    return this.banners[index] ? this.banners[index].image : '';
  }
}
