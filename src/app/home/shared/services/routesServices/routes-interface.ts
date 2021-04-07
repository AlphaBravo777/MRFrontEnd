export class IRoute {
    routeName: string;
    routeid: number;
}



// ===============================================================================================================================================
//                                                              deliveryRoutes
// ===============================================================================================================================================

export class IDeliveryRoutesType {
    id: string
    routeName: string
    loadingDay: [] // IDaysOfTheWeekType!
    rowid: number
}

export class IDeliveryRoutesTypeNodes {
    node: IDeliveryRoutesType
}

export class IDeliveryRoutesTypeEdges {
    edges: IDeliveryRoutesTypeNodes[]
}

export class IDeliveryRoutesTypeConnection {
    nodeDeliveryroutes: IDeliveryRoutesTypeEdges
}