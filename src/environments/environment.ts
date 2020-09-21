// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

    production: false,

    root: 'http://localhost',

        mrGatewayService: ':8010/',

        adminUrl: 'admin/',

        mediaUrl: 'media/',

        graphqlAddress: 'graphql/',

            mrUserService: 'user/',
                loginUrl: 'login/',
                verifyTokenUrl: 'verify-user/',
                permissionsUrl: 'groups/',
                registerUrl: 'registration/',

            timeStampUrl: 'dateTime/',
                getTimeStampidOrCreateNew: 'getOrCreateTimeStamp/',
                getStockTimes: 'stockTakingTimeMany/',

            dailyReportUrl: 'dailyReport/',
                enterNewReportUrl: 'enterNewReport/',
                updateReportUrl: 'updateReport/',
                insertReportImageUrl: 'insertReportImage/',
                deleteReportUrl: 'deleteReport/',

            officeUrl: 'office/',
                checklistUrl: 'checklists/',
                    enterNewChecklistUrl: 'enterNew/',

            orderServiceUrl: 'orders/',
                insertNewOrderDetailsUrl: 'insertNewOrderDetails/',
                insertProductAmounts: 'insertProductAmounts/',
                deleteProduct: 'deleteProduct/',
                deleteOrder: 'deleteOrder/',
                updateRouteDate: 'updateRouteDate/',
                refreshWeeklyOrdersCacheUrl: 'refreshWeeklyOrdersCache/',
                getAllOrdersForTimeStampid: 'orderForTimeStampidMany/',
                insertKafkaNewOrderDetails: 'insertKafkaNewOrderDetails/',

            stockTakeurl: 'stockTake/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
