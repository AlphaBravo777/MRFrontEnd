import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class AccountGraphqlApiStringService {

    constructor() { }

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
                            groupName
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
                    groupName
                }
                routeid{
                    rowid
                    id
                    routeName
                }
            }
        }`;

    public ALL_FRANCHISES_QUERY = gql`
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
    
    public ACCOUNT_MR_IDs_QUERY = gql`
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
    
    public GET_SINGLE_ACCOUNT_QUERY = gql`
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
                        productGroupNode{
                            rowid
                            id
                            groupName
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
}
