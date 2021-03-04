import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

    // -----------------------------------------------------------------------------------------------------------------------
    // Development Server (Localhost)
    // -----------------------------------------------------------------------------------------------------------------------

    root = environment.root; // Local Meatrite dev backend servers

    // -----------------------------------------------------------------------------------------------------------------------
    // Production (27) Server (New Docker Server)
    // -----------------------------------------------------------------------------------------------------------------------

    // root = 'http://192.168.2.27';

    // -----------------------------------------------------------------------------------------------------------------------
    // Links that should work on all servers
    // -----------------------------------------------------------------------------------------------------------------------

        mrGatewayService = this.root + environment.mrGatewayService; // Tested

        // == ADMIN ==
        adminUrl = this.mrGatewayService + environment.adminUrl; // Tested

        // == MEDIA ==
        mediaUrl = this.mrGatewayService + environment.mediaUrl; // !!! This endpoint needs serious attention (Can not see images)
        // For now we would have to use it directly, instead of through the gateway

        // == GRAPHQL ==
        graphqlAddress = this.mrGatewayService + environment.graphqlAddress; // Tested

        // == USERSERVICE ==
        private mrUserService = this.mrGatewayService + environment.mrUserService;
            loginUrl = this.mrUserService + environment.loginUrl; // Tested
            verifyTokenUrl = this.mrUserService + environment.verifyTokenUrl; // Tested
            permissionsUrl = this.mrUserService + environment.permissionsUrl; // Tested
            registerUrl = this.mrUserService + environment.registerUrl; // NOT Tested

        // == TIMESTAMP ==
        private timeStampUrl = this.mrGatewayService + environment.timeStampUrl;
            getTimeStampidOrCreateNew = this.timeStampUrl + environment.getTimeStampidOrCreateNew; // Tested
            getStockTimes = this.timeStampUrl + environment.getStockTimes; // Tested

        // == DAILYREPORT ==
        private dailyReportUrl = this.mrGatewayService + environment.dailyReportUrl;
            enterNewReportUrl = this.dailyReportUrl + environment.enterNewReportUrl; // Tested
            updateReportUrl = this.dailyReportUrl + environment.updateReportUrl; // Tested
            insertReportImageUrl = this.dailyReportUrl + environment.insertReportImageUrl; // Tested
            deleteReportUrl = this.dailyReportUrl + environment.deleteReportUrl; // Tested

        // == OFFICE ==
        officeUrl = this.mrGatewayService + environment.officeUrl; // NOT Tested

            // == CHECKLIST ==
            private checklistUrl = this.officeUrl + environment.checklistUrl; // NOT Tested
                enterNewChecklistUrl = this.checklistUrl + environment.enterNewChecklistUrl; // NOT Tested

        // == ORDERS ==
        private orderServiceUrl = this.mrGatewayService + environment.orderServiceUrl;
            insertNewOrderDetailsUrl = this.orderServiceUrl + environment.insertNewOrderDetailsUrl; // Tested
            insertProductAmounts = this.orderServiceUrl + environment.insertProductAmounts; // Tested
            deleteProduct = this.orderServiceUrl + environment.deleteProduct; // Tested
            deleteOrder  = this.orderServiceUrl + environment.deleteOrder; // Tested
            updateRouteDate = this.orderServiceUrl + environment.updateRouteDate; // Tested
            refreshWeeklyOrdersCacheUrl = this.orderServiceUrl + environment.refreshWeeklyOrdersCacheUrl; // Tested
            getAllOrdersForTimeStampid = this.orderServiceUrl + environment.getAllOrdersForTimeStampid; // Excel endpoint
            insertKafkaNewOrderDetails = this.orderServiceUrl + environment.insertKafkaNewOrderDetails; // NOT Tested

        // == STOCKTAKE ==
        private stockTakeurl = this.mrGatewayService + environment.stockTakeurl; // NOT Tested
         insertStockTakeInstance = this.stockTakeurl + environment.insertStockTakeInstance
         deleteStockTakeInstance = this.stockTakeurl + environment.deleteStockTakeInstance
         insertStockTake = this.stockTakeurl + environment.insertStockTake

        // == PRODUCTS ==
        private productsUrl = this.mrGatewayService + 'products/'; // NOT Tested
            getProductContainersUrl = this.productsUrl + 'containers/'; // NOT Tested
            deleteProcessedStock = this.productsUrl + 'delete/'; // NOT Tested
            getProcessedStockContainersToDeleteUrl = this.productsUrl + 'delete/containers/half'; // NOT Tested
            updateProcessedStockContainerDeleteUrl = this.productsUrl + 'delete/containerUpdate/'; // NOT Tested
            checkConnectionWithDelete = this.productsUrl + 'testDelete/'; // NOT Tested
            enterAllProcessedProducts = this.productsUrl + 'input/'; // NOT Tested
            allActiveProducts = this.productsUrl + 'noNewEndpointHereYet/'; // NOT Tested
            getAllStockForSpecificTime = this.productsUrl + 'noNewEndpointHereYet/'; // NOT Tested

        // == PRODUCTION ==
        private productionUrl = this.mrGatewayService + environment.productionUrl; // Tested
            getBatchesIfExistElseInsert = this.productionUrl + environment.getBatchesIfExistElseInsert





    monolithBackendUrl = this.root + ':8011/';  // Meatrite test server
    mrOrderService = this.root + ':8013/';  // Use gateway service
    mrAccountService = this.root + ':8014/';  // Use gateway service
    mrProductService = this.root + ':8015/';  // Use gateway service
    mrStocktakeService = this.root + ':8017/';  // Use gateway service
    sagaCoordinatorMS = this.root + ':8070/';  // Use gateway service

    // - USER -
        // * private mrUserService = this.mrGatewayService + 'user/';
        // * loginUrl = this.mrUserService + 'login/';
        // loginUrl = this.monolithBackendUrl + 'user/api-token-auth/';
        // * verifyTokenUrl = this.mrUserService + 'verify-user/';
        // verifyTokenUrl = this.monolithBackendUrl + 'user/api-token-verify/';
        // permissionsUrl = this.monolithBackendUrl + 'user/groups/';
        // * permissionsUrl = this.mrUserService + 'groups/';
        // * registerUrl = this.monolithBackendUrl + 'api/rest-auth/registration/';

    // - DAILYREPORT -
        // * private dailyReportUrl = this.monolithBackendUrl + 'dailyreport/';
            // * enterNewReportUrl = this.dailyReportUrl + 'enterNewReport/';
            // * updateReportUrl = this.dailyReportUrl + 'updateReport/';
            // * insertReportImageUrl = this.dailyReportUrl + 'insertReportImage/';
            // * deleteReportUrl = this.dailyReportUrl + 'deleteReport/';

    // - TIMESTAMP -
        // * private timeStampUrl = this.monolithBackendUrl + 'dateTime/';
            // * getTimeStampIDUrl = this.timeStampUrl + 'getOrCreateTimeStamp/';
            // * getStockTimes = this.timeStampUrl + 'stockTakingTimeMany/';

    // -----------------------------------------------------------------------------------------------------------------------

    // - PRODUCTS -
        // Create mrMonolith user that would be unable to access the products table on the mrMonolithService db so that we can see who needs to use those tables
        // Change getting product ids from the mrMonolithService to the mrProductService
        // Move the models on the testMono to the old module of the programService
        // Make sure that now all product references everywhere is to the new ProductService
        // Go through all the microservices and make sure that there links are also working
        // Meatrite order entry not working when entering shop code
        // * productsUrl = this.monolithBackendUrl + 'api/products/';
            // * getProductContainersUrl = this.productsUrl + 'containers/'; // First Meatrite stocktake app
            // * deleteProcessedStock = this.productsUrl + 'delete/'; // First Meatrite stocktake app
            // * getProcessedStockContainersToDeleteUrl = this.productsUrl + 'delete/containers/half'; // First Meatrite stocktake app
            // * updateProcessedStockContainerDeleteUrl = this.productsUrl + 'delete/containerUpdate/'; // First Meatrite stocktake app
            // * checkConnectionWithDelete = this.productsUrl + 'testDelete/'; // First Meatrite stocktake app
            // * enterAllProcessedProducts = this.productsUrl + 'input/'; // First Meatrite stocktake app
            // getStockTimes = this.productsUrl + 'getStockTimes/'; // Timestamp app

    // - OFFICE -
        // * private officeUrl = this.monolithBackendUrl + 'office/'; //

    // - CHECKLIST -
        // * private checklistUrl = this.officeUrl + 'checklists/'; // !!!!!!!!!!!!!  // Old url that is not really used
            // * enterNewChecklistUrl = this.checklistUrl + 'enterNew/'; // Old checklist url that is not really used

    // // * - ORDERS -
    //     private orderUrl = this.officeUrl + 'orders/'; // Decided not to transfer these urls, cause there is already an orders service
    //         // enterOrderDetailsUrl = this.orderUrl + 'enterDetails/'; // NB This is the enter new orders link
    //         enterProductAmountsUrl = this.orderUrl + 'enterProductAmounts/'; // This url seems to just be commented out at the backend

    // * - STOCK -
        // * private stockUrl = this.monolithBackendUrl + 'stock/'; // Not currently in use

        // * enterProcessedStock = this.stockUrl + 'procStock/update/'; // Old url that is not really used
        // * enterContainerRankings = this.stockUrl + 'containerRankings/update/'; // Old url that is not really used


    currentVersion = '2.0.7';

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
// 2.0.6
    // Complete refracturing off the orders totals view components
    // Now has the shop totals on the top line as well



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
