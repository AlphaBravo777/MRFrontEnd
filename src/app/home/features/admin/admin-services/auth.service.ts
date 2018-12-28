import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../../../core/urls.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _urlService: UrlsService) { }

  private _loginUrl = this._urlService.rootUrl + 'api/rest-auth/login/';
  private checkToken = this._urlService.rootUrl + 'api/api-token-verify/';
  private _registerUrl = this._urlService.rootUrl + 'api/rest-auth/registration/';

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  isTokenValid() {
      // tslint:disable-next-line
    // const a = {"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNSwidXNlcm5hbWUiOiJhIiwiZXhwIjoxNTMzOTE0NTQ3LCJlbWFpbCI6ImFAYS5jb20iLCJvcmlnX2lhdCI6MTUzMzkwMzc0N30._V6GQkkMB5XUfcuXA-H1ZNEnll-3dhpfpXpdYkG6goA"}
    const a = {'token': localStorage.getItem('token')};
    return this.http.post<any>(this.checkToken, a, {observe: 'response'});
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
    // localStorage.clear();
  }

}
