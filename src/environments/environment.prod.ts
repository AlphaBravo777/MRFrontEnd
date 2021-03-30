export const environment = {
    production: true,

    // root: 'http://192.168.2.27',
    root: '',

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

        stockTakeurl: 'stockTake/',
            insertStockTakeInstance: 'insertStockTakeInstance/',
            deleteStockTakeInstance: 'deleteStockTakeInstance/',
            insertStockTake: 'insertStockTake/',

        routeUrl: 'route/',
            getAllRoutes: 'getAllRoutes/',

        productionUrl: 'production/',
            getBatchesIfExistElseInsert: 'getBatchesIfExistElseCreate/',

        productsUrl: 'products/',
            insertOrUpdateItem: 'productModule/insertOrUpdateItem/',

        accountsUrl: 'accounts/',
            insertOrUpdateAccount: 'insertOrUpdateAccount/',
            deleteAccount: 'deleteAccount/'
};
