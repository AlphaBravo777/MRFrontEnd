// this interface file may have to be moved higher up later, if more modules are going to use these interfaces

export class IDispatchStockDataMain {
    meatriteStock: IStockSingleProduct[];
    routeData: ITestRouteOrder;
}

export class IRouteTemplateData {
    showLoadTruckTemplate: boolean;
    meatriteStock: IStockSingleProduct[];
    routeName: string;
    prodductTotal: IStockSingleProduct[];
    clients?: IRouteOrderClient[];
    totalTrucks: number;
}

export class IBatchAmounts {
    batchNumber: string;
    amount: number;
    cleared: boolean;
}

export class IStockSingleProduct {
    productid: number;
    productName: string;
    amount: number;
    batchAmounts?: IBatchAmounts[];
    loadingStatus: boolean;
    amountLoaded: number;
}

export class IRouteOrder {
    routeName: string;
    routeid: number;
    routeID: string;
    orderid: number;
    orderID: string;
    truckNr: number;
    truckName: string;
    // driver: string;
    // departureTime: string;
    // invoice# : number; Use as number and just ad "In" in front of each number (for sorting purposes)
    timestampID: string;
    timestampid: number;
    clients: IRouteOrderClient[];
    productTotals: IStockSingleProduct[];
}

export class IRouteOrderClient {
    clientName: string;
    clientid: number;
    deliveryRanking: number;
    loadingStatus: boolean;
    orders: IStockSingleProduct[];
}

// export class IClientOrderProducts {
//     productid: number;
//     productName: string;
//     amount: number;
// }

export class IDBStockSingleProduct {
    productid: number;  // Showing to products foreign key
    dateChanged: Date;
    amount: number;
    userId: number; // Foreign key to users
    stockDifferenceTolerance: number;
    defaultClearanceValue: boolean;
}

export class IDBStockBatchCode {
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

export class IRouteID {
    routeid: number;
    routeID: string;
    routeName: string;
}

export class IRouteIDWithTruckID extends IRouteID {
    truckNr: number;
    orderid: number;
    orderID: string;
}

export class IDailyRoutes extends IRouteID {
    numberOfTrucks: IRouteIDWithTruckID[];
}

export class ITestTruck {
    truckName: string;
    // truckid: number;
    // truckID: string;
    truckNumber: number;
    orderid: number;
    orderID: string;
    loadingStatus: boolean;
    clients: IRouteOrderClient[];
    totalProductOnTruck: IStockSingleProduct[];
}

export class ITestRouteOrder {
    routeName: string;
    routeid: number;
    routeID: string;
    timestampid: number;
    timestampID: string;
    totalProductOnAllTrucks?: IStockSingleProduct[];
    loadingStatus: boolean;
    trucks: ITestTruck[];
}
