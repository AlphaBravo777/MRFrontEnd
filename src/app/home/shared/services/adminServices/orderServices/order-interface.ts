import {
    IAccountDetails,
    IAccountDBDetails
} from '../accountServices/account-interface';
import { IProductOrderDetails } from '../../stockServices/product-interface';

// export class IOrderDetails extends IAccountDetails {
//     orderDate: string;
//     timeStampid: number;
//     userid: number;
//     orders: IProductOrderDetails[];
// }

// export class IOrderDBDetails extends IAccountDBDetails {
//     orderDate: string;
//     timeStampid: number;
//     userid: number;
//     orders: IProductOrderDetails[];

//     constructor(obj: IOrderDetails) {
//         super(obj);
//         this.accountsid = obj.accountid;
//         this.accountID = obj.accountID;
//         this.accountMRid = obj.accountMRid;
//         this.accountName = obj.accountName;
//         this.commonName = obj.commonName;
//         this.parentAccountid = obj.parentAccountid;
//         this.routeName = obj.routeName;
//         this.routeid = obj.routeid;
//         this.orderDate = obj.orderDate;
//         this.timeStampid = obj.timeStampid;
//         this.userid = obj.userid;
//         this.orders = obj.orders;
//     }
// }

// export function factoryFunctionDBLayerCreateNewOrder(obj: IOrderDetails): IOrderDBDetails {
//     return new IOrderDBDetails(obj);
// }
