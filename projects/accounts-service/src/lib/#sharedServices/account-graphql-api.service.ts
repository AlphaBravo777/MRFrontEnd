import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFranchise } from './interfaces/franchise-interface';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { IAccountFrontendBasicID, IAccountFrontend } from './interfaces/account-interface';

@Injectable({
    providedIn: 'root'
})
export class AccountGraphqlApiService {

    ALL_FRANCHISES_QUERY = gql`
    query Franchises{
        nodeFranchiseMicroService{
            edges{
                node{
                    franchiseName
                    rowid
                    }
                }
            }
        }
    `;

    ACCOUNT_MR_IDs_QUERY = gql`
    query AccountMRids {
        nodeAccountNameMicroService{
          edges{
            node{
              rowid
              accountMRid
            }
          }
        }
      }
      `;

    GET_SINGLE_ACCOUNT_QUERY = gql`
    query SingleAccountDetail ($accountMRid:String="S57"){
        nodeAccountNameMicroService(accountMRid:$accountMRid){
            edges{
                node{
                    rowid
                    accountMRid
                    commonName
                    accountName
                    parentAccountid{
                        accountMRid
                        rowid
                    }
                    routeid {
                        routeName
                        rowid
                    }
                    productGroupid{
                        groupname
                        rowid
                    }
                    accountAccessDBid
                    franchise{
                        franchiseName
                        rowid
                    }
                }
            }
        }
    }
    `;

    constructor(private apollo: Apollo, private toolBoxService: ToolboxGroupService) { }

    getAllFranchises(): Observable<IFranchise[]> {
        return this.apollo
            .watchQuery<any>({
                // context: { headers: headers},
                // variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: this.ALL_FRANCHISES_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateFranchises(result.data['nodeFranchiseMicroService'].edges)));
    }

    private consolidateFranchises(data): IFranchise[] {
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
            .watchQuery<any>({
                // context: { headers: headers},
                // variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: this.ACCOUNT_MR_IDs_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateAccountMRids(result.data['nodeAccountNameMicroService'].edges)));
    }

    private consolidateAccountMRids(data): IAccountFrontendBasicID[] {

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
            .watchQuery<any>({
                // context: { headers: headers},
                variables: {accountMRid: accountMRid},
                query: this.GET_SINGLE_ACCOUNT_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateAllAccountsContainingArgument(result.data['nodeAccountNameMicroService'].edges)));
    }

    private consolidateAllAccountsContainingArgument(data): IAccountFrontend[] {

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
                    productGroupid: data[acc].node.productGroupid.rowid,
                    productGroupName: data[acc].node.productGroupid.groupname,
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


}
