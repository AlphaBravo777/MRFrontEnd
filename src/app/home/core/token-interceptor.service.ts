import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../features/admin/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _auth: AuthService) { }

  // Here we intercept ANY HTTP request, and we return an observable that I think the next handler can intercept if neccesary
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Here we get the token in browser storage, and in the next line check if there is a token or not.
    const hasToken = this._auth.getToken();
    if (hasToken) {
  // Initial request in imutable, so we have to clone it first
      request = request.clone({
  // Now we are setting the actual header
        setHeaders: {
          Authorization: `JWT ${this._auth.getToken()}`
        }
      });
    } else {console.log('There is no token'); }
  // We now return the request, and if there is another interceptor it will pick it up, or it will be send through
    return next.handle(request);
  }
}

/*

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
*/
