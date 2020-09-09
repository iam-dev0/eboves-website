import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('inside error interceptor');
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof HttpErrorResponse) {
          // client side error
          errorMsg = `message: ${error.error.message}`;
        } else {
          // Network error
          errorMsg = `status: ${error.status}, message: ${error.message}`;
        }
        // console.log('error: ', errorMsg);
        return throwError({ errorMsg, error: error.error });
      })
    );
  }
}
