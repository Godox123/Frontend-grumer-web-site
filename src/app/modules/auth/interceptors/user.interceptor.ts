import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, empty, Subject, Subscribable } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set(
        'access_token',
        document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
          '$1'
        )
      )
    });
    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) return event;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) return { message: 'Unautorized' };
          }
        }
      )
    );
  }
}
