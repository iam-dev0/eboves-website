import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent implements OnInit {
  searchValue: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onChange(event) {
    this.searchValue = event.target.value;
  }

  onKeyDown(event) {
    if (event.key === 'Enter' && this.searchValue) {
      this.onSubmit();
    }
  }

  onSubmit(event?) {
    event?.preventDefault();
    this.router.navigate(['/shop/search', this.searchValue], {
      relativeTo: this.route,
    });
  }
}
