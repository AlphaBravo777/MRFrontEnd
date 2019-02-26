import { Injectable } from '@angular/core';
import { HppSummaryApiService } from './hpp-summary-api.service';
import { Observable, combineLatest } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { concatMap, map, tap } from 'rxjs/operators';
import { select } from 'async';
import { HppApiService } from '../../$hpp-services/hpp-api.service';

@Injectable({
    providedIn: 'root'
})
export class HppSummaryService {

    consolidatedOrders = [];

    constructor(private hppSummaryApiService: HppSummaryApiService, private hppApiService: HppApiService) {}

    getHppStartingData(datePackage: IDate): Observable<any> {
        return combineLatest([
            this.getPnpProducts(),
            this.getMeatriteStock(),
            this.getPreHppStock(datePackage),
            this.getPnPOrder(datePackage),
            this.getOutstandingPnPOrders(datePackage),
            this.getPostHppStock(datePackage),
            this.getHppLeakers()
        ]);
    }

    // pnpProducts
    // meatriteProducts
    // preHppProducts
    // pnpOrders
    // oustandingPnPOrders + number
    // postHppProducts
    // hppLeakers

    getPnpProducts(): Observable<any> {
        return this.hppApiService.getAllPnPProducts().pipe();
    }

    getMeatriteStock(): Observable<any> {
        return this.hppSummaryApiService.getMeatriteStock().pipe();
    }

    getPreHppStock(datePackage: IDate): Observable<any> {
        return this.hppApiService.getPreHppStock().pipe();
    }

    getPostHppStock(datePackage: IDate): Observable<any> {
        return this.hppApiService.getPostHppStock().pipe();
    }

    getPnPOrder(datePackage: IDate): Observable<any> {
        return this.hppSummaryApiService.getPnPOrder(datePackage).pipe(
            tap(() => this.consolidatedOrders = []),
            map(data => this.consolidatePnPDailyOrders(data))
        );
    }

    getOutstandingPnPOrders(datePackage: IDate): Observable<any> {
        let amountOfOrders = 0;
        return this.hppSummaryApiService.getOutstandingPnPOrders(datePackage).pipe(
            map(data => data.filter(order => order.orderDate < datePackage.shortDate)),
            // tap(data => console.log('These are the orders that qualify for outstanding = ', data)),
            tap(data => amountOfOrders = this.returnAmountOfOrders(data)),
            map(data => {
                // console.log('DELTA = ', data);
                return {data: this.getOutstandingOrderTotals(data), amountOfOrders: amountOfOrders};
            }),
            // map(data => this.getOutstandingOrderTotals(data)),
            tap(data => console.log('Here are the final outstanding orders', data))
        );
    }

    returnAmountOfOrders(orders) {
        if (orders.length === 0) {
            return 0;
        }
        const array = [];
        array.push(orders[0].orderDate);
        for (let order = 0; order < orders.length; order++) {
            let flag = true;
            for (let arr = 0; arr < array.length; arr++) {
                if (orders[order].orderDate === array[arr]) {
                    flag = false;
                }
            }
            if (flag) {
                array.push(orders[order].orderDate);
            }
        }
        return array.length;
    }

    getHppLeakers(): Observable<any> {
        return this.hppApiService.getHppLeakers().pipe();
    }

    calculateStockTable(pnpProducts, meatriteStock, preHppStock, pnpOrder, postHppStock, hppLeakers, amountOfOrders, outstandingOrders) {
        const outstandingStock = [];
        for (let pnp = 0; pnp < pnpProducts.length; pnp++) {
            outstandingStock.push({productid: pnpProducts[pnp].productid, productMRid: pnpProducts[pnp].productName});
        }
        for (let out = 0; out < outstandingStock.length; out++) {
            outstandingStock[out].postHpp = 0;
            for (let postHpp = 0; postHpp < postHppStock.length; postHpp++) {
                if (outstandingStock[out].productid === postHppStock[postHpp].productid) {
                    outstandingStock[out].postHpp = postHppStock[postHpp].stockTotal;
                    break;
                } else {
                    outstandingStock[out].postHpp = 0;
                }
            }
            for (let preHpp = 0; preHpp < preHppStock.length; preHpp++) {
                if (outstandingStock[out].productid === preHppStock[preHpp].productid) {
                    outstandingStock[out].preHpp = preHppStock[preHpp].stockTotal;
                    break;
                } else {
                    outstandingStock[out].preHpp = 0;
                }
            }
            for (let mr = 0; mr < meatriteStock.length; mr++) {
                if (outstandingStock[out].productid === meatriteStock[mr].productid) {
                    outstandingStock[out].mrStock = meatriteStock[mr].stockTotal;
                    break;
                } else {
                    outstandingStock[out].mrStock = 0;
                }
            }
            for (let order = 0; order < pnpOrder.length; order++) {
                if (outstandingStock[out].productid === pnpOrder[order].productid) {
                    outstandingStock[out].pnpOrder = pnpOrder[order].amount;
                    break;
                } else {
                    outstandingStock[out].pnpOrder = 0;
                }
            }
            for (let leak = 0; leak < hppLeakers.length; leak++) {
                if (outstandingStock[out].productid === hppLeakers[leak].productid) {
                    outstandingStock[out].leakers = hppLeakers[leak].stockTotal;
                    break;
                } else {
                    outstandingStock[out].leakers = 0;
                }
            }
            for (let outOrder = 0; outOrder < outstandingOrders.length; outOrder++) {
                if (outstandingStock[out].productid === outstandingOrders[outOrder].productid) {
                    outstandingStock[out].outOrders = outstandingOrders[outOrder].stockTotal;
                    break;
                } else {
                    outstandingStock[out].outOrders = 0;
                }
            }
        }
        // console.log('* * * ', outstandingStock);
        for (let pnp = 0; pnp < outstandingStock.length; pnp++) {
            switch (amountOfOrders) {
                case undefined:
                console.log
                ('* * * * * *  The "getOutstandingStock" function failed with calculating the amount of orders * * * * * * * ');
                break;
                case 0:
                    // console.log('This is the current day');
                    outstandingStock[pnp].amount = outstandingStock[pnp].postHpp - outstandingStock[pnp].pnpOrder;
                    if (outstandingStock[pnp].amount > 0) {
                        outstandingStock[pnp].amount = 0;
                    }
                break;
                case 1:
                    // console.log('This is the next day');
                    outstandingStock[pnp].amount = outstandingStock[pnp].postHpp + outstandingStock[pnp].preHpp -
                    outstandingStock[pnp].outOrders - outstandingStock[pnp].pnpOrder;
                    if (outstandingStock[pnp].amount > 0) {
                        outstandingStock[pnp].amount = 0;
                    }
                break;
                default:
                    // console.log('This is day 2 or more');
                    outstandingStock[pnp].amount = outstandingStock[pnp].postHpp + outstandingStock[pnp].preHpp +
                    outstandingStock[pnp].mrStock - outstandingStock[pnp].outOrders - outstandingStock[pnp].pnpOrder;
                    if (outstandingStock[pnp].amount > 0) {
                        outstandingStock[pnp].amount = 0;
                    }
            }
        }
        return outstandingStock;
    }

    consolidatePnPDailyOrders(ordersArray) {
        for (let order = 0; order < ordersArray.length; order++) {
            this.individualOrders(ordersArray[order]);
        }
        // console.log('- - - - - ', this.consolidatedOrders);
        return this.consolidatedOrders;
    }

    individualOrders(singleOrder) {
        let flag = false;
        for (let prod = 0; prod < singleOrder.products.length; prod++) {
            flag = this.consolidated(singleOrder.products[prod]);
            if (!flag) {
                const firstProduct = {
                    productMRid: singleOrder.products[prod].productMRid,
                    productid: singleOrder.products[prod].productid,
                    amount: singleOrder.products[prod].amount};
                this.consolidatedOrders.push(firstProduct);
            }
        }
    }

    consolidated(product) {
        for (let con = 0; con < this.consolidatedOrders.length; con++) {
            if (this.consolidatedOrders[con].productid === product.productid) {
                this.consolidatedOrders[con].amount = this.consolidatedOrders[con].amount + product.amount;
                return true;
            }
        }
        if (this.consolidatedOrders.length === 0) {
            const firstProduct = {
                productMRid: product.productMRid,
                productid: product.productid,
                amount: product.amount};
            this.consolidatedOrders.push(firstProduct);
            return true;
        }
    }

    getOutstandingOrderTotals(orders) {
        const productList = <any>[];
        for (let order = 0; order < orders.length; order++) {
            orderFunc(orders[order]);
        }

        function orderFunc(order) {
            for (let prod = 0; prod < order.products.length; prod++) {
                productFunc(order.products[prod]);
            }
        }

        function productFunc(product) {
            console.log('Here is a product: ', product.productMRid, product.amount);
            let prodFound = false;
            for (let list = 0; list < productList.length; list++) {
                if (productList[list].productMRid === product.productMRid) {
                    productList[list].stockTotal = productList[list].stockTotal + product.amount;
                    prodFound = true;
                }
            }
            if (!prodFound) {
                productList.push({productMRid: product.productMRid, productid: product.productid, stockTotal: product.amount});
            }
        }
        console.log('The final product list =', productList);
        return productList;
    }


    // getOutstandingOrderTotals(orders) {
    //     console.log('Echo = ', orders);
    //     const ordersTotals = <any>[];
    //     for (let order = 0; order < orders.length; order++) {
    //         if (order === 0) {
    //             for (let product = 0; product < orders[order].products.length; product++) {
    //                 ordersTotals.push({
    //                     productid: orders[order].products[product].productid,
    //                     stockTotal: orders[order].products[product].amount
    //                 });
    //             }
    //         } else {
    //             for (let total = 0; total < ordersTotals.length; total++) {
    //                 for (let product = 0; product < orders[order].products.length; product++) {
    //                     if (ordersTotals[total].productid === orders[order].products[product].productid) {
    //                         ordersTotals[total].stockTotal = ordersTotals[total].stockTotal + orders[order].products[product].amount;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return ordersTotals;
    // }

}
