import { isPlatformBrowser } from '@angular/common';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoaderService } from '@services/loader.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptorService implements HttpInterceptor {
  private activeRequests: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      !this.activeRequests && this.loaderService.showLoader();

      this.activeRequests++;

      return next.handle(req).pipe(
        finalize(() => {
          this.activeRequests--;
          !this.activeRequests && this.loaderService.hideLoader();
        })
      );
    }
    return next.handle(req);
  }
}
