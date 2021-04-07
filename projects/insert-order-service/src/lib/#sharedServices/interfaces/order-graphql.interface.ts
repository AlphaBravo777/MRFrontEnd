import { IItemType } from 'projects/product-service/src/public-api'
import { ITimeStampType } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-graphql.interface'
import { IDeliveryRoutesType } from 'src/app/home/shared/services/routesServices/routes-interface'


// ===============================================================================================================================================
//                                                              orderDetails
// ===============================================================================================================================================

export class IOrderDetailsMicroServiceType {
    id: string
    accountid: number
    accountMRid: string
    commonName: string
    orderDate: string
    timeStampid: number
    dateCreated: string
    lastModified: string
    userid: number
    routeid: number
    delivered: boolean
    orderNumber: string
    orderproductamountsmicroserviceSet: IOrderProductAmountsMicroServiceTypeEdges
    rowid: number
    orderTotalAmount: number
    routeNode: IDeliveryRoutesType
}

export class IOrderDetailsMicroServiceTypeNodes {
    node: IOrderDetailsMicroServiceType
}

export class IOrderDetailsMicroServiceTypeEdges {
    edges: IOrderDetailsMicroServiceTypeNodes[]
}

export class IOrderDetailsMicroServiceTypeConnection {
    nodeOrderDetailsMicroService: IOrderDetailsMicroServiceTypeEdges
}

// ===============================================================================================================================================
//                                                              orderProductAmounts
// ===============================================================================================================================================

export class IOrderProductAmountsMicroServiceType {
    id: string
    orderDetailsid: IOrderDetailsMicroServiceType
    productid: number
    productMRid: string
    amount: number
    status: boolean
    lastModified: string
    userid: number
    packageWeight: number
    rowid: number
    productNode: IItemType
}

export class IOrderProductAmountsMicroServiceTypeNodes {
    node: IOrderProductAmountsMicroServiceType
}

export class IOrderProductAmountsMicroServiceTypeEdges {
    edges: IOrderProductAmountsMicroServiceTypeNodes[]
}

export class IOrderProductAmountsMicroServiceTypeConnection {
    thisShouldBeChanged: IOrderProductAmountsMicroServiceTypeEdges
}

// ===============================================================================================================================================
//                                                              weeklyOrdersCache
// ===============================================================================================================================================

export class IWeeklyOrdersCacheType {
    id: string
    timeStampid: ITimeStampType
    productid: number
    productTotalAmount: number
    weekNum: number
    rowid: number
    productNode: IItemType
}

export class IWeeklyOrdersCacheTypeNodes {
    node: IWeeklyOrdersCacheType
}

export class IWeeklyOrdersCacheTypeEdges {
    edges: IWeeklyOrdersCacheTypeNodes[]
}

export class IWeeklyOrdersCacheTypeConnection {
    nodeWeeklyOrdersMicroService: IWeeklyOrdersCacheTypeEdges
}
