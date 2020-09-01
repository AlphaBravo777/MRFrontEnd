import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate(): Observable<boolean> {
        return this.authService.isTokenValid().pipe(
            map(validToken => {
                if (validToken) {
                    return true;
                } else {}
            }),
            catchError(() => {
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }


    }

