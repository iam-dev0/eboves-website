import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean> = this.loaderService.isLoading;
  private subscriptions = new SubSink();

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscriptions.sink = this.isLoading$.subscribe((loading) => {
      console.log('loading: ', loading);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
