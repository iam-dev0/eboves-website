import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isLoading$: Observable<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.isLoading$.subscribe((loading) => {
      console.log('loading: ', loading);
    });
  }
}
