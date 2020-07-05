import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deals-section',
  templateUrl: './deals-section.component.html',
  styleUrls: ['./deals-section.component.scss']
})
export class DealsSectionComponent implements OnInit {
  config = { leftTime: 0 };
  date: Date = new Date('2020-05-16T18:00:00');

  constructor() { }

  ngOnInit(): void {
    var date = new Date('2020-05-16T18:00:00')
    var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const endDate = new Date(date.getTime() - userTimezoneOffset);
    const currentDate = new Date(new Date().getTime() - userTimezoneOffset);
    const diffInSeconds = (endDate.getTime() - currentDate.getTime()) / 1000;
    this.config = { leftTime: Math.round(diffInSeconds) }
  }

}
