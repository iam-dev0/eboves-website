import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '@models/banner.model';

@Component({
  selector: 'app-deals-section',
  templateUrl: './deals-section.component.html',
  styleUrls: ['./deals-section.component.scss'],
})
export class DealsSectionComponent implements OnInit {
  // config = { leftTime: 0 };
  // date: Date = new Date('2020-05-16T18:00:00');
  @Input() deals: Banner[] = [];

  constructor() {}

  ngOnInit(): void {
    // var date = new Date('2020-05-16T18:00:00')
    // var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    // const endDate = new Date(date.getTime() - userTimezoneOffset);
    // const currentDate = new Date(new Date().getTime() - userTimezoneOffset);
    // const diffInSeconds = (endDate.getTime() - currentDate.getTime()) / 1000;
    // this.config = { leftTime: Math.round(diffInSeconds) }
  }

  getImage(index: number): string {
    return this.deals[index] ? this.deals[index].image : '';
  }
}
