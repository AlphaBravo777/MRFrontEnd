export class IProductDetails {
    productMRid: string;
    productid: number;
    packageWeight: number;
    packagingShippingWeight: number;
    unitsPerMaxShippingWeight: number;
    rankingInGroup: number;
    proddescription?: string;
    productonhold?: boolean;
    batchRanking?: number;
    packaging?: number;
    brand?: number;
    unitWeight?: number;
    lugSize: number;
}

export class IProductGroupName {
    id: number;
    ID: string;
    groupName: string;
}

export class IProductOrderDetails extends IProductDetails {
    amountid?: number;
    amount: number;
    orderDetailsid: number;
    userid: number;
    status?: boolean;
    lastModified?: string;
}

export class IProductOrderDBDetails extends IProductDetails {
    id?: number;
    amount: number;
    orderDetailsid: number;
    userid: number;
    status?: boolean;
    lastModified?: string;

    constructor(obj: IProductOrderDetails) {
        super();
        this.id = obj.amountid;
        this.productid = obj.productid;
        this.amount = obj.amount;
        this.status = obj.status;
        this.lastModified = obj.lastModified;
        this.orderDetailsid = obj.orderDetailsid;
        this.productMRid = obj.productMRid;
        this.userid = obj.userid;
        this.packageWeight = obj.packageWeight;
    }
}

export function ff_createProductDetailsObjectForDB(obj: IProductOrderDetails): IProductOrderDBDetails {
    return new IProductOrderDBDetails(obj);
}

export class IUniqueProductsDetails {
    uniqueProducts: Set<Object>;
    productRowValues: Set<number>;
    productUnitWeight: Set<Object>;
    productTotalAmounts: Set<Object>;
    productTotalWeights: Set<Object>;
    productTotalWeightsWithCrates: Set<Object>;
}
