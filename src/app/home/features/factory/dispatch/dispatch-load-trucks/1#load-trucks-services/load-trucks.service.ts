import { Injectable } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { LoadTrucksApiService } from './load-trucks-api.service';
import {
    IDispatchStockSideBySide,
    IStockSingleProduct,
    IBasicRoute,
    IRouteWithTrucks,
    ISingleTruckOrder,
    IRouteClient,
    IRouteWorkingTree,
} from '../../$dispatch-services/dispatch-interface';
import { tap, map, take } from 'rxjs/operators';
import { LoadTrucksInfoService } from './load-trucks-info.service';

@Injectable({
    providedIn: 'root'
})
export class LoadTrucksService {

    private meatriteStock = new BehaviorSubject<IStockSingleProduct[]>(null);
    currentMeatriteStock$ = this.meatriteStock.asObservable();
    private routeWithTrucks = new BehaviorSubject<IRouteWithTrucks>(null);
    currentrouteWithTrucks$ = this.routeWithTrucks.asObservable();

    constructor(
        private loadTrucksApiService: LoadTrucksApiService,
        private loadTruckInfoService: LoadTrucksInfoService
    ) { }

    getDailyRoutes(datePackage: IDate): Observable<IBasicRoute[]> {
        return this.loadTrucksApiService.getDailyRoutes(datePackage).pipe();
    }

    getInitialTemplateData(): Observable<any> {
        const getMeatriteStock$ = this.currentMeatriteStock$;
        const getrouteWithTrucks$ = this.currentrouteWithTrucks$;
        return combineLatest([getMeatriteStock$, getrouteWithTrucks$]).pipe(
        );
    }

    refreshMeatriteStock(): Observable<IStockSingleProduct[]> {
        return this.loadTrucksApiService.getMeatriteStock().pipe(
            take(1),
            tap(data => this.meatriteStock.next(data)),
        );
    }

    refreshRouteSelection(route: IBasicRoute) {
        let routeWithTrucks: IRouteWithTrucks;
        this.loadTrucksApiService.getRouteTrucks(route).pipe(
            take(1),
            tap(data => {
                routeWithTrucks = Object.assign(route);
                routeWithTrucks.trucks = data;
            }),
            tap(() => this.routeWithTrucks.next(routeWithTrucks)),
            tap(() => this.loadTruckInfoService.setTruck(routeWithTrucks.trucks[0]))
        ).subscribe();
    }

    putStockSideBySide(stockOnHand: IStockSingleProduct[], stockRequired: IStockSingleProduct[]): IDispatchStockSideBySide[] {
        console.log('Alfa = ', stockOnHand, stockRequired);
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

    changeMeatriteStock(changedMRStock: IStockSingleProduct, amount: number) {
        this.currentMeatriteStock$.pipe(
            take(1),
            map(data => this.changeMeatriteStock2(data, changedMRStock, amount)),
            tap(data => this.meatriteStock.next(JSON.parse(JSON.stringify(data))))
        ).subscribe();
    }

    private changeMeatriteStock2(
        meatritStock: IStockSingleProduct[], changedStock: IStockSingleProduct, amount: number): IStockSingleProduct[] {
        meatritStock.map(product => {
            if (product.productid === changedStock.productid) {
                product.batchAmounts.map(batch => {
                    if (batch.batchNumber === changedStock.batchAmounts[0].batchNumber) {
                        batch.amount = batch.amount - amount;
                    }
                });
            }
        });
        return meatritStock;
    }

    // changeRouteOrderStockRequired(changedStockRoute: IRouteWithTrucks, amount: number) {
    changeRouteOrderStockRequired(routeWorkingTree: IRouteWorkingTree, amount: number) {
        const order: IStockSingleProduct = {amount: 3, amountLoaded: 0, loadingStatus: false, productName: 'sv500', productid: 1};
        const client: IRouteClient = {clientName: 'adfa', clientid: 345, deliveryRanking: 2,
            invoiceNumber: 2345345, loadingStatus: false, productOrders: [order]};
        const truck: ISingleTruckOrder = {clients: [client], departureTime: '123', driver: 'Driver1',
            loadingStatus: false, totalProductOnTruck: [], truckID: 'asfasf', truckName: 'asdfa', truckNr: 1, truckid: 567 };
        // const amount = 1;
        const changedStockRoute: IRouteWithTrucks = {
            routeName: 'PnP', routeid: 154, routeID: 'sgsdhd', timestampID: 'sdfgsdf', timestampid: 234,
            trucks: [truck] };
        const dummyRoute: IRouteWorkingTree = {truckNumber: 0, clientNumber: 0, productNumber: 0};
        this.currentrouteWithTrucks$.pipe(
            take(1),
            map(data => this.changeRouteOrderStockRequired2(data, routeWorkingTree, amount)),
            tap(data => this.routeWithTrucks.next(JSON.parse(JSON.stringify(data))))
        ).subscribe();
    }

    // changeRouteOrderStockRequired(changedRouteOrderStock: IRouteWithTrucks, amount: number) {
    changeRouteOrderStockRequired2(
        cr: IRouteWithTrucks, wt: IRouteWorkingTree, amount: number): IRouteWithTrucks {
            cr.trucks[wt.truckNumber].clients[wt.clientNumber].productOrders[wt.productNumber].amountLoaded =
            cr.trucks[wt.truckNumber].clients[wt.clientNumber].productOrders[wt.productNumber].amountLoaded + amount;
            if (cr.trucks[wt.truckNumber].clients[wt.clientNumber].productOrders[wt.productNumber].amountLoaded ===
                cr.trucks[wt.truckNumber].clients[wt.clientNumber].productOrders[wt.productNumber].amount) {
                cr.trucks[wt.truckNumber].clients[wt.clientNumber].productOrders[wt.productNumber].loadingStatus = true;
            } else {
                cr.trucks[wt.truckNumber].clients[wt.clientNumber].productOrders[wt.productNumber].loadingStatus = false;
            }
        // console.log('* * * * 3 Returning amount = ', cr.trucks[0].clients);
        return cr;
    }

    removeExtraBatches(sideBySideStock: IDispatchStockSideBySide[]): IDispatchStockSideBySide[] {
        const newSideBySideStock: IDispatchStockSideBySide[] = JSON.parse(JSON.stringify(sideBySideStock));
        newSideBySideStock.map(product => {
            let currentAmount = 0;
            const newStockOnHand = product.stockOnHand;
            for (let index = 0; index < product.stockOnHand.batchAmounts.length; index++) {
                currentAmount = currentAmount + product.stockOnHand.batchAmounts[index].amount;
                if (currentAmount >= product.stockRequired.amount) {
                    newStockOnHand.batchAmounts.length = index + 1;
                }
            }
        });
        return newSideBySideStock;
    }

}
