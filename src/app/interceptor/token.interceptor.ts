import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { catchError } from 'rxjs/Operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
      request = request.clone({
        headers
      });
    }
    return next.handle(request)
      .pipe(
        catchError((error) => {
          if (error.status >= 500) {
            alert('Oops algo esta mal, intente de nuevo');
          }
          return throwError(error);
        })
      );
  }
}
