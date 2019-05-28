import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class HppApiService {
    constructor(private http: HttpClient, private apollo: Apollo) {}

    getAllPnPProducts(): Observable<any> {
        return this.apollo
            .watchQuery({
                // variables: { accountID: accountID },
                query: gql`
                query getPnPProducts($brandID:ID="UHJvZHVjdEJyYW5kc1R5cGU6NQ=="){
                    nodeProductlist(brand:$brandID){
                    edges{
                        node{
                            rowid
                            productid
                            }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateGetAllPnPProducts(result.data['nodeProductlist'].edges)));
    }

    private consolidateGetAllPnPProducts(data) {
        const flattendData = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData = {};
                singleData['productName'] = data[array].node.productid;
                singleData['productid'] = data[array].node.rowid;
                flattendData.push(singleData);
        }
        return flattendData;
    }

    getMeatriteStock(): Observable<any> {
        return this.apollo
            .watchQuery({
                // variables: { accountID: accountID },
                query: gql`
                query getPnPMeatriteStock{
                    nodeMeatritestock{
                    edges{
                      node{
                        productid{
                          rowid
                          productid
                        }
                        amount
                        batchNumberJunctionid{
                            rowid
                            batchNumbers{
                                batchMRid
                            }
                        }
                      }
                    }
                  }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateMeatriteStock(result.data['nodeMeatritestock'].edges)));
    }

    private consolidateMeatriteStock(data) {
        const flattendData = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData = {};
                singleData['productName'] = data[array].node.productid.productid;
                singleData['productid'] = data[array].node.productid.rowid;
                singleData['amount'] = data[array].node.amount;
                singleData['batchNumber'] = data[array].node.batchNumberJunctionid.batchNumbers.batchMRid;
                singleData['cleared'] = true;
                singleData['batchNumberid'] = data[array].node.batchNumberJunctionid.rowid;
                flattendData.push(singleData);
        }
        return flattendData;
    }

    getHppMeatriteStock(productStatusid): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: { productStatusid: productStatusid},
                query: gql`
                query getHppPreStock($productStatusid:ID){
                    nodeHppmeatritestock(productStatusid:$productStatusid){
                        edges{
                            node{
                                productid{
                                    productid
                                    rowid
                                }
                                amount
                                batchNumberJunctionid{
                                    rowid
                                    batchNumbers{
                                        batchMRid
                                    }
                                }
                            }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateHppMeatriteStock(result.data['nodeHppmeatritestock'].edges)));
    }

    private consolidateHppMeatriteStock(data) {
        const flattendData = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData = {};
                singleData['productName'] = data[array].node.productid.productid;
                singleData['productid'] = data[array].node.productid.rowid;
                singleData['amount'] = data[array].node.amount;
                singleData['batchNumber'] = data[array].node.batchNumberJunctionid.batchNumbers.batchMRid;
                singleData['batchNumberid'] = data[array].node.batchNumberJunctionid.rowid;
                flattendData.push(singleData);
        }
        return flattendData;
    }

    // getPostHppStock(productStatusid): Observable<any> {
    //     return this.apollo
    //         .watchQuery({
    //             variables: { productStatusid: productStatusid},
    //             query: gql`
    //             query getHppPreStock($productStatusid:ID){
    //                 nodeHppmeatritestock(productStatusid:$productStatusid){
    //                     edges{
    //                         node{
    //                             productid{
    //                                 productid
    //                                 rowid
    //                             }
    //                             amount
    //                             batchNumberJunctionid{
    //                                 rowid
    //                                 batchNumbers{
    //                                     batchMRid
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             `,
    //         })
    //         .valueChanges.pipe(map(result => this.consolidatePostHppStock(result.data['nodeHppmeatritestock'].edges)));
    // }

    // private consolidatePostHppStock(data) {
    //     const flattendData = [];
    //     for (let array = 0; array < data.length; ++array) {
    //         const singleData = {};
    //             singleData['productName'] = data[array].node.productid.productid;
    //             singleData['productid'] = data[array].node.productid.rowid;
    //             singleData['amount'] = data[array].node.amount;
    //             singleData['batchNumber'] = data[array].node.batchNumberJunctionid.batchNumbers.batchMRid;
    //             singleData['batchNumberid'] = data[array].node.batchNumberJunctionid.rowid;
    //             flattendData.push(singleData);
    //     }
    //     console.log('*** Data for something ', flattendData);
    //     return flattendData;
    // }

    // getPreHppStock(productStatusid): Observable<any> {
    //     return this.apollo
    //         .watchQuery({
    //             variables: { productStatusid: productStatusid},
    //             query: gql`
    //             query getHppPreStock($productStatusid:ID){
    //                 nodeHppmeatritestock(productStatusid:$productStatusid){
    //                     edges{
    //                         node{
    //                             productid{
    //                                 productid
    //                                 rowid
    //                             }
    //                             amount
    //                             batchNumberJunctionid{
    //                                 rowid
    //                                 batchNumbers{
    //                                     batchMRid
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             `,
    //         })
    //         .valueChanges.pipe(map(result => this.consolidatePreHppStock(result.data['nodeHppmeatritestock'].edges)));
    // }

    // private consolidatePreHppStock(data) {
    //     const flattendData = [];
    //     for (let array = 0; array < data.length; ++array) {
    //         const singleData = {};
    //             singleData['productName'] = data[array].node.productid.productid;
    //             singleData['productid'] = data[array].node.productid.rowid;
    //             singleData['amount'] = data[array].node.amount;
    //             singleData['batchNumber'] = data[array].node.batchNumberJunctionid.batchNumbers.batchMRid;
    //             singleData['batchNumberid'] = data[array].node.batchNumberJunctionid.rowid;
    //             flattendData.push(singleData);
    //     }
    //     console.log('*** Data for something ', flattendData);
    //     return flattendData;
    // }

    // getLeakerHppStock(productStatusid): Observable<any> {
    //     return this.apollo
    //         .watchQuery({
    //             variables: { productStatusid: productStatusid},
    //             query: gql`
    //             query getHppPreStock($productStatusid:ID){
    //                 nodeHppmeatritestock(productStatusid:$productStatusid){
    //                     edges{
    //                         node{
    //                             productid{
    //                                 productid
    //                                 rowid
    //                             }
    //                             amount
    //                             batchNumberJunctionid{
    //                                 rowid
    //                                 batchNumbers{
    //                                     batchMRid
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             `,
    //         })
    //         .valueChanges.pipe(map(result => this.consolidateLeakerHPPStock(result.data['nodeHppmeatritestock'].edges)));
    // }

    // private consolidateLeakerHPPStock(data) {
    //     const flattendData = [];
    //     for (let array = 0; array < data.length; ++array) {
    //         const singleData = {};
    //             singleData['productName'] = data[array].node.productid.productid;
    //             singleData['productid'] = data[array].node.productid.rowid;
    //             singleData['amount'] = data[array].node.amount;
    //             singleData['batchNumber'] = data[array].node.batchNumberJunctionid.batchNumbers.batchMRid;
    //             singleData['batchNumberid'] = data[array].node.batchNumberJunctionid.rowid;
    //             flattendData.push(singleData);
    //     }
    //     console.log('*** Data for something ', flattendData);
    //     return flattendData;
    // }

    // getPreHppStock(): Observable<[]> {  // SFBQUHJvZHVjdFN0YXR1c1R5cGU6Mg==
    //     return this.http.get<any>('assets/mockData/meatriteStock/hppPreHppStock.json').pipe(
    //         map(data => data.hppPreHppStock),
    //         map(data =>
    //             data.map(stock => {
    //                 stock.stockTotal = this.getTotals(stock.batches, 'amount');
    //                 return stock;
    //             })
    //         )
    //     );
    // }

    // getPostHppStock(): Observable<[]> {  // SFBQUHJvZHVjdFN0YXR1c1R5cGU6MQ==
    //     return this.http.get<any>('assets/mockData/meatriteStock/hppPostHppStock.json').pipe(
    //         map(data => data.hppPostHppStock),
    //         map(data =>
    //             data.map(stock => {
    //                 stock.stockTotal = this.getTotals(stock.batches, 'amount');
    //                 return stock;
    //             })
    //         )
    //     );
    // }

    // getHppLeakers(): Observable<[]> {
    //     return this.http
    //         .get<any>('assets/mockData/meatriteStock/hppLeakers.json').pipe(
    //             map(data => data.hppLeakers),
    //             map(data => data.map(stock => {
    //                 stock.stockTotal = this.getTotals(stock.batches, 'amount');
    //                 return stock;
    //             }))
    //         );
    // }

    // getTotals(data: [], property: string) {
    //     if (data) {
    //         let total = 0;
    //         data.map(dataPoint => (total = total + dataPoint[property]));
    //         return total;
    //     }
    // }
}
