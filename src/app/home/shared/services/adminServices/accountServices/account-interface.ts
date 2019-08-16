export class IAccountDetailsDepricated {
    accountid: number;
    accountID: string;
    accountMRid: string;
    accountName: string;
    commonName: string;
    parentAccountid: string;
    routeName: string;
    routeid: number;
}

export class IAccountDBDetailsDepricated {
    accountsid: number;
    accountID: string;
    accountMRid: string;
    accountName: string;
    commonName: string;
    parentAccountid: string;
    routeName: string;
    routeid: number;

    constructor(obj: IAccountDetailsDepricated) {
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

export function createAccount(obj: IAccountDetailsDepricated): IAccountDBDetailsDepricated {
    return new IAccountDBDetailsDepricated(obj);
}
