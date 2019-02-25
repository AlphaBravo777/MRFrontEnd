import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HppApiService {
    constructor(private http: HttpClient) {}

    getPnpProducts(): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/pnpProducts.json').pipe(
            map(data => data.pnpProducts),
        );
    }

    getPreHppStock(): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/hppPreHppStock.json').pipe(
            map(data => data.hppPreHppStock),
            map(data =>
                data.map(stock => {
                    stock.stockTotal = this.getTotals(stock.batches, 'amount');
                    return stock;
                })
            )
        );
    }

    getPostHppStock(): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/hppPostHppStock.json').pipe(
            map(data => data.hppPostHppStock),
            map(data =>
                data.map(stock => {
                    stock.stockTotal = this.getTotals(stock.batches, 'amount');
                    return stock;
                })
            )
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
            data.map(dataPoint => (total = total + dataPoint[property]));
            return total;
        }
    }
}
