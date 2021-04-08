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

    // root = environment.root; // Local Meatrite dev backend servers // There is a problem where if you load the route from the enviroment it builds a strange url with double the root in the url

    // -----------------------------------------------------------------------------------------------------------------------
    // Production (27) Server (New Docker Server)
    // -----------------------------------------------------------------------------------------------------------------------

    root = 'http://192.168.2.27';

    // -----------------------------------------------------------------------------------------------------------------------
    // Links that should work on all servers
    // -----------------------------------------------------------------------------------------------------------------------

        mrGatewayService = this.root + environment.mrGatewayService; // Tested
        // mrGatewayService = environment.mrGatewayService; // Tested

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
        private productsUrl = this.mrGatewayService + environment.productsUrl; // NOT Tested
            // getProductContainersUrl = this.productsUrl + 'containers/'; // NOT Tested
            // deleteProcessedStock = this.productsUrl + 'delete/'; // NOT Tested
            // getProcessedStockContainersToDeleteUrl = this.productsUrl + 'delete/containers/half'; // NOT Tested
            // updateProcessedStockContainerDeleteUrl = this.productsUrl + 'delete/containerUpdate/'; // NOT Tested
            // checkConnectionWithDelete = this.productsUrl + 'testDelete/'; // NOT Tested
            // enterAllProcessedProducts = this.productsUrl + 'input/'; // NOT Tested
            // allActiveProducts = this.productsUrl + 'noNewEndpointHereYet/'; // NOT Tested
            // getAllStockForSpecificTime = this.productsUrl + 'noNewEndpointHereYet/'; // NOT Tested

            // insertOrUpdateItem = this.productsUrl + + environment.insertOrUpdateItem; // This url was only added to avoid an error in component that uses it (Not working)


        // == PRODUCTION ==
        private productionUrl = this.mrGatewayService + environment.productionUrl; // Tested
            getBatchesIfExistElseInsert = this.productionUrl + environment.getBatchesIfExistElseInsert;

        // == ACCOUNTS ==
        private accountsUrl = this.mrGatewayService + environment.accountsUrl; // Not Tested
            insertOrUpdateAccount = this.accountsUrl + environment.insertOrUpdateAccount; // Not Tested
            deleteAccount = this.accountsUrl + environment.deleteAccount; // Not Tested



    currentVersion = '3.1.0';

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
// 2.0.7
    // Mayor new update where every rest-api-call points to the gateway, and gets redirected from there
    // All backends also gets upgraded to new services
    // nginx will also be the web server of choise from here on to help with refreshing pages

// 3.0.0
    // We are now running on the new version
    // Add hints on mouse over for stocktake batches
// 3.0.1
    // Enter does not submit stock take
    // Input fields for stocktake is larger
// 3.0.2
    // Highlight input boxes as you tab down
    // You can now read in half a stock take
// 3.1.0
    // Changed ordersService to work from productionService and no longer productMSdb
    // Added smaller things like green confirm when ientering order



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
