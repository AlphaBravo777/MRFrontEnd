import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderApiService {

    constructor(private apollo: Apollo) {}

    searchForAccount(accountNumber): Observable<any> {
        console.log(' * * * * Server call is running * * * *');
        return this.apollo
            .watchQuery({
                variables: { accountNumber: accountNumber },
                query: gql`
                query getAccountName($accountNumber:String){
                    nodeAccountnames(accountID_Icontains:$accountNumber){
                      edges{
                        node{
                          accountID
                          accountName
                          id
                          rowid
                          commonName
                          route{
                            rowid
                            routeName
                          }
                          parentAccountID{
                            accountID
                          }
                        }
                      }
                    }
                  }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateSearchForAccount(result.data['nodeAccountnames'].edges)));
    }

    private consolidateSearchForAccount(data) {

        const flattendData = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = {};
                singleData['accountid'] = data[array].node.rowid;
                singleData['accountID'] = data[array].node.id;
                singleData['accountMRid'] = data[array].node.accountID;
                singleData['accountName'] = data[array].node.accountName;
                singleData['commonName'] = data[array].node.commonName;
                singleData['parentAccountid'] = data[array].node.parentAccountID.accountID;
                singleData['routeName'] = data[array].node.route.routeName;
                singleData['routeid'] = data[array].node.route.rowid;
                flattendData.push(singleData);
        }
        console.log('nodeAccountnames = ', flattendData);
        return flattendData;
    }

    getAccountProducts(accountID): Observable<any> {
        console.log('Alpha', accountID);
        return this.apollo
            .watchQuery({
                variables: { accountID: accountID },
                query: gql`
                query getAccountName2($accountID:ID){
                    nodeAccountnames(id:$accountID){
                        edges{
                            node{
                                id
                                rowid
                                accountID
                                productGroup{
                                    productgroupsSet{
                                        edges{
                                            node{
                                                productid{
                                                    productid
                                                    rowid
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateAccountProducts(result.data['nodeAccountnames'].
                edges[0].node.productGroup.productgroupsSet.edges)));
    }

    private consolidateAccountProducts(data) {

        const flattendData = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = {productMRid: null, productid: null};
                singleData.productMRid = data[array].node.productid.productid;
                singleData.productid = data[array].node.productid.rowid;
                flattendData.push(singleData);
        }
        console.log('nodeAccountnames = ', flattendData);
        return flattendData;
    }


}

// Getting the parent account with all the children, you can even go further and get the grandchildren

// query getAccountName($accountID:String="P74"){
//     nodeAccountnames(accountID_Icontains:$accountID){
//       edges{
//         node{
//           accountnameSet{
//             edges{
//               node{
//                 commonName
//               }
//             }
//           }
//           accountID
//           accountName
//           id
//           rowid
//           commonName
//           accountID
//           route{
//             rowid
//             routeName
//           }
//           parentAccountID{
//             accountID
//           }
//         }
//       }
//     }
//   }
