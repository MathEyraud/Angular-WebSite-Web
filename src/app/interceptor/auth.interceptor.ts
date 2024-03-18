import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('jwt');
    if (token) {
      const cloneReq = req.clone({
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }),
      });
      return next.handle(cloneReq);
    } else {
      return next.handle(req).pipe(catchError(
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigate(['']);
          } else if (err.status === 403) {
            this.router.navigate(['']);
          }
          return throwError(() => new Error("Some thing is wrong"));
        }
      ));
    }
  }
}
