import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

//   rootUrl: String = 'http://192.168.45.3:80/';  //This is Ubuntu server
  rootUrl: String = 'http://192.168.45.2:8000/';  // This is development server
}
