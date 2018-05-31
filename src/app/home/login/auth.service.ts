import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private _loginUrl = 'http://127.0.0.1:8000/api/rest-auth/login/';
  private _registerUrl = 'http://127.0.0.1:8000/api/rest-auth/registration/';

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

}

// TODO: See if you must not change this server adress, or add a variable for it, to make the app in phone work
