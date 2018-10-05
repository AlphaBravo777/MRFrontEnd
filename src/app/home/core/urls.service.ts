import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

//   rootUrl: String = 'http://192.168.2.24:8000/';  // This is meatrite live test server
    rootUrl: String = 'http://192.168.45.2:8000/';  // This is development server at work
    graphqlAddress = 'http://192.168.2.24:8000/graphql/';



//   rootUrl: String = 'http://192.168.45.3:80/';  //This is Ubuntu server

//   rootUrl: String = 'http://192.168.2.26:8000/';  // This is meatrite live netwerk op ProgammingPC
//   rootUrl: String = 'http://192.168.45.2:8000/graphql/';  // This is graphql development server at work

//    rootUrl: String = 'http://127.0.0.1:8000/';  // This is normal localhost server (for like at home)

    // graphqlAddress = 'http://192.168.2.24:8000/graphql/';

}
