import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../../core/urls.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _urlService: UrlsService) { }

  private _loginUrl = this._urlService.rootUrl + 'api/rest-auth/login/';
  private _registerUrl = this._urlService.rootUrl + 'api/rest-auth/registration/';

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }

}

// TODO: See if you must not change this server adress, or add a variable for it, to make the app in phone work
