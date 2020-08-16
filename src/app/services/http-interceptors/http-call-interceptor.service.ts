import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  TransferState,
  StateKey,
  makeStateKey,
} from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpCallInterceptorService implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // To only intercept GET calls
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const key: StateKey<string> = makeStateKey<string>(req.url);

    if (isPlatformServer(this.platformId)) {
      return next.handle(req).pipe(
        tap((event) => {
          // console.log('server: saving response state: ', req.url);
          this.transferState.set(key, (<HttpResponse<any>>event).body);
        })
      );
    } else {
      const storedResponse = this.transferState.get<any>(key, null);
      if (storedResponse) {
        const response = new HttpResponse({
          body: storedResponse,
          status: 200,
        });
        this.transferState.remove(key);
        // console.log('client: getting response state: ', req.url);
        return of(response);
      } else {
        // console.log('client: no saved response state: ', req.url);
        return next.handle(req);
      }
    }
  }
}
