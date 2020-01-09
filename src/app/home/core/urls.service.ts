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

    mrOrderService = this.root + ':8084/';

    // -----------------
    // Production Server
    // -----------------

    // backendUrl = this.root + ':8000/';
    // graphqlAddress = this.root + ':8000/graphql/';

    // ------------------
    // Development Server
    // ------------------

    backendUrl = this.root + ':8080/';
    graphqlAddress = this.root + ':8080/graphql/';

    currentVersion = '2.0.1';

}

// 1.16 Have changed the dailyReport to the new format with reply and image functions
// 1.16.2 Changed the "thinking" bug where entering a new report worked from "of-zen" import and not "of-rxjs" import
// 1.16.3 (Release: 2019/02/25)
    // Added hpp-summary-table to show proof of concept on how the hpp could be tracked ("How many MR pnp stock, and where is it?")
// 1.16.4 (Release: 2019/08/22)
    // Added time to dailyReport
    // Added orderInsert module
    // Added hpp pallet calculation module
// 1.17.0 (Release: 2019/09/19)
    // Added all the orders modules.
    // DB from factory also runs now from portal DB
    // Admin office starting to use orders module
    // Added login screen menus where you can see the daily report or orders
    // Upgraded to Ivy
// 1.17.3 (Release 2019/10/08)
    // Added MR loading screen
    // Changed week total to new API
// 1.17.4 (Release 2019/10/08)
    // Without Ivy (Ivy makes some shared components not show up)
// 1.17.5 (Release 2019/10/08)
    // Fix bug where insert order product ending with a letter is seen as lowercase
// 2.0.0 (Release 2020/01/06)
