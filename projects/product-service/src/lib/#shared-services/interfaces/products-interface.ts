export class IProductDetails {
    productMRid: string;
    productid: number;
    packageWeight: number;
    packagingShippingWeight: number;
    unitsPerMaxShippingWeight: number;
    rankingInGroup: number;
    proddescription?: string;
    productActive: boolean;
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

export class IUniqueProductTotals {
    productMRid: string;
    rowNumber: number;
    unitWeight: number;
    totalAmount: number;
    totalWeight: number;
    totalWeightWithCrates: number;
}

