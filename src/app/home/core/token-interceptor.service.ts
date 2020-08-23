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
