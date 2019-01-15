import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../features/admin/admin-services/auth.service';
import { DialogBoxService } from './dialog-box/dialog-box.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private auth: AuthService, private dialogBoxService: DialogBoxService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers = new HttpHeaders({});
        const hasToken = this.auth.getToken();

        if (hasToken) {
            headers = new HttpHeaders({
                'Authorization': `JWT ${this.auth.getToken()}`,
                'Cache-Control': 'must-revalidate'
            });
        } else {
            console.log('There is no token');
            // this.dialogBoxService.passwordNotCorrect();
        }

        const cloneReq = request.clone({ headers });

        return next.handle(cloneReq);
    }
}

// export class TokenInterceptorService implements HttpInterceptor {

//     constructor(private auth: AuthService, private dialogBoxService: DialogBoxService) { }

//     // Here we intercept ANY HTTP request, and we return an observable that I think the next handler can intercept if neccesary
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Here we get the token in browser storage, and in the next line check if there is a token or not.
//       const hasToken = this.auth.getToken();
//       if (hasToken) {
//     // Initial request in imutable, so we have to clone it first
//         request = request.clone({
//     // Now we are setting the actual header
//           setHeaders: {
//             Authorization: `JWT ${this.auth.getToken()}`
//           }
//         });
//       } else {
//           console.log('There is no token');
//           // this.dialogBoxService.passwordNotCorrect();
//       }
//     // We now return the request, and if there is another interceptor it will pick it up, or it will be send through
//       return next.handle(request);
//     }
// }
