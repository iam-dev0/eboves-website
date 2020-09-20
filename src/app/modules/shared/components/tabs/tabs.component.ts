import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Tab } from '@models/tab.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, OnChanges {
  @Input() tabs: Tab[];
  selectedTab: Tab;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const change in changes) {
      if (changes.hasOwnProperty(change)) {
        switch (change) {
          case 'tabs':
            this.selectedTab = this.tabs[0];
            break;
          default:
        }
      }
    }
  }

  onTabChange(tab: Tab) {
    this.selectedTab = tab;
  }
}
