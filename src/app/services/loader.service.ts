import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading$ = new ReplaySubject<boolean>();
  isLoading: Observable<boolean> = this.isLoading$.asObservable();

  constructor() {}

  showLoader() {
    this.isLoading$.next(true);
  }

  hideLoader() {
    this.isLoading$.next(false);
  }
}
