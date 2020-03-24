import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

    root = 'http://192.168.2.25'; // This is meatrite live test server
    mrOrderService = this.root + ':8084/';

    dockerServer = 'http://192.168.2.27';
    sagaCoordinatorMS = this.dockerServer + ':8070/';
    mrProductService = this.dockerServer + ':8084/';

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

    currentVersion = '2.0.4';

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
    // Updated frontend so that orders can be read in using lower or uppercase
    // Got the factory on the same sheet as the office
// 2.0.1 (Release 2020/01/14)
    // Added api that sends all orders to kafka so long to start getting a record of orders
    // Changed orders input to use small and uppercase letters
// 2.0.2
    // Added small stock take function where the butchery can do stock take and export an excel sheet that can then be used with
    // the Smart-IT program
// 2.0.3
    // Created way to store data locally when doing small butchery stock take
    // Added functionality to re-calculate weekly order totals for weeklyOrdersCache


// -------------------------------------------------------------------------
// - - - - - - Workflow to change version numbers on frontend server - - - -
// -------------------------------------------------------------------------

// Updating Frontend to server
//      Make sure all ip's are correct  (Database server (192.168.2.25) and GraphQL (:8000/))
// 	    Change Version number
// 	    Run ng build --prod   (or for current servers: ng build --prod --build-optimizer --aot )
// 	    On production pc go to \\192.168.2.25\Factory share\meatriteFrontEnd and paste files there
// 	    Server directory ->  /var/www/frontend.com/public_html/  // This is where you put the server files (Or in frontend2.com)
// 	    Delete old  files (some files get a new name each time, and won’t be replaced, so they will become more and more if not deleted)
// 	    Copy static files to server
// 	    Go to etc/apache/sites-available/ and in 000-default.conf you must flip the current production version to the new one.
            // Do not change the port number, rather change the folder from "frontend" to "frontend2" or vice-versa.

// Logs:
//      In the django/meatriteApi folder under logs are all the server logs, the 'error.logs' have the same output as a django dev server…

// Restart Apache2 server -> "sudo service apache2 restart"
