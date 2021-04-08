import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { HttpClient } from '@angular/common/http';
import { IDate } from '../../main-portal/date-picker/date-picker-service/date-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProductOrderDetails, IProductDetails } from '../../../../../../projects/product-service/src/lib/#shared-services/interfaces/products-interface';
import { IOrderDetails } from 'projects/insert-order-service/src/lib/#sharedServices/interfaces/order-service-Interfaces';
import { IItemGroupingTypeConnection, IItemGroupingTypeNodes } from 'projects/product-service/src/public-api';

@Injectable({
    providedIn: 'root'
})
export class PnpSharedApiService {

//     public GET_PNP_ORDER_QUERY = gql`
//     query getPnPOrder($timeStampID:ID){
//         nodeOrderdetails(timeStampid:$timeStampID){
//             edges{
//                 node{
//                     accountsid {
//                         accountID
//                     }
//                     commonName
//                     orderDate
//                     delivered
//                     orderproductamountsSet{
//                         edges{
//                             node{
//                                 amount
//                                 productid{
//                                     rowid
//                                     productid
//                                     packageweight
//                                     rankingInGroup
//                                     packaging{
//                                         rowid
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `;

    constructor(private apollo: Apollo) {}

    // getPnPOrder(datePackage: IDate): Observable<IOrderDetails[]> {
    //     console.log(' * * * * * * * * * Collecting PnP Orders * * * * * * * * * ');
    //     return this.apollo
    //         .watchQuery({
    //             variables: { timeStampID: datePackage.nodeID },
    //             query: this.GET_PNP_ORDER_QUERY
    //         })
    //         .valueChanges.pipe(
    //             map(result => this.consolidatePnPOrder(result.data['nodeOrderdetails'].edges))
    //         );
    // }

    // private consolidatePnPOrder(data): IOrderDetails[] {

    //     function calculateLugSize(containerid) {
    //         if (containerid === 7) {
    //             return 1;
    //         } else {
    //             return 2;
    //         }
    //     }

    //     function consolidateProducts(dataProducts) {
    //         const flattenProducts: IProductOrderDetails[] = [];
    //         for (let prod = 0; prod < dataProducts.length; prod++) {
    //             const singleProduct: IProductOrderDetails = {
    //                 productMRid: dataProducts[prod].node.productid.productid,
    //                 productid: dataProducts[prod].node.productid.rowid,
    //                 amount: dataProducts[prod].node.amount,
    //                 packageWeight: dataProducts[prod].node.productid.packageweight,
    //                 rankingInGroup: dataProducts[prod].node.productid.rankingInGroup,
    //                 lugSize: calculateLugSize(dataProducts[prod].node.productid.packaging.rowid),
    //                 orderDetailsid: null,
    //                 userid: null,
    //                 packagingShippingWeight: null,
    //                 unitsPerMaxShippingWeight: null,
    //                 productActive: null
    //             };
    //             flattenProducts.push(singleProduct);
    //         }
    //         return flattenProducts;
    //     }

    //     const flattendData: IOrderDetails[] = [];
    //     for (let array = 0; array < data.length; ++array) {
    //         const singleData: IOrderDetails = {
    //             accountID: data[array].node.accountsid.accountID,
    //             commonName: data[array].node.commonName,
    //             orderDate: data[array].node.orderDate,
    //             delivered: data[array].node.delivered,
    //             accountMRid: null,
    //             accountName: null,
    //             accountid: null,
    //             franchiseid: null,
    //             orderNumber: null,
    //             orderid: null,
    //             productGroupid: null,
    //             routeName: null,
    //             routeid: null,
    //             timeStampid: null,
    //             userid: null,
    //             orderTotalAmount: null,
    //             franchiseRanking: null,
    //             rankingInFranchise: null,
    //             orders: consolidateProducts(data[array].node.orderproductamountsSet.edges),
    //         };
    //         flattendData.push(singleData);
    //     }
    //     return flattendData;
    // }



    getAllPnPProductsThatAreActive(): Observable<IProductDetails[]> {
        return this.apollo
            .watchQuery<IItemGroupingTypeConnection>({
                query: gql`
                query pnpGroup($departmentID: ID = "RGVwYXJ0bWVudFR5cGU6NA==") {
                    nodeProdmsItemGrouping(departmentid: $departmentID, active:true) {
                        edges{
                            node{
                                itemRanking
                                itemid{
                                    rowid
                                    defaultItemName
                                    description
                                    active
                                    itemweightorsize {
                                        weightOrSize
                                    }
                                }
                            }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateGetAllPnPProducts(result.data.nodeProdmsItemGrouping.edges)));
    }

    private consolidateGetAllPnPProducts(data: IItemGroupingTypeNodes[]): IProductDetails[] {
        const flattendData = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData: IProductDetails = {
                productMRid: data[array].node.itemid.defaultItemName,
                productid: data[array].node.itemid.rowid,
                packageWeight: data[array].node.itemid.itemweightorsize.weightOrSize,
                proddescription: data[array].node.itemid.description,
                rankingInGroup: data[array].node.itemRanking,
                productActive: data[array].node.itemid.active,
                lugSize: null,
                packagingShippingWeight: null,
                unitsPerMaxShippingWeight: null,
            };
            flattendData.push(singleData);
        }
        return flattendData;
    }

}
