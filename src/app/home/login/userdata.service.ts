import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http: HttpClient) { }

  private _userNames = 'http://127.0.0.1:8000/api/users/';

  getUsers() {
    return this.http.get<any>(this._userNames);
  }
}
