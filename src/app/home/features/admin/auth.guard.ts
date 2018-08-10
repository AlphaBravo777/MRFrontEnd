import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../../core/urls.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from '../../../../../node_modules/rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private http: HttpClient,
        private _urlService: UrlsService,
    ) { }
    private checkToken = this._urlService.rootUrl + 'api/api-token-verify/';
    private a = {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNSwidXNlcm5hbWUiOiJhIiwiZXhwIjoxNTMzODk5Njg5LCJlbWFpbCI6ImFAYS5jb20iLCJvcmlnX2lhdCI6MTUzMzg4ODg4OX0.1YbPXlsTx2WlzGBZukzIz4OEHQ_NTPCdMsI99SQlnTw"};
    // canActivate() {
    //     // if (this._auth.loggedIn()) {
    //         // this._auth.isTokenValid().subscribe(x => {
    //         //     if (x.status === 200) {
    //         //         console.log('is token valid: ', x.status);
    //         //         return true;
    //         //     } else {
    //         //         this._router.navigate(['home']);
    //         //     }
    //         // });
    //         // return true;
    //             return this.http.post(this.checkToken, this.a).pipe(map((res: Response) => {
    //                if ( res.status === 200 ) {
    //                    console.log(res.status);
    //                    return true;

    //             } else {
    //                 console.log(res.status);
    //                 return true; }
    //             }));
    //         }
    //     // } else {
    //     //     this._router.navigate(['home']);
    //     //     return false;
    //     // }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | {}> {
        return this.authService.isTokenValid().pipe(map(e => {
            if (e) {
                console.log(e);
                return true;
            }
        }),
        catchError(() => {
            this.router.navigate(['/home']);
            return Observable.of(false);
        }));
    }


    }

