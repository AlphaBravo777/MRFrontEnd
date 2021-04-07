import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFranchise } from './interfaces/franchise-interface';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { IAccountFrontendBasicID, IAccountFrontend, IAccountDetails } from './interfaces/account-interface';
import { AccountGraphqlApiStringService } from './account-graphql-api-string.service';
import { IProductGroupName } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';
import { IAccountNameMicroServiceTypeConnection, IAccountNameMicroServiceTypeNodes, IAccountNameMicroServiceType, IAccountNameMicroServiceQuery, IFranchiseMicroServiceTypeConnection, IFranchiseMicroServiceTypeNodes } from './interfaces/account-graphql.interface';
import { IGroupType } from 'projects/product-service/src/public-api';

@Injectable({
    providedIn: 'root'
})
export class AccountGraphqlApiService {

    constructor(
        private apollo: Apollo,
        private toolBoxService: ToolboxGroupService,
        private accountGraphqlApiStringService: AccountGraphqlApiStringService) { }

    getAllFranchises(): Observable<IFranchise[]> {
        return this.apollo
            .watchQuery<IFranchiseMicroServiceTypeConnection>({
                query: this.accountGraphqlApiStringService.ALL_FRANCHISES_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateFranchises(result.data.nodeFranchiseMicroService.edges)));
    }

    private consolidateFranchises(data: IFranchiseMicroServiceTypeNodes[]): IFranchise[] {
        if (data.length > 0) {
            const franchisesArray: IFranchise[] = [];
            for (let fran = 0; fran < data.length; fran++) {
                const franchise: IFranchise = {
                    franchiseid: data[fran].node.rowid,
                    franchiseName: data[fran].node.franchiseName,
                };
                franchisesArray.push(franchise);
            }
            console.log('ALPHA (consolidateFranchises) = ', franchisesArray);
            return this.toolBoxService.sorting(franchisesArray, 'id');
        }
    }

    getAllAccountMRids(): Observable<IAccountFrontendBasicID[]> {
        return this.apollo
            .watchQuery<IAccountNameMicroServiceTypeConnection>({
                query: this.accountGraphqlApiStringService.ACCOUNT_MR_IDs_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateAccountMRids(result.data.nodeAccountNameMicroService.edges)));
    }

    private consolidateAccountMRids(data: IAccountNameMicroServiceTypeNodes[]): IAccountFrontendBasicID[] {

        if (data.length > 0) {
            const accountsArray: IAccountFrontendBasicID[] = [];
            for (let fran = 0; fran < data.length; fran++) {
                const franchise: IAccountFrontendBasicID = {
                    accountid: data[fran].node.rowid,
                    accountMRid: data[fran].node.accountMRid,
                };
                accountsArray.push(franchise);
            }
            console.log('ALPHA (consolidateAccountMRids) = ', accountsArray);
            return accountsArray;
        }
    }

    getAllAccountsContainingArgument(accountMRid): Observable<IAccountFrontend[]> {
        return this.apollo
            .watchQuery<IAccountNameMicroServiceTypeConnection>({
                // context: { headers: headers},
                variables: {accountMRid: accountMRid},
                query: this.accountGraphqlApiStringService.GET_SINGLE_ACCOUNT_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateAllAccountsContainingArgument(result.data.nodeAccountNameMicroService.edges)));
    }

    private consolidateAllAccountsContainingArgument(data: IAccountNameMicroServiceTypeNodes[]): IAccountFrontend[] {

        function getParentAccountid(parentData) {
            if (!parentData) {
                return null;
            }
            return parentData.rowid;
        }

        function getParentAccountMRid(parentData) {
            if (!parentData) {
                return null;
            }
            return parentData.accountMRid;
        }

        if (data.length > 0) {

            console.log('Returned accounts: ', data);
            const accountsArray: IAccountFrontend[] = [];

            for (let acc = 0; acc < data.length; acc++) {
                const account: IAccountFrontend = {
                    accountid: data[acc].node.rowid,
                    accountMRid: data[acc].node.accountMRid,
                    accountName: data[acc].node.accountName,
                    commonName: data[acc].node.commonName,
                    parentAccountid: getParentAccountid(data[acc].node.parentAccountid),
                    parentAccountMRid: getParentAccountMRid(data[acc].node.parentAccountid),
                    routeid: data[acc].node.routeid.rowid,
                    routeName: data[acc].node.routeid.routeName,
                    productGroupid: data[acc].node.productGroupNode.rowid,
                    productGroupName: data[acc].node.productGroupNode.groupName,
                    accountAccessDBid: data[acc].node.accountAccessDBid,
                    franchiseid: data[acc].node.franchise.rowid,
                    franchiseName: data[acc].node.franchise.franchiseName,
                    franchiseRanking: null,
                    rankingInFranchise: null,
                    accountID: null,
                };
                accountsArray.push(account);
            }
            return accountsArray;
        }
        return [];
    }

    searchAccountsOrCommonNames(accountMRid: string = '', commonName: string= ''): Observable<IAccountDetails[]> {
        console.log(accountMRid, commonName);
        return this.apollo
            .watchQuery<IAccountNameMicroServiceTypeConnection>({
                variables: { accountMRid: accountMRid, commonName: commonName },
                query: this.accountGraphqlApiStringService.SEARCH_ACCOUNTS_MRID_OR_COMMONNAMES_QUERY
            })
            .valueChanges.pipe(
                map(result => this.consolidateAccountsData(result.data.nodeAccountNameMicroService.edges)));
    }

    private consolidateAccountsData(data: IAccountNameMicroServiceTypeNodes[]): IAccountDetails[] {

        const flattendData: IAccountDetails[] = [];

        for (let array = 0; array < data.length; ++array) {
            const element = data[array].node

            flattendData.push(this.createAccountData(element));
        }
        return flattendData;
    }

    getAccountByAccountid(accountid: number): Observable<IAccountDetails> {
        return this.apollo
            .watchQuery<IAccountNameMicroServiceQuery>({
                variables: { accountid: accountid },
                query: this.accountGraphqlApiStringService.SEARCH_ACCOUNTIDS_QUERY
            })
            .valueChanges.pipe(
                map(result => this.createAccountData(result.data.getAccountMicroService)));
    }

    
    private createAccountData(account: IAccountNameMicroServiceType): IAccountDetails {

        const createGroup = (group: IGroupType): IProductGroupName => {
            const singleGroup: IProductGroupName = {
                id: group.rowid,
                ID: group.id,
                groupName: group.groupName
            };
            return singleGroup
        }

        const singleAccount: IAccountDetails = {
            accountid: account.rowid,
            accountID: account.id,
            accountMRid: account.accountMRid,
            accountName: account.accountName,
            commonName: account.commonName,
            routeid: account.routeid.rowid,
            routeName: account.routeid.routeName,
            franchiseid: account.franchise.rowid,
            franchiseName: account.franchise.franchiseName,
            productGroupid: createGroup(account.productGroupNode),
            childAccount: [],
            parentAccountid: null,
            franchiseRanking: null,
            rankingInFranchise: null
        };
        return singleAccount
    }

}
