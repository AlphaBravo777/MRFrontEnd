class IBrandBackend {
    id: string;
    brand: string;
}

class IUnitWeightBackend {
    id: string;
    unitAmount: number;
    measuringUnit: string;
}

class IPackagingBackend {
    id: string;
    rowid: number;
    packagingType: string;
}

class IProductBackend {
    id: string;
    rowid: number;
    proddescription: string;
    productonhold: boolean;
    batchranking: number;
    rankingInGroup: number;
    brand: IBrandBackend;
    unitweight: IUnitWeightBackend;
    packaging: IPackagingBackend;
}

class IOrderProductAmountsBackend {
    id: string;
    rowid: number;
    productMRid: string;
    amount: number;
    status: boolean;
    lastModified: string;
    userid: number;
    packageWeight: number;
    productid: IProductBackend;
}

class IOrderproductamountsmicroserviceSetNode {
    node: IOrderProductAmountsBackend;
}

export class IOrderproductamountsmicroserviceSet {
    edges: IOrderproductamountsmicroserviceSetNode[];
}

class IOrderBackend {
    rowid: number;
    id: string;
    accountid: number;
    accountMRid: string;
    commonName: string;
    orderdate: string;
    dateCreated: string;
    lastModified: string;
    userid: number;
    routeid: number;
    delivered: boolean;
    orderNumber: string;
    timeStampid: number;
    orderTotalAmount: number;
    orderproductamountsmicroserviceSet: IOrderproductamountsmicroserviceSet;

}

class INodeOrderDetailsMicroServiceNode {
    node: IOrderBackend;
}

export class INodeOrderDetailsMicroService {
    edges: INodeOrderDetailsMicroServiceNode[];
}
