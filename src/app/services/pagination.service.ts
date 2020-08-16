import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private page = new Subject<any>();

  constructor() {}

  resetPage() {
    this.page.next();
  }

  resetPageListener(): Observable<any> {
    return this.page.asObservable();
  }
}
