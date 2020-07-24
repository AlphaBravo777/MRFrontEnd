import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../../../core/urls.service';
import { IUser, userBackendFactory, IUserBackend } from './user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private urlService: UrlsService) { }

    registerUser(user) {
        return this.http.post<any>(this.urlService.registerUrl, user);
    }

    loginUser(user: IUser) {
        // console.log(user);
        return this.http.post<any>(this.urlService.loginUrl, user);
    }

    isTokenValid() {
        const a = { 'token': localStorage.getItem('token') };
        return this.http.post<any>(this.urlService.verifyTokenUrl, a, { observe: 'response' });
    }

    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }

}
