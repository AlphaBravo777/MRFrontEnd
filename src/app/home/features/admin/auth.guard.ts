import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate() {
        return this.authService.isTokenValid().pipe(map(e => {
            if (e) {
                console.log(e);
                return true;
            } else {
                console.log('Not authorized');
            }
        }),
        catchError(() => {
            this.router.navigate(['/login']);
            return of(false);
        }));
    }


    }

