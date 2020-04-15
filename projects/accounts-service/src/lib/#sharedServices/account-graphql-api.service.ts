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

    getSingleAccountData(accountMRid): Observable<IAccountFrontend> {
        return this.apollo
            .watchQuery<any>({
                // context: { headers: headers},
                variables: {accountMRid: accountMRid},
                query: this.GET_SINGLE_ACCOUNT_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateSingleAccountData(result.data['nodeAccountNameMicroService'].edges)));
    }

    private consolidateSingleAccountData(data): IAccountFrontend {

        console.log('Returned accounts: ', data);

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
            const account: IAccountFrontend = {
                accountid: data[0].node.rowid,
                accountMRid: data[0].node.accountMRid,
                accountName: data[0].node.accountName,
                commonName: data[0].node.commonName,
                parentAccountid: getParentAccountid(data[0].node.parentAccountid),
                parentAccountMRid: getParentAccountMRid(data[0].node.parentAccountid),
                routeid: data[0].node.routeid.rowid,
                routeName: data[0].node.routeid.routeName,
                productGroupid: data[0].node.productGroupid.rowid,
                productGroupName: data[0].node.productGroupid.groupname,
                accountAccessDBid: data[0].node.accountAccessDBid,
                franchiseid: data[0].node.franchise.rowid,
                franchiseName: data[0].node.franchise.franchiseName,
                franchiseRanking: null,
                rankingInFranchise: null,
                accountID: null,
            };
            return account;
        }
    }


}
