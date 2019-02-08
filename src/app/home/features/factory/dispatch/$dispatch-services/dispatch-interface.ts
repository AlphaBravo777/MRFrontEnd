// this interface file may have to be moved higher up later, if more modules are going to use these interfaces

// export class IDispatchStockDataMain {  // Used
//     meatriteStock: IStockSingleProduct[];
//     route: IBasicRoute;
// }

export class IBasicRoute {  // Used - Simplified routes data (Just to get all daily routes)
    routeid: number;
    routeID: string;
    routeName: string;
    timestampid: number;
    timestampID: string;
    // trucks?: ISingleTruckOrder[];
}

export class IRouteWithTrucks extends IBasicRoute {
    trucks: ISingleTruckOrder[];
}

export class IBatchAmounts {
    batchNumber: string;
    amount: number;
    cleared: boolean;
}

// There are a lot of interfaces in the file that are no longer used anymore...

export class IStockSingleProduct {
    productid: number;
    productName: string;
    amount: number;
    batchAmounts?: IBatchAmounts[];
    loadingStatus: boolean;
    amountLoaded: number;
}

export class ISingleTruckOrder {  // Used
    // routeid: number;  // Not necesarry for data, but will need to have field in database
    // routeID: string;  //Not necesarry for data, but will need to have field in database
    truckid: number;
    truckID: string;
    truckNr: number;
    truckName: string;
    driver: string;
    departureTime: string;
    loadingStatus: boolean;
    totalProductOnTruck: IStockSingleProduct[];
    clients: IRouteClient[];
}

export class IRouteClient {
    invoiceNumber: number; // Use as number and just ad "In" in front of each number (for sorting purposes)
    clientName: string;
    clientid: number;
    deliveryRanking: number;
    loadingStatus: boolean;
    orders: IStockSingleProduct[];
}

export class IDBStockSingleProduct {  // For database only?
    productid: number;  // Showing to products foreign key
    dateChanged: Date;
    amount: number;
    userId: number; // Foreign key to users
    stockDifferenceTolerance: number;
    defaultClearanceValue: boolean;
}

export class IDBStockBatchCode {  // For database only?
    productid: number; // Foreign key showing to SingleStockProducts
    batchNumber: string;
    amount: number;
    packingDay: Date;
    userId: number;
    productCleared: boolean;

}

export class IDispatchStockSideBySide {
    stockOnHand: IStockSingleProduct;
    stockRequired: IStockSingleProduct;
}



