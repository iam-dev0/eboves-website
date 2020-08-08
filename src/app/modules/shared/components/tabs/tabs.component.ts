import { Component, OnInit, Input } from '@angular/core';
import { Tab } from '@models/tab.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() tabs: Tab[];

  constructor() {}

  ngOnInit(): void {}
}
