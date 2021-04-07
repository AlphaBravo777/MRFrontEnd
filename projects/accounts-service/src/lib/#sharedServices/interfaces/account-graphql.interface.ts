import { IGroupType } from 'projects/product-service/src/public-api'
import { IDeliveryRoutesType } from 'src/app/home/shared/services/routesServices/routes-interface'

// ===============================================================================================================================================
//                                                              accountNameQuery
// ===============================================================================================================================================

export class IAccountNameMicroServiceQuery {
    getAccountMicroService : IAccountNameMicroServiceType
}

// ===============================================================================================================================================
//                                                              accountName
// ===============================================================================================================================================


export class IAccountNameMicroServiceType {
    id: string
    accountMRid: string
    accountName: string
    commonName: string
    parentAccountid: IAccountNameMicroServiceType
    routeid: IDeliveryRoutesType
    productGroupid: number
    accountAccessDBid: number
    franchise: IFranchiseMicroServiceType
    accountnameSet: IAccountNameMicroServiceTypeConnection
    rowid: number
    productGroupNode: IGroupType  // This might need to change to groupingType
}

export class IAccountNameMicroServiceTypeNodes {
    node: IAccountNameMicroServiceType
}

export class IAccountNameMicroServiceTypeEdges {
    edges: IAccountNameMicroServiceTypeNodes[]
}

export class IAccountNameMicroServiceTypeConnection {
    nodeAccountNameMicroService: IAccountNameMicroServiceTypeEdges
}

// ===============================================================================================================================================
//                                                              franshice
// ===============================================================================================================================================

export class IFranchiseMicroServiceType {
    id: string
    franchiseName: string
    accountnameSet: IAccountNameMicroServiceTypeConnection
    rowid: number
}

export class IFranchiseMicroServiceTypeNodes {
    node: IFranchiseMicroServiceType
}

export class IFranchiseMicroServiceTypeEdges {
    edges: IFranchiseMicroServiceTypeNodes[]
}

export class IFranchiseMicroServiceTypeConnection {
    nodeFranchiseMicroService: IFranchiseMicroServiceTypeEdges
}