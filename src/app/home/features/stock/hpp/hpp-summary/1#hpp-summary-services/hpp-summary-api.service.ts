import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';

@Injectable({
    providedIn: 'root'
})
export class HppSummaryApiService {
    constructor(private http: HttpClient, private getDate: GetDate$Service) {}

    getPnpProducts(): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/pnpProducts.json').pipe(
            map(data => data.pnpProducts),
        );
    }

    getMeatriteStock(): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/hppMeatriteStock.json').pipe(
            map(data => data.meatriteStock),
            map(data => data.map(stock => {
                stock.stockTotal = this.getTotals(stock.batches, 'amount');
                return stock;
            }))
        );
    }

    getPreHppStock(datePackage: IDate): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/hppPreHppStock.json').pipe(
            map(data => data.hppPreHppStock),
            map(data => data.map(stock => {
                stock.stockTotal = this.getTotals(stock.batches, 'amount');
                return stock;
            }))
        );
    }

    // getPreHppStock(datePackage: IDate): Observable<[]> {
    //     return this.http.get<any>('assets/mockData/meatriteStock/hppPreHppStock.json').pipe(
    //         map(data => data.hppPreHppStock),
    //         map(data => data.find(date => date.timeStamp === datePackage.nodeID)),
    //         map(data => data.products),
    //         map(data => data.map(stock => {
    //             stock.stockTotal = this.getTotals(stock.batches, 'amount');
    //             return stock;
    //         })),
    //     );
    // }

    test(datePackage) {
        this.getDate.getDifferentDay(datePackage, 2);
    }

    getPostHppStock(datePackage: IDate): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/hppPostHppStock.json').pipe(
            map(data => data.hppPostHppStock),
            map(data => data.map(stock => {
                stock.stockTotal = this.getTotals(stock.batches, 'amount');
                return stock;
            }))
        );
    }

    getPnPOrder(datePackage: IDate): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/hppPnPOrder.json').pipe(
            map(data => data.pnpOrder),
            map(data => data.find(order => order.timeStamp === datePackage.nodeID)),
            map(data => data.products)
        );
    }

    getOutstandingPnPOrders(datePackage: IDate): Observable<any> {
        let amountOfOrders = 0;
        return this.http.get<any>('assets/mockData/meatriteStock/hppPnPOrder.json').pipe(
            map(data => data.pnpOrder),
            map(data => data.filter(order => order.delivered === false && order.deliveryDate < datePackage.shortDate)),
            tap(data => amountOfOrders = data.length),
            map(data => {
                return {data: this.getOutstandingOrderTotals(data), amountOfOrders: amountOfOrders};
            })
        );
    }

    getHppLeakers(): Observable<[]> {
        return this.http
            .get<any>('assets/mockData/meatriteStock/hppLeakers.json').pipe(
                map(data => data.hppLeakers),
                map(data => data.map(stock => {
                    stock.stockTotal = this.getTotals(stock.batches, 'amount');
                    return stock;
                }))
            );
    }

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
