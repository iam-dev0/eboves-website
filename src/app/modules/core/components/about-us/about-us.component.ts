import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '@services/home.service';
import { Brand } from '@models/brand.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  brands$: Observable<Brand[]>;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.brands$ = this.homeService.getFeaturedBrands().pipe(
      map((brands: Brand[]) => {
        return brands.slice(0, 8);
      })
    );
  }
}
