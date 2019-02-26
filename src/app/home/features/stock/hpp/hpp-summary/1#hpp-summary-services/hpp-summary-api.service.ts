import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular-boost';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

@Injectable({
    providedIn: 'root'
})
export class HppSummaryApiService {
    constructor(private http: HttpClient, private apollo: Apollo) {}

    // getPnpProducts(): Observable<[]> {
    //     return this.http.get<any>('assets/mockData/meatriteStock/pnpProducts.json').pipe(
    //         map(data => data.pnpProducts),
    //     );
    // }

    getMeatriteStock(): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/hppMeatriteStock.json').pipe(
            map(data => data.meatriteStock),
            map(data => data.map(stock => {
                stock.stockTotal = this.getTotals(stock.batches, 'amount');
                return stock;
            }))
        );
    }

    getPnPOrder(datePackage: IDate): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: { timeStampID: datePackage.nodeID },
                query: gql`
                query getPnPOrder($timeStampID:ID){
                    nodeOrderdetails(timeStampid:$timeStampID){
                      edges{
                        node{
                          commonName
                          orderDate
                          delivered
                          orderproductamountsSet{
                            edges{
                              node{
                                amount
                                productid{
                                  rowid
                                  productid
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
            .valueChanges.pipe(map(result => this.consolidatePnPOrder(result.data['nodeOrderdetails'].edges)));
    }

    private consolidatePnPOrder(data) {
        // console.log('Here are the current pnp orders ', data);
        const flattendData = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData = {};
            singleData['commonName'] = data[array].node.commonName;
            singleData['orderDate'] = data[array].node.orderDate;
            singleData['delivered'] = data[array].node.delivered;
            const flattenProducts = [];
            for (let prod = 0; prod < data[array].node.orderproductamountsSet.edges.length; prod++) {
                const singleProduct = {};
                singleProduct['productMRid'] = data[array].node.orderproductamountsSet.edges[prod].node.productid.productid;
                singleProduct['productid'] = data[array].node.orderproductamountsSet.edges[prod].node.productid.rowid;
                singleProduct['amount'] = data[array].node.orderproductamountsSet.edges[prod].node.amount;
                flattenProducts.push(singleProduct);
            }
            singleData['products'] = flattenProducts;
            flattendData.push(singleData);
        }
        // console.log('Here are the new PNP ORDERS ', flattendData);
        return flattendData;
    }

    getOutstandingPnPOrders(datePackage: IDate): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: { timeStampID: datePackage.nodeID },
                query: gql`
                query getOutstandingOrders($routeid:ID="RGVsaXZlcnlSb3V0ZXNUeXBlOjE4="){
                    nodeOrderdetails(routeid:$routeid, delivered:false){
                      edges{
                        node{
                          commonName
                          orderDate
                          delivered
                          routeid {
                            id
                          }
                          orderproductamountsSet{
                            edges{
                              node{
                                amount
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
                `,
            })
            .valueChanges.pipe(map(result => this.consolidatePnPOrder(result.data['nodeOrderdetails'].edges)));
    }

    // getOutstandingPnPOrders(datePackage: IDate): Observable<any> {
    //     let amountOfOrders = 0;
    //     return this.http.get<any>('assets/mockData/meatriteStock/hppPnPOrder.json').pipe(
    //         map(data => data.pnpOrder),
    //         map(data => data.filter(order => order.delivered === false && order.deliveryDate < datePackage.shortDate)),
    //         // tap(data => amountOfOrders = data.length),
    //         // map(data => {
    //         //     console.log('DELTA = ', data);
    //         //     return {data: this.getOutstandingOrderTotals(data), amountOfOrders: amountOfOrders};
    //         // })
    //     );
    // }

    // getPnPOrder(datePackage: IDate): Observable<[]> {
    //     return this.http.get<any>('assets/mockData/meatriteStock/hppPnPOrder.json').pipe(
    //         map(data => data.pnpOrder),
    //         map(data => data.find(order => order.timeStamp === datePackage.nodeID)),
    //         map(data => data.products)
    //     );
    // }

    // {"timeStamp": "sdfaafd", "deliveryDate": "2019-02-13", "delivered": true, "products":
    // [
    //     { "productName": "SV Deli 500", "productid": 1, "amount": 13 },
    //     { "productName": "SS Deli 500", "productid": 2, "amount": 13 },
    //     { "productName": "RV NN 1kg", "productid": 3, "amount": 13 },
    //     { "productName": "CCV 1kg", "productid": 4, "amount": 13 },
    //     { "productName": "PSV 500", "productid": 5, "amount": 13 }
    // ]
    // },

    // getPnPOrder(datePackage: IDate): Observable<[]> {
    //     return this.http.get<any>('assets/mockData/meatriteStock/hppPnPOrder.json').pipe(
    //         map(data => data.pnpOrder),
    //         map(data => data.find(order => order.timeStamp === datePackage.nodeID)),
    //         map(data => data.products)
    //     );
    // }



    // 0: {timeStamp: "VGltZVN0YW1wVHlwZTo0MzQ=", deliveryDate: "2019-02-25", delivered: false, products: Array(5)}
    // 1: {timeStamp: "VGltZVN0YW1wVHlwZTo0MzM=", deliveryDate: "2019-02-26", delivered: false, products: Array(5)}


    getTotals(data: [], property: string) {
        if (data) {
            let total = 0;
            data.map(dataPoint => total = total + dataPoint[property]);
            return total;
        }
    }

    getOutstandingOrderTotals(orders) {
        const ordersTotals = <any>[];
        for (let order = 0; order < orders.length; order++) {
            if (order === 0) {
                for (let product = 0; product < orders[order].products.length; product++) {
                    ordersTotals.push({
                        productid: orders[order].products[product].productid,
                        stockTotal: orders[order].products[product].amount
                    });
                }
            } else {
                for (let total = 0; total < ordersTotals.length; total++) {
                    for (let product = 0; product < orders[order].products.length; product++) {
                        if (ordersTotals[total].productid === orders[order].products[product].productid) {
                            ordersTotals[total].stockTotal = ordersTotals[total].stockTotal + orders[order].products[product].amount;
                        }
                    }
                }
            }
        }
        return ordersTotals;
    }

}
