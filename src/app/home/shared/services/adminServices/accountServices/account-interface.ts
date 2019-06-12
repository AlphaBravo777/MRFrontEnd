import { IProductOrderDetails } from '../../stockServices/product-interface';

export class IAccountDetails {
    accountid: number;
    accountID: string;
    accountMRid: string;
    accountName: string;
    commonName: string;
    parentAccountid: string;
    routeName: string;
    routeid: number;
}



export class IAccountDBDetails {
    accountsid: number;
    accountID: string;
    accountMRid: string;
    accountName: string;
    commonName: string;
    parentAccountid: string;
    routeName: string;
    routeid: number;

    constructor(obj: IAccountDetails) {
        this.accountsid = obj.accountid;
        this.accountID = obj.accountID;
        this.accountMRid = obj.accountMRid;
        this.accountName = obj.accountName;
        this.commonName = obj.commonName;
        this.parentAccountid = obj.parentAccountid;
        this.routeName = obj.routeName;
        this.routeid = obj.routeid;
    }
}

export function createAccount(obj: IAccountDetails): IAccountDBDetails {
    return new IAccountDBDetails(obj);
}
