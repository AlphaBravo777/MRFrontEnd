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
