import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../../core/urls.service';
import { map, catchError } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/observable/of';
// import { Observable } from '../../../../../node_modules/rxjs';
// import 'rxjs/add/observable/of';
import { of } from 'rxjs';


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

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isTokenValid().pipe(map(e => {
            if (e) {
                console.log(e);
                return true;
            }
        }),
        catchError(() => {
            this.router.navigate(['/login']);
            return of(false);
        }));
    }


    }

