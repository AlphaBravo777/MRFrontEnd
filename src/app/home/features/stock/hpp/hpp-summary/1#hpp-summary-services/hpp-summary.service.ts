import { Injectable } from '@angular/core';
import { HppSummaryApiService } from './hpp-summary-api.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { concatMap, map, tap } from 'rxjs/operators';
import { select } from 'async';
import { HppApiService } from '../../$hpp-services/hpp-api.service';
import { HppService } from '../../$hpp-services/hpp.service';

@Injectable({
    providedIn: 'root'
})
export class HppSummaryService {

    consolidatedOrders = [];

    constructor(private hppSummaryApiService: HppSummaryApiService,
        private hppApiService: HppApiService,
        private hppService: HppService) {}

    getHppStartingData(datePackage: IDate): Observable<any> {
        return combineLatest([
            this.getPnpProducts(),
            this.getMeatriteStock(),
            this.getPreHppStock(),
            this.getPnPOrder(datePackage),
            this.getOutstandingPnPOrders(datePackage),
            this.getPostHppStock(),
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
        return this.hppApiService.getMeatriteStock().pipe(
            map(data => this.consolidateMeatriteStock(data)),
            map(data => data.map(stock => {
                stock.stockTotal = this.getTotals(stock.batches, 'amount');
                return stock;
            })),
            tap(data => console.log('The meatrite stock looks like: ', data)),
        );
    }

    getPreHppStock(): Observable<any> {
        return this.hppService.getPreHppStock().pipe(
            map(data => data.map(stock => {
                stock.stockTotal = this.getTotals(stock.batches, 'amount');
                return stock;
            }))
        );
    }

    getPostHppStock(): Observable<any> {
        return this.hppService.getPostHppStock().pipe(
            map(data => data.map(stock => {
                stock.stockTotal = this.getTotals(stock.batches, 'amount');
                return stock;
            }))
        );
    }

    getHppLeakers(): Observable<any> {
        return this.hppService.getLeakersStock().pipe(
            map(data => data.map(stock => {
                stock.stockTotal = this.getTotals(stock.batches, 'amount');
                return stock;
            }))
        );
    }

    getPnPOrder(datePackage: IDate): Observable<any> {
        return this.hppSummaryApiService.getPnPOrder(datePackage).pipe(
            tap(() => this.consolidatedOrders = []),
            map(data => this.consolidatePnPDailyOrders(data)),
            concatMap(data => {
                if (data.length === 0) {
                    return this.hppSummaryApiService.getPnPRaaiLys();
                } else {
                    return of(data);
                }
            })
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

    calculateStockTable(pnpProducts, meatriteStock, preHppStock, pnpOrder, postHppStock, hppLeakers, amountOfOrders, outstandingOrders) {
        const outstandingStock = [];
        for (let pnp = 0; pnp < pnpProducts.length; pnp++) {
            outstandingStock.push({
                productid: pnpProducts[pnp].productid,
                productMRid: pnpProducts[pnp].productName,
                postHpp: 0,
                preHpp: 0,
                mrStock: 0,
                pnpOrder: 0,
                leakers: 0,
            });
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
        console.log('* * * ', outstandingStock);
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

    consolidateMeatriteStock(primitiveStock) {  // This is almost the same code as hpp.service.groupProductBatchesTogether
        const consolidatedStock = [];
        if (consolidatedStock.length === 0 && primitiveStock.length !== 0) {
            consolidatedStock.push({
                productName: primitiveStock[0].productName, productid: primitiveStock[0].productid,
                batches: [{batchNumber: primitiveStock[0].batchNumber, amount: primitiveStock[0].amount, cleared: true}]
            });
            primitiveStock.splice(0, 1);
        }
        while (primitiveStock.length > 0) {
            let flag = false;
            for (let con = 0; con < consolidatedStock.length; con++) {
                if (primitiveStock[0].productid === consolidatedStock[con].productid) {
                    consolidatedStock[con].batches.push(
                        {batchNumber: primitiveStock[0].batchNumber, amount: primitiveStock[0].amount, cleared: true}
                    );
                    flag = true;
                }
            }
            if (!flag) {
                consolidatedStock.push({
                    productName: primitiveStock[0].productName, productid: primitiveStock[0].productid,
                    batches: [{batchNumber: primitiveStock[0].batchNumber, amount: primitiveStock[0].amount, cleared: true}]
                });
            }
            primitiveStock.splice(0, 1);
        }
        return consolidatedStock;
    }


    getTotals(data: [], property: string) {
        if (data) {
            let total = 0;
            data.map(dataPoint => total = total + dataPoint[property]);
            return total;
        }
    }

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

}
