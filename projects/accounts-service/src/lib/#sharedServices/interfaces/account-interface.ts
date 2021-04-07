import { IProductGroupName } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';

export class IAccountFrontendBasicID {
    accountid: number;
    accountMRid: string;
}

export class IAccountFrontend extends IAccountFrontendBasicID {

    accountID: string;
    accountName: string;
    commonName: string;
    parentAccountid: number;
    parentAccountMRid: string;
    routeid: number;
    routeName: string;
    productGroupid: number;
    productGroupName: string;
    accountAccessDBid: number;
    franchiseid: number;
    franchiseName?: string;
    franchiseRanking: number;
    rankingInFranchise: number;

}

export class IAccountBackend {

    id: number;
    accountMRid: string;
    accountName: string;
    commonName: string;
    parentAccountid: number;
    routeid: number;
    productGroupid: number;
    accountAccessDBid: number;
    franchise: number;

}


export class IAccountDetails {
    accountid: number;
    accountID?: string;
    accountMRid: string;
    accountName: string;
    commonName: string;
    parentAccountid?: number;
    childAccount?: IAccountDetails[];
    routeName: string;
    routeid: number;
    productGroupid: IProductGroupName;
    franchiseid: number;
    franchiseName?: string;
    franchiseRanking: number;
    rankingInFranchise: number;
}