import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';

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
export interface IAccountDetailsInterface {
    accountid: number;
    accountID: string;
    accountMRid: string;
    accountName: string;
    commonName: string;
    // orderNumber: string;
    parentAccountid: number;
    routeName: string;
    routeid: number;
}

//  Frontend Interface
export class IOrderDetails extends IAccountDetails {
    orderid: number;
    orderDate?: string;
    orderNumber: string;
    deliveryDate?: string;
    delivered?: boolean;
    timeStampid: number;
    userid: number;
    dateCreated?: string;
    lastModified?: string;
    orders: IProductOrderDetails[];
}

// Backend interface
export class IOrderDetailsComingFromDB {
    id: number;
    accountMRid: string;
    accountid: number;
    commonName: string;
    dateCreated: string;
    delivered: boolean;
    lastModified: string;
    orderDate: string;
    orderNumber: string;
    routeid: number;
    timeStampid: number;
    userid: number;
}

// This is the factory that changes the return from our backend interface to our frontend interface
export function ff_CreateOrderDetailsObjFromDBObj(obj: IOrderDetailsComingFromDB): IOrderDetails {
    const order: IOrderDetails = {
        orderid: obj.id,
        accountMRid: obj.accountMRid,
        accountName: null,
        accountid: obj.accountid,
        commonName: obj.commonName,
        franchiseid: null,
        orders: null,
        routeName: null,
        routeid: obj.routeid,
        timeStampid: obj.timeStampid,
        dateCreated: obj.dateCreated,
        delivered: obj.delivered,
        lastModified: obj.lastModified,
        orderDate: obj.orderDate,
        orderNumber: obj.orderNumber,
        userid: obj.userid,
        productGroupid: null
    };
    return order;
}

export class IOrderDBDetails extends IAccountDetails {
    id: number;
    orderDate: string;
    timeStampid: number;
    userid: number;
    orderNumber: string;

    constructor(obj: IOrderDetails) {
        super();
        this.id = obj.orderid;
        this.accountid = obj.accountid;
        this.accountMRid = obj.accountMRid;
        this.commonName = obj.commonName;
        this.routeid = obj.routeid;
        this.orderDate = obj.orderDate;
        this.timeStampid = obj.timeStampid;
        this.userid = obj.userid;
        this.orderNumber = obj.orderNumber;
    }
}

export function ff_createOrderDetailsObjectForDB(obj: IOrderDetails): IOrderDBDetails {
    return new IOrderDBDetails(obj);
}

export class IInserOrderErrors {
    error: string;
}
