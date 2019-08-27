import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import {
    IOrderDetails,
    ff_createOrderDetailsObjectForDB,
    IOrderDBDetails } from 'projects/insert-order-service/src/lib/#sharedServices/interfaces/order-service-Interfaces';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderApiService {
    constructor(
        private urlService: UrlsService,
        private http: HttpClient,
        private apollo: Apollo
    ) {}

    private stockUrl = this.urlService.backendUrl + 'office/';

    enterNewOrderDetails(newOrderDetails: IOrderDetails) {
        const dbOrderDetails: IOrderDBDetails = ff_createOrderDetailsObjectForDB(newOrderDetails);
        return this.http.post<any>(this.stockUrl + 'orders/enterDetails/', dbOrderDetails);
    }

    enterProductAmounts(productAmounts) {
        return this.http.post<any>(
            this.stockUrl + 'orders/enterProductAmounts/',
            productAmounts
        );
    }

    searchForAccount(accountMRid): Observable<IAccountDetails[]> {
        console.log(' * * * * Server call is running * * * *', accountMRid);
        return this.apollo
            .watchQuery({
                variables: { accountMRid: accountMRid },
                query: gql`
                    query getAccountName($accountMRid: String) {
                        nodeAccountnames(accountID_Icontains: $accountMRid) {
                            edges {
                                node {
                                    accountID
                                    accountName
                                    id
                                    rowid
                                    commonName
                                    route {
                                        rowid
                                        routeName
                                    }
                                    parentAccountID {
                                        accountID
                                    }
                                }
                            }
                        }
                    }
                `
            })
            .valueChanges.pipe(
                map(result =>
                    this.consolidateSearchForAccount(
                        result.data['nodeAccountnames'].edges
                    )
                )
            );
    }

    private consolidateSearchForAccount(data): IAccountDetails[] {
        console.log(' = Alfa = ', data);

        const flattendData: IAccountDetails[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData: IAccountDetails = {
                accountid: null,
                accountID: null,
                accountMRid: null,
                accountName: null,
                commonName: null,
                parentAccountid: null,
                routeName: null,
                routeid: null,
                franchiseid: null,
                productGroupid: null
            };
            singleData.accountid = data[array].node.rowid;
            singleData.accountID = data[array].node.id;
            singleData.accountMRid = data[array].node.accountID;
            singleData.accountName = data[array].node.accountName;
            singleData.commonName = data[array].node.commonName;
            if (data[array].node.parentAccountID) {
                singleData.parentAccountid =
                    data[array].node.parentAccountID.accountID;
            } else {
                singleData.parentAccountid = null;
            }
            singleData.routeName = data[array].node.route.routeName;
            singleData.routeid = data[array].node.route.rowid;
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
                    query getAccountName2($accountID: ID) {
                        nodeAccountnames(id: $accountID) {
                            edges {
                                node {
                                    id
                                    rowid
                                    accountID
                                    productGroup {
                                        productgroupsSet {
                                            edges {
                                                node {
                                                    productid {
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
                `
            })
            .valueChanges.pipe(
                map(result =>
                    this.consolidateAccountProducts(
                        result.data['nodeAccountnames'].edges[0].node
                            .productGroup.productgroupsSet.edges
                    )
                )
            );
    }

    private consolidateAccountProducts(data) {
        const flattendData = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = { productMRid: null, productid: null };
            singleData.productMRid = data[array].node.productid.productid;
            singleData.productid = data[array].node.productid.rowid;
            flattendData.push(singleData);
        }
        console.log('nodeAccountnames = ', flattendData);
        return flattendData;
    }
}
