import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpCallInterceptorService } from './http-call-interceptor.service';
import { HttpErrorInterceptorService } from './http-error-interceptor.service';

export const HttpInterceptorsProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCallInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptorService,
    multi: true,
  },
];
