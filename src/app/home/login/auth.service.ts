import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private _registerUrl = 'http://127.0.0.1:8000/api/api/users/';

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

}
