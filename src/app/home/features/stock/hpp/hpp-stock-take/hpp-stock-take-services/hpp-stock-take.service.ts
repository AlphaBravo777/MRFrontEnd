import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HppStockTakeApiService } from './hpp-stock-take-api.service';
import { take, switchMap, tap, map, concatMap } from 'rxjs/operators';
import { IHppProducts, IHppStockDataMain } from './hpp-stock-interface';

@Injectable({
    providedIn: 'root'
})
export class HppStockTakeService {

    private testDate = new BehaviorSubject<number>(43);
    currentTestDate$ = this.testDate.asObservable();

    constructor(private hppStockTakeApi: HppStockTakeApiService) {
    }

    getHppOrders(): Observable<IHppStockDataMain> {
        const hppStockDataMain: IHppStockDataMain = {};
        let stockDate: number;
        return this.currentTestDate$.pipe(
            tap(data => stockDate = data),
            concatMap(() => this.hppStockTakeApi.getPnPDailyOrder(stockDate)),
            tap(data => hppStockDataMain.pnpOrder = data),
            concatMap(() => this.hppStockTakeApi.getHppStockAvailable(stockDate)),
            tap(data => hppStockDataMain.hppStock = data),
            map(() => hppStockDataMain)
        );
    }

    changeTestDate(newDate: number) {
        this.testDate.next(newDate);
    }
}
