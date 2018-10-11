import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

    // root = 'http://192.168.2.24'; // This is meatrite live test server
    root = 'http://192.168.45.2'; // This is meatrite development server

    rootUrl = this.root + ':8000/';
    graphqlAddress = this.root + ':8000/graphql/';

}
