import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';

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
    orderTotalAmount: number;
    orders: IProductOrderDetails[];
}

// Backend interface
export class IOrderDBDetails extends IAccountDetails {
    id: number;
    orderDate: string;
    timeStampid: number;
    userid: number;
    orderNumber: string;
    dateCreated: string;
    delivered: boolean;
    lastModified: string;

}

// This is the factory that changes the return from our backend interface to our frontend interface
export function ff_CreateOrderDetailsObjFromDBObj(obj: IOrderDBDetails): IOrderDetails {
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
        productGroupid: null,
        orderTotalAmount: null
    };
    return order;
}

// This is the factory that changes the object from our frontend interface to our backend interface
export function ff_createOrderDetailsObjectForDB(obj: IOrderDetails): IOrderDBDetails {
    const order: IOrderDBDetails = {
        id: obj.orderid,
        accountMRid: obj.accountMRid,
        accountName: null,
        accountid: obj.accountid,
        commonName: obj.commonName,
        franchiseid: null,
        routeName: null,
        routeid: obj.routeid,
        timeStampid: obj.timeStampid,
        dateCreated: obj.dateCreated,
        delivered: obj.delivered,
        lastModified: null,
        orderDate: obj.orderDate,
        orderNumber: obj.orderNumber,
        userid: obj.userid,
        productGroupid: null
    };
    return order;
}

export class IInserOrderErrors {
    error: string;
}
