class IBrandBackend {
    brand: string;
}

class IUnitWeightBackend {
    unitAmount: number;
    measuringUnit: string;
}

class IPackagingBackend {
    rowid: number;
    packagingType: string;
}

class IProductBackend {
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
    orderproductamountsmicroserviceSet: IOrderproductamountsmicroserviceSet;

}

class INodeOrderDetailsMicroServiceNode {
    node: IOrderBackend;
}

export class INodeOrderDetailsMicroService {
    edges: INodeOrderDetailsMicroServiceNode[];
}
