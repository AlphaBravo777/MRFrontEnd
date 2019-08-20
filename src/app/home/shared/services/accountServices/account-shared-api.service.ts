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
                        productGroupid{
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

    constructor(private apollo: Apollo) {}

    searchAccountsOrCommonNames(accountMRid: string = '', commonName: string= ''): Observable<IAccountDetails[]> {
        console.log(accountMRid, commonName);
        return this.apollo
            .watchQuery({
                variables: { accountMRid: accountMRid, commonName: commonName },
                query: this.SEARCH_ACCOUNTS_MRID_OR_COMMONNAMES_QUERY
            })
            .valueChanges.pipe(
                // take(1),
                map(result => this.consolidateAccountsData(result.data['nodeAccountNameMicroService'].edges)));
    }

    private consolidateAccountsData(data): IAccountDetails[] {
        console.log('Here is the account data: ', data);
        const flattendData: IAccountDetails[] = [];
        for (let array = 0; array < data.length; ++array) {
            const singleGroup: IProductGroupName = {
                id: data[array].node.productGroupid.rowid,
                ID: data[array].node.productGroupid.id,
                groupName: data[array].node.productGroupid.groupname
            };
            const singleData: IAccountDetails = {
                accountid: data[array].node.rowid,
                accountID: data[array].node.id,
                accountMRid: data[array].node.accountMRid,
                accountName: data[array].node.accountName,
                commonName: data[array].node.commonName,
                routeid: data[array].node.routeid.id,
                routeName: data[array].node.routeid.routeName,
                franchiseid: data[array].node.franchise.rowid,
                franchiseName: data[array].node.franchise.franchiseName,
                productGroupid: singleGroup,
                childAccount: [],
                parentAccountid: null
            };
            flattendData.push(singleData);
        }
        console.log('Charlie(b) ', flattendData);
        return flattendData;
    }
}
