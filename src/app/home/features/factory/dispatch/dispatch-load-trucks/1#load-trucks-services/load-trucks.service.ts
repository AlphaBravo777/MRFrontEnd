import { Injectable } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { LoadTrucksApiService } from './load-trucks-api.service';
import {
    IDispatchStockSideBySide,
    IStockSingleProduct,
    IBasicRoute,
    IRouteWithTrucks,
} from '../../$dispatch-services/dispatch-interface';
import { tap, map, take, find } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoadTrucksService {

    private meatriteStock = new BehaviorSubject<IStockSingleProduct[]>(null);
    currentMeatriteStock$ = this.meatriteStock.asObservable();
    private routeOrders = new BehaviorSubject<IBasicRoute>(null);
    currentRouteOrders$ = this.routeOrders.asObservable();

    constructor(
        private loadTrucksApiService: LoadTrucksApiService,
    ) { }

    getDailyRoutes(datePackage: IDate): Observable<IBasicRoute[]> {
        return this.loadTrucksApiService.getDailyRoutes(datePackage).pipe();
    }

    getInitialTemplateData(): Observable<any> {
        const getMeatriteStock$ = this.currentMeatriteStock$;
        const getRouteOrders$ = this.currentRouteOrders$;
        return combineLatest([getMeatriteStock$, getRouteOrders$]).pipe(
            // map(data => {
            //     return { meatriteStock: data[0], route: data[1] };
            // }),
        );
    }

    refreshMeatriteStock(): Observable<IStockSingleProduct[]> {
        return this.loadTrucksApiService.getMeatriteStock().pipe(
            take(1),
            tap(data => this.meatriteStock.next(data)),
        );
    }

    refreshRouteSelection(route: IBasicRoute) {
        this.loadTrucksApiService.getRouteTrucks(route).pipe(
            take(1),
            tap(data => route.trucks = data),
            map(() => route),
            tap(() => this.routeOrders.next(route)),
        ).subscribe();
    }

    putStockSideBySide(stockOnHand: IStockSingleProduct[], stockRequired: IStockSingleProduct[]): IDispatchStockSideBySide[] {
        const groupStockSideBySide = [];
        for (let required = 0; required < stockRequired.length; required++) {
            for (let onHand = 0; onHand < stockOnHand.length; onHand++) {
                if (stockRequired[required].productid === stockOnHand[onHand].productid) {
                    const singleStockSideBySide: IDispatchStockSideBySide = {
                        stockOnHand: stockOnHand[onHand], stockRequired: stockRequired[required]
                    };
                    groupStockSideBySide.push(singleStockSideBySide);
                    break;
                }
            }
        }
        return groupStockSideBySide;
    }

    changeMeatriteStock() {
        this.currentMeatriteStock$.pipe(
            take(1),
            map(data => this.changeMeatriteStock2(data)),
            tap(data => this.meatriteStock.next(data))
        ).subscribe();
    }

    changeMeatriteStock2(data: IStockSingleProduct[]): IStockSingleProduct[] {
        const value = {stockid: 1, amount: 15, batchNumber: '45:4'};
        data.map(product => {
            if (product.productid === value.stockid) {
                product.batchAmounts.map(batch => {
                    if (batch.batchNumber === value.batchNumber) {
                        console.log('There was a match', batch.batchNumber, product.productName);
                        batch.amount = batch.amount - value.amount;
                    }
                });
            }
        });
        console.log('The returned data = ', data);
        return data;
    }

}
