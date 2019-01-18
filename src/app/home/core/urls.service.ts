import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

    // root = 'http://127.0.0.1'; // This is home development server
    // root = 'http://192.168.2.24'; // This is meatrite live test server
    root = 'http://192.168.2.25'; // This is meatrite live test server
    // root = 'http://192.168.45.2'; // This is meatrite development server

    // rootUrl = this.root + ':8000/';
    // graphqlAddress = this.root + ':8000/graphql/';

    rootUrl = this.root + ':8080/';
    graphqlAddress = this.root + ':8080/graphql/';

    currentVersion = 1.15;

}
