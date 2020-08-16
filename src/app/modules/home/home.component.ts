import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import { Banners } from '@models/api-responses/banners.model';
import { Response } from '@models/api-responses/response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  banners: Banners;

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.service.getBanners().subscribe((response: Response<Banners>) => {
      this.banners = response.data;
    });
  }
}
