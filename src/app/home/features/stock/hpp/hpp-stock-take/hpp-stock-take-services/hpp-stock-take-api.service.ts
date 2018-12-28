import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HppStockTakeApiService {

    constructor() { }

    // The idea was to make a window showing all the products in the chain, from what is at meatrite, to what is pre-hpp
    // then post-hpp, then what is the actual pnp order, and then what will be left after that.

    getPnPDailyOrder(): Observable<any[]> {
        const pnpDailyOrder = [
            {productid: 'SVDeli500', timestampid: 42, amount: '30'},
            {productid: 'SSDeli500', timestampid: 42, amount: '40'},
            {productid: 'SVDeli500', timestampid: 43, amount: '20'},
            {productid: 'SSDeli500', timestampid: 43, amount: '50'},
            {productid: 'SVDeli500', timestampid: 44, amount: '70'},
            {productid: 'SSDeli500', timestampid: 44, amount: '30'},
            {productid: 'SVDeli500', timestampid: 45, amount: '90'},
            {productid: 'SSDeli500', timestampid: 45, amount: '80'},
           ];
       return of(pnpDailyOrder);
    }

    getHppStockAvailable(): Observable<any[]> {
        const stockTakeData = [
             {productid: 'SVDeli500', timestampid: 43, truckCode: '46:1', amount: '40', condition: 'prehpp' },
             {productid: 'SSDeli500', timestampid: 43, truckCode: '46:1', amount: '60', condition: 'prehpp' },
             {productid: 'SVDeli500', timestampid: 43, truckCode: '46:1', amount: '40', condition: 'posthpp' },
             {productid: 'SSDeli500', timestampid: 43, truckCode: '46:1', amount: '60', condition: 'posthpp' },
             {productid: 'SVDeli500', timestampid: 43, truckCode: '46:1', amount: '3', condition: 'leaker' },
             {productid: 'SSDeli500', timestampid: 43, truckCode: '46:1', amount: '5', condition: 'leaker' },
             {productid: 'SVDeli500', timestampid: 44, truckCode: '46:1', amount: '40', condition: 'prehpp' },
             {productid: 'SSDeli500', timestampid: 44, truckCode: '46:1', amount: '60', condition: 'prehpp' },
             {productid: 'SVDeli500', timestampid: 44, truckCode: '46:1', amount: '40', condition: 'posthpp' },
             {productid: 'SSDeli500', timestampid: 44, truckCode: '46:1', amount: '60', condition: 'posthpp' },
             {productid: 'SVDeli500', timestampid: 44, truckCode: '46:1', amount: '3', condition: 'leaker' },
             {productid: 'SSDeli500', timestampid: 44, truckCode: '46:1', amount: '5', condition: 'leaker' },
             {productid: 'SVDeli500', timestampid: 45, truckCode: '46:1', amount: '40', condition: 'prehpp' },
             {productid: 'SSDeli500', timestampid: 45, truckCode: '46:1', amount: '60', condition: 'prehpp' },
             {productid: 'SVDeli500', timestampid: 45, truckCode: '46:1', amount: '40', condition: 'posthpp' },
             {productid: 'SSDeli500', timestampid: 45, truckCode: '46:1', amount: '60', condition: 'posthpp' },
             {productid: 'SVDeli500', timestampid: 45, truckCode: '46:1', amount: '3', condition: 'leaker' },
             {productid: 'SSDeli500', timestampid: 45, truckCode: '46:1', amount: '5', condition: 'leaker' },
            ];
        return of(stockTakeData);
    }

    getMeatriteStockAvailable(): Observable<any[]> {
        const meatriteStock = [
             {productid: 'CCV1', amount: '30'}
            ];
        return of(meatriteStock);
    }

}
