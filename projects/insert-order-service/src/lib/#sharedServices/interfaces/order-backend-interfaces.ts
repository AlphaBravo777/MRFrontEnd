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
    packagingWeight: number;
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
    packagingShipping: IPackagingBackend;
    unitsPerMaxShippingWeight: number;
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

export class IOrderproductamountsmicroserviceSetNode {
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

export function getDefaultINodeOrderDetailsMicroService(): INodeOrderDetailsMicroService {
    const brandBackend: IBrandBackend = {
        id: null,
        brand: null
    };
    const unitWeightBackend: IUnitWeightBackend = {
        id: null,
        unitAmount: null,
        measuringUnit: null
    };
    const packingBackend: IPackagingBackend = {
        id: null,
        packagingType: null,
        packagingWeight: null,
        rowid: null
    };
    const productBackend: IProductBackend = {
        id: null,
        batchranking: null,
        brand: brandBackend,
        packaging: packingBackend,
        packagingShipping: packingBackend,
        proddescription: null,
        productonhold: null,
        rankingInGroup: null,
        rowid: null,
        unitweight: unitWeightBackend,
        unitsPerMaxShippingWeight: null
    };
    const orderProductAmountsBackend: IOrderProductAmountsBackend = {
        id: null,
        amount: null,
        lastModified: null,
        packageWeight: null,
        productMRid: null,
        productid: productBackend,
        rowid: null,
        status: null,
        userid: null
    };
    const orderproductamountsmicroserviceSetNode: IOrderproductamountsmicroserviceSetNode[] = [
        {node: orderProductAmountsBackend}
    ];
    const orderproductamountsmicroserviceSet: IOrderproductamountsmicroserviceSet = {
        edges: orderproductamountsmicroserviceSetNode
    };
    const orderBackend: IOrderBackend = {
        id: null,
        accountMRid: null,
        accountid: null,
        commonName: null,
        dateCreated: null,
        delivered: null,
        lastModified: null,
        orderNumber: null,
        orderTotalAmount: null,
        orderdate: null,
        orderproductamountsmicroserviceSet: orderproductamountsmicroserviceSet,
        routeid: null,
        rowid: null,
        timeStampid: null,
        userid: null
    };
    const nodeOrderDetailsMicroServiceNode: INodeOrderDetailsMicroServiceNode[] = [
        {node: orderBackend}
    ];
    const defaultValue: INodeOrderDetailsMicroService = {
        edges: nodeOrderDetailsMicroServiceNode
    };
    return defaultValue;
}
