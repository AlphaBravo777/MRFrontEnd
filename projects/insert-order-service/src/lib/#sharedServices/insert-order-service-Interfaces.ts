export class IPnPCSVFormat {
    'BARCODE NUMBER'?: string;
    'COST PRICE (Incl VAT)'?: string;
    CURRENCY?: string;
    'DELIVERY DATE'?: string;
    DESCRIPTION?: string;
    'MSG ID'?: string;
    'ORDER DATE'?: string;
    'PACK SIZE'?: string;
    'PO NUMBER'?: string;
    QTY?: string;
    'STORE CODE'?: string;
    'STORE DESCRIPTION'?: string;
    'VENDOR CODE'?: string;
    'VENDOR PRODUCT CODE'?: string;
}

export class IPnPCSVData {
    barcodeNumber: number;
    costPriceIncludingVAT: number;
    currency: string;
    deliveryDate: string;
    description: string;
    msgid: number;
    orderDate: string;
    packSize: number;
    PONumber: number;
    POType: string;
    quantity: number;
    storeCode: string;
    storeDescription: string;
    vendorCode: string;
    vendorProductCode: string;
}

// This should be refractored out later to accountService
export class IAccountDetails {
    accountid: number;
    accountID: string;
    accountMRid: string;
    accountName: string;
    commonName: string;
    orderNumber: string;
    parentAccountid: number;
    routeName: string;
    routeid: number;
}

// This should be refractored out later to productService
export class IProductDetails {
    productMRid: string;
    productid: number;
    packageWeight: number;
    rankingInGroup: number;
    proddescription?: string;
    productonhold?: boolean;
    batchRanking?: number;
    packaging?: number;
    brand?: number;
    unitWeight?: number;
    lugSize: number;
}

export class IProductOrderDetails extends IProductDetails {
    amount: number;
    orderDetailsid: number;
    userid: number;
}

export class IOrderDetails extends IAccountDetails {
    orderDate?: string;
    deliveryDate?: string;
    timeStampid: number;
    userid: number;
    orders: IProductOrderDetails[];
}

export class IAccountDBDetails {
    accountsid: number;
    accountID: string;
    accountMRid: string;
    accountName: string;
    commonName: string;
    parentAccountid: number;
    routeName: string;
    routeid: number;
    orderNumber: string;

    constructor(obj: IAccountDetails) {
        this.accountsid = obj.accountid;
        this.accountID = obj.accountID;
        this.accountMRid = obj.accountMRid;
        this.accountName = obj.accountName;
        this.commonName = obj.commonName;
        this.parentAccountid = obj.parentAccountid;
        this.routeName = obj.routeName;
        this.routeid = obj.routeid;
        this.orderNumber = obj.orderNumber;
    }
}

export function createAccount(obj: IAccountDetails): IAccountDBDetails {
    return new IAccountDBDetails(obj);
}

export class IOrderDBDetails extends IAccountDBDetails {
    orderDate: string;
    timeStampid: number;
    userid: number;
    orders: IProductOrderDetails[];

    constructor(obj: IOrderDetails) {
        super(obj);
        this.accountsid = obj.accountid;
        this.accountID = obj.accountID;
        this.accountMRid = obj.accountMRid;
        this.accountName = obj.accountName;
        this.commonName = obj.commonName;
        this.parentAccountid = obj.parentAccountid;
        this.routeName = obj.routeName;
        this.routeid = obj.routeid;
        this.orderDate = obj.orderDate;
        this.timeStampid = obj.timeStampid;
        this.userid = obj.userid;
        this.orders = obj.orders;
        this.orderNumber = obj.orderNumber;
    }
}

export function factoryFunctionDBLayerCreateNewOrder(obj: IOrderDetails): IOrderDBDetails {
    return new IOrderDBDetails(obj);
}
