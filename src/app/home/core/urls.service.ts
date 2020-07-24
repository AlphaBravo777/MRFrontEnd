import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

    // root = 'http://192.168.2.25'; // This is meatrite live test server
    // monolithBackendUrl = this.root + ':8000/';

    root = 'http://192.168.2.27';
    monolithBackendUrl = this.root + ':8011/';

    // -----------------------------------------------------------------------------------------------------------------------
    // Production (25) Server (Old Server)
    // -----------------------------------------------------------------------------------------------------------------------

    // mediaUrl = this.monolithBackendUrl + 'media/';
    // graphqlAddress = this.root + ':8000/graphql/';
    // mrOrderService = this.root + ':8084/';
    // dockerServer = 'http://192.168.2.27';
    // sagaCoordinatorMS = this.dockerServer + ':8070/';
    // mrProductService = this.dockerServer + ':8084/';
    // mrAccountService = this.root + ':8085/';

    // // - USER -
    //     loginUrl = this.monolithBackendUrl + 'api/rest-auth/login/';
    //     verifyTokenUrl = this.monolithBackendUrl + 'api/api-token-verify/';
    //     registerUrl = this.monolithBackendUrl + 'api/rest-auth/registration/';
    //     permissionsUrl = this.monolithBackendUrl + 'api/test/';

    // - PRODUCTS -
            productsUrl = this.monolithBackendUrl + 'api/products/';
            getProductContainersUrl = this.productsUrl + 'containers/'; // First Meatrite stocktake app
            deleteProcessedStock = this.productsUrl + 'delete/'; // First Meatrite stocktake app
            getProcessedStockContainersToDeleteUrl = this.productsUrl + 'delete/containers/half'; // First Meatrite stocktake app
            updateProcessedStockContainerDeleteUrl = this.productsUrl + 'delete/containerUpdate/'; // First Meatrite stocktake app
            checkConnectionWithDelete = this.productsUrl + 'testDelete/'; // First Meatrite stocktake app
            enterAllProcessedProducts = this.productsUrl + 'input/'; // First Meatrite stocktake app
            // getStockTimes = this.productsUrl + 'getStockTimes/'; // Timestamp app

    // - OFFICE -
    private officeUrl = this.monolithBackendUrl + 'office/'; //

        // - CHECKLIST -
        private checklistUrl = this.officeUrl + 'checklists/'; // !!!!!!!!!!!!!  // Old url that is not really used
            enterNewChecklistUrl = this.checklistUrl + 'enterNew/'; // Old checklist url that is not really used

        // - REPORT -
        // private reportUrl = this.officeUrl + 'report/';
        //     enterNewReportUrl = this.reportUrl + 'enterNew/'; //
        //     updateReportUrl = this.reportUrl + 'update/'; //
        //     insertReportImageUrl = this.reportUrl + 'insertImage/'; //
        //     deleteReportUrl = this.reportUrl + 'deleteReport/'; //

        // - ORDERS -
        private orderUrl = this.officeUrl + 'orders/';
            // enterOrderDetailsUrl = this.orderUrl + 'enterDetails/'; // NB This is the enter new orders link
            enterProductAmountsUrl = this.orderUrl + 'enterProductAmounts/'; // This url seems to just be commented out at the backend

        // // - TIMESTAMP -
        // private timeStampUrl = this.officeUrl + 'timeStamp';
        //     getOrCreateWholeDayTimeStampID = this.timeStampUrl + 'wholeDay/';

    // - STOCK -
    private stockUrl = this.monolithBackendUrl + 'stock/';

        enterProcessedStock = this.stockUrl + 'procStock/update/'; // Old url that is not really used
        enterContainerRankings = this.stockUrl + 'containerRankings/update/'; // Old url that is not really used

    // // - CORE -
    // private coreUrl = this.monolithBackendUrl + 'core/';
    //     getTimeStampIDUrl = this.coreUrl + 'createTimeStampID/';

    // -----------------------------------------------------------------------------------------------------------------------
    // Production (27) Server (New Docker Server)
    // -----------------------------------------------------------------------------------------------------------------------


    mrOrderService = this.root + ':8013/';
    mrAccountService = this.root + ':8014/';
    mrProductService = this.root + ':8015/';
    sagaCoordinatorMS = this.root + ':8070/';
    mediaUrl = this.monolithBackendUrl + 'media/';
    graphqlAddress = this.root + ':8011/graphql/';

    // - USER -
        loginUrl = this.monolithBackendUrl + 'user/api-token-auth/';
        verifyTokenUrl = this.monolithBackendUrl + 'user/api-token-verify/';
        permissionsUrl = this.monolithBackendUrl + 'user/groups/';
        registerUrl = this.monolithBackendUrl + 'api/rest-auth/registration/';

    // - DAILYREPORT -
        private dailyReportUrl = this.monolithBackendUrl + 'dailyreport/';
            enterNewReportUrl = this.dailyReportUrl + 'enterNewReport/';
            updateReportUrl = this.dailyReportUrl + 'updateReport/';
            insertReportImageUrl = this.dailyReportUrl + 'insertReportImage/';
            deleteReportUrl = this.dailyReportUrl + 'deleteReport/';

    // - TIMESTAMP -
        private timeStampUrl = this.monolithBackendUrl + 'dateTime/';
            getOrCreateWholeDayTimeStampID = this.timeStampUrl + 'getOrCreateWholeDayTimeStampID/';
            getTimeStampIDUrl = this.timeStampUrl + 'createTimeStampID/';
            getStockTimes = this.timeStampUrl + 'getStockTimes/';

    // -----------------------------------------------------------------------------------------------------------------------
    // Url links for all api calls inside frontend
    // -----------------------------------------------------------------------------------------------------------------------







    // -----------------------------------------------------------------------------------------------------------------------
    // Development (25) Server
    // -----------------------------------------------------------------------------------------------------------------------

    // monolithBackendUrl = this.root + ':8080/';
    // graphqlAddress = this.root + ':8080/graphql/';


    currentVersion = '2.0.5';

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
// 2.0.4
    // Created account insert form
    // Created change routes and dates for route
// 2.0.5
    // Moved the whole backend over to the meatritedocker server



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
