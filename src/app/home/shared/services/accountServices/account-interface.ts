import { IProductGroupName } from '../productServices/products-interface';

export class IAccountDetails {
    accountid: number;
    accountID?: string;
    accountMRid: string;
    accountName: string;
    commonName: string;
    parentAccountid?: number;
    childAccount?: IAccountDetails[];
    // productListToPickFrom?: IProductDetails[];
    routeName: string;
    routeid: number;
    productGroupid: IProductGroupName;
    franchiseid: number;
    franchiseName?: string;
    franchiseRanking: number;
    rankingInFranchise: number;
}


// export class IAccountDetails implements IAccountDetailsInterface {
//     accountid: number;
//     accountID: string;
//     accountMRid: string;
//     accountName: string;
//     commonName: string;
//     orderNumber: string;
//     parentAccountid: number;
//     routeName: string;
//     routeid: number;
// }
