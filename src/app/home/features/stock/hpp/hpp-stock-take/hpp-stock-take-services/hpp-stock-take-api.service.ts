import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IHppProducts, IHppBatchGroups } from './hpp-stock-interface';

@Injectable({
    providedIn: 'root'
})
export class HppStockTakeApiService {

    constructor() { }

 // Everything starts at stocktake at meatrite. (So the stock must be taken)
 // There should always just be one meatrite stock, you can have stock that says different times, but this will be a copy
 // of the stock that is showing as the latest stock.
 // Then when you want to load a truck, you go to the load truck screen, and you pick your order, and also change the truck number if need,
 // then at the order it will show the products that you can load, along with all the stock that is in place.
 // You then have an up down arrow, so that when
 // you press the up arrow at the stock side, it increases the truck stock, and decreases the factory stock.
 // Arrows should have 1, 5, 10, 50 and "total needed" totals that you can choose from
 // If there are different batches of a product, then those batches should all appear, but you should only be able to take if the
 // first one, and when it is at zero, then go on to the next one.
 // It should have borders around the stock showing if there is too little or too much.
 // When you click on truck fininshed, it should add the items to the truck, along with its batch codes, and also update the
 // factory stock. It should then put the stock on pre-hpp (but not checked in - maybe gray), when you unload the truck you will
 // check what is on the truck with what the stock says, click a checkbox if it is alright, and it will turn green at pre-hpp.
 // Then a stocktake is made at post-hpp, showing what was left the previous day, and everything at pre-hpp that can be picked from (or
 // brought over from pre to post hpp might be a better way of saying it.)
 // Then when the truck is loaded again, give the same truck laoding screen, but when you pick the route, it gets all the stock that
 // is at hpp, you might have to use a new batch code, as this will be a new truck going from hpp with different products on it.

    getPnPDailyOrder(date: number): Observable<IHppProducts[]> {
        const pnpDailyOrder: IHppProducts[] = [
            { productid: 'SVDeli500', timestampid: 42, amount: 30 },
            { productid: 'SSDeli500', timestampid: 42, amount: 40 },
            { productid: 'SVDeli500', timestampid: 43, amount: 20 },
            { productid: 'SSDeli500', timestampid: 43, amount: 50 },
            { productid: 'SVDeli500', timestampid: 44, amount: 70 },
            { productid: 'SSDeli500', timestampid: 44, amount: 30 },
            { productid: 'SVDeli500', timestampid: 45, amount: 90 },
            { productid: 'SSDeli500', timestampid: 45, amount: 80 },
        ];
        return of(pnpDailyOrder.filter(item => item.timestampid === date));
    }

    getMeatriteStockAvailable(): Observable<any[]> {
        const meatriteStock = [
            { productid: 'SVDeli500', batchCode: '45:7', timestampid: 43, amount: 42 },
            { productid: 'SSDeli500', batchCode: '45:7', timestampid: 43, amount: 60 },
            { productid: 'PPCCV500', batchCode: '45:7', timestampid: 43, amount: 30 },
            { productid: 'SSDeli500', batchCode: '46:1', timestampid: 43, amount: 65 },
            { productid: 'SVDeli500', batchCode: '46:1', timestampid: 43, amount: 38 },
            { productid: 'PPCCV500', batchCode: '46:1', timestampid: 43, amount: 17 }
        ];
        return of(meatriteStock);
    }

    getHppStockAvailable(date: number): Observable<IHppBatchGroups[]> {
        const stockTakeData: IHppBatchGroups[] = [
            {
                batchNumber: '43', products: [
                    { productid: 'SVDeli500', timestampid: 43, truckCode: '46:1', amount: 40, condition: 'prehpp' },
                    { productid: 'SSDeli500', timestampid: 43, truckCode: '46:1', amount: 60, condition: 'prehpp' },
                    { productid: 'SVDeli500', timestampid: 43, truckCode: '46:1', amount: 40, condition: 'posthpp' },
                    { productid: 'SSDeli500', timestampid: 43, truckCode: '46:1', amount: 60, condition: 'posthpp' },
                    { productid: 'SVDeli500', timestampid: 43, truckCode: '46:1', amount: 3, condition: 'leaker' },
                    { productid: 'SSDeli500', timestampid: 43, truckCode: '46:1', amount: 5, condition: 'leaker' }
                ]
            },
            {
                batchNumber: '44', products: [
                    { productid: 'SVDeli500', timestampid: 44, truckCode: '46:1', amount: 40, condition: 'prehpp' },
                    { productid: 'SSDeli500', timestampid: 44, truckCode: '46:1', amount: 60, condition: 'prehpp' },
                    { productid: 'SVDeli500', timestampid: 44, truckCode: '46:1', amount: 40, condition: 'posthpp' },
                    { productid: 'SSDeli500', timestampid: 44, truckCode: '46:1', amount: 60, condition: 'posthpp' },
                    { productid: 'SVDeli500', timestampid: 44, truckCode: '46:1', amount: 3, condition: 'leaker' },
                    { productid: 'SSDeli500', timestampid: 44, truckCode: '46:1', amount: 5, condition: 'leaker' }
                ]
            },
            {
                batchNumber: '45', products: [
                    { productid: 'SVDeli500', timestampid: 45, truckCode: '46:1', amount: 40, condition: 'prehpp' },
                    { productid: 'SSDeli500', timestampid: 45, truckCode: '46:1', amount: 60, condition: 'prehpp' },
                    { productid: 'SVDeli500', timestampid: 45, truckCode: '46:1', amount: 40, condition: 'posthpp' },
                    { productid: 'SSDeli500', timestampid: 45, truckCode: '46:1', amount: 60, condition: 'posthpp' },
                    { productid: 'SVDeli500', timestampid: 45, truckCode: '46:1', amount: 3, condition: 'leaker' },
                    { productid: 'SSDeli500', timestampid: 45, truckCode: '46:1', amount: 5, condition: 'leaker' }
                ]
            }
        ];
        return of(stockTakeData.filter(item => item.batchNumber === date.toString()));
    }



}
