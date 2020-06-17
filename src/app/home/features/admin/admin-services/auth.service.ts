import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../../../core/urls.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private urlService: UrlsService) { }

  private loginUrl = this.urlService.backendUrl + 'api/rest-auth/login/';
  private checkToken = this.urlService.backendUrl + 'api/api-token-verify/';
  private registerUrl = this.urlService.backendUrl + 'api/rest-auth/registration/';

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  isTokenValid() {
    const a = {'token': localStorage.getItem('token')};
    return this.http.post<any>(this.checkToken, a, {observe: 'response'});
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

}
