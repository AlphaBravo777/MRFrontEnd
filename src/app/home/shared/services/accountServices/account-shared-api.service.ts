import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { IAccountDetails } from './account-interface';
import { map, take } from 'rxjs/operators';
import { IProductGroupName } from '../productServices/products-interface';

@Injectable({
    providedIn: 'root'
})

export class AccountSharedApiService {

    public SEARCH_ACCOUNTS_MRID_OR_COMMONNAMES_QUERY = gql`
        query searchAccountCommonNames2($commonName:String, $accountMRid:String){
            nodeAccountNameMicroService(commonName_Icontains:$commonName, accountMRid_Icontains:$accountMRid){
                edges{
                    node{
                        rowid
                        id
                        accountMRid
                        commonName
                        accountName
                        franchise{
                            rowid
                            id
                            franchiseName
                        }
                        productGroupNode{
                            rowid
                            id
                            groupname
                        }
                        routeid{
                            rowid
                            id
                            routeName
                        }
                    }
                }
            }
        }
    `;

    public SEARCH_ACCOUNTIDS_QUERY = gql`
    query getAccountidDetails($accountid:Int){
        getAccountMicroService(id:$accountid){
            rowid
            id
            accountMRid
            commonName
            accountName
            franchise{
                rowid
                id
                franchiseName
            }
            productGroupNode{
                rowid
                id
                groupname
            }
            routeid{
                rowid
                id
                routeName
            }
        }
    }`;

    constructor(private apollo: Apollo) {}

    searchAccountsOrCommonNames(accountMRid: string = '', commonName: string= ''): Observable<IAccountDetails[]> {
        console.log(accountMRid, commonName);
        return this.apollo
            .watchQuery({
                variables: { accountMRid: accountMRid, commonName: commonName },
                query: this.SEARCH_ACCOUNTS_MRID_OR_COMMONNAMES_QUERY
            })
            .valueChanges.pipe(
                map(result => this.consolidateAccountsData(result.data['nodeAccountNameMicroService'].edges)));
    }

    private consolidateAccountsData(data): IAccountDetails[] {
        // console.log('Here is the account data: ', data);
        const flattendData: IAccountDetails[] = [];
        for (let array = 0; array < data.length; ++array) {
            flattendData.push(this.singleAccountObject(data[array].node));
        }
        // console.log('Charlie(b) ', flattendData);
        return flattendData;
    }

    private singleAccountObject(account): IAccountDetails {
        console.log('Here is the account data: ', account);
        const singleGroup: IProductGroupName = {
            id: account.productGroupNode.rowid,
            ID: account.productGroupNode.id,
            groupName: account.productGroupNode.groupname
        };
        const singleAccount: IAccountDetails = {
            accountid: account.rowid,
            accountID: account.id,
            accountMRid: account.accountMRid,
            accountName: account.accountName,
            commonName: account.commonName,
            routeid: account.routeid.id,
            routeName: account.routeid.routeName,
            franchiseid: account.franchise.rowid,
            franchiseName: account.franchise.franchiseName,
            productGroupid: singleGroup,
            childAccount: [],
            parentAccountid: null,
            franchiseRanking: null,
            rankingInFranchise: null
        };
        return singleAccount;
    }

    getAccountByAccountid(accountid: number): Observable<IAccountDetails> {
        return this.apollo
            .watchQuery({
                variables: { accountid: accountid },
                query: this.SEARCH_ACCOUNTIDS_QUERY
            })
            .valueChanges.pipe(
                map(result => this.singleAccountObject(result.data['getAccountMicroService'])));
    }

}
