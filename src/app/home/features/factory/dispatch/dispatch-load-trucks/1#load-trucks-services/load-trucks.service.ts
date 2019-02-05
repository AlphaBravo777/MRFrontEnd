import { Injectable } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { LoadTrucksApiService } from './load-trucks-api.service';
import {
    IDispatchStockDataMain,
    IDispatchStockSideBySide,
    IStockSingleProduct,
    IBasicRoute,
} from '../../$dispatch-services/dispatch-interface';
import { tap, map, take } from 'rxjs/operators';

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

    getInitialTemplateData(): Observable<IDispatchStockDataMain> {
        const getMeatriteStock$ = this.currentMeatriteStock$;
        const getRouteOrders$ = this.currentRouteOrders$;
        return combineLatest([getMeatriteStock$, getRouteOrders$]).pipe(
            tap((data) => console.log('getTemplateData = ', data)),
            map(data => {
                return { meatriteStock: data[0], route: data[1] };
            }),
            // map(data => this.normalizeData(data))
        );
    }

    refreshMeatriteStock(): Observable<IStockSingleProduct[]> {
        return this.loadTrucksApiService.getMeatriteStock().pipe(
            take(1),
            tap(data => this.meatriteStock.next(data)),
        );
    }

    refreshRouteSelection(route: IBasicRoute): Observable<IBasicRoute> { // See if this can not just be a function
        return this.loadTrucksApiService.getRouteTrucks(route).pipe(
            take(1),
            tap(data => route.trucks = data),
            map(() => route),
            tap(() => console.log('The refreshed route data = ', route)),
            tap(() => this.routeOrders.next(route)),
        );
    }

    // createTemplateDataPackage(data: IDispatchStockDataMain): IDispatchStockDataMain {
    //     if (!data.meatriteStock || !data.routeData) {
    //         return null;
    //     }

    //     let routeTemplateData: IDispatchStockDataMain;
    //     if (data.routeData.trucks.length > 1) {
    //         routeTemplateData = {
    //             routeName: data.routeData.routeName, prodductTotal: data.routeData.totalProductOnAllTrucks,
    //             totalTrucks: data.routeData.trucks.length, meatriteStock: data.meatriteStock, showLoadTruckTemplate: false
    //         };
    //     } else {
    //         routeTemplateData = {
    //             routeName: data.routeData.routeName,
    //             prodductTotal: data.routeData.trucks[0].totalProductOnTruck, showLoadTruckTemplate: false,
    //             totalTrucks: 1, meatriteStock: data.meatriteStock, clients: data.routeData.trucks[0].clients
    //         };
    //     }
    //     console.log('Here is the template data that is available ', routeTemplateData);
    //     return routeTemplateData;
    // }

    // getHppOrders(routeData: IBasicRouteID, datePackage: IDate): Observable<IDispatchStockDataMain> {  // should depricate
    //     const meatriteStock$ = this.loadTrucksApiService.getMeatriteStock();
    //     const routeOrders$ = this.loadTrucksApiService.getRouteOrders(routeData, datePackage);
    //     const mainData$ = combineLatest([meatriteStock$, routeOrders$]);
    //     return mainData$.pipe(
    //         map(data => {
    //             return { meatriteStock: data[0], routeData: this.normalizeRouteData(data[1]) };
    //         }),
    //     );
    // }

    // normalizeRouteData(dailyRoutes: ISingleTruckOrder[]): IRouteWithTrucks {
    //     // This function takes all the trucks for a route, and adds it together to make one route with trucks in them
    //     if (!dailyRoutes) {
    //         return null;
    //     }

    //     function addStockTogether(): IStockSingleProduct[] {
    //         const totalRouteStock: IStockSingleProduct[] = [];
    //         for (let route = 0; route < dailyRoutes.length; route++) {
    //             for (let product = 0; product < dailyRoutes[route].totalProductOnTruck.length; product++) {
    //                 const prodid = dailyRoutes[route].totalProductOnTruck[product].productid;
    //                 const prodAmount = dailyRoutes[route].totalProductOnTruck[product].amount;
    //                 const stockExistsIndex = totalRouteStock.findIndex(prod => prod.productid === prodid);
    //                 if (stockExistsIndex !== -1) {
    //                     totalRouteStock[stockExistsIndex].amount = totalRouteStock[stockExistsIndex].amount + prodAmount;
    //                 } else {
    //                     totalRouteStock.push(Object.assign({}, dailyRoutes[route].totalProductOnTruck[product]));
    //                 }
    //             }
    //         }
    //         return totalRouteStock;
    //     }

    //     if (dailyRoutes.length > 1) {
    //         const routeTruck: ISingleTruckOrder[] = [];
    //         for (let route = 0; route < dailyRoutes.length; route++) {
    //             const testRouteTruck: ISingleTruckOrder = {
    //                 orderID: dailyRoutes[route].orderID, orderid: dailyRoutes[route].orderid, clients: dailyRoutes[route].clients,
    //                 truckNr: dailyRoutes[route].truckNr, truckName: dailyRoutes[route].truckName, loadingStatus: false,
    //                 totalProductOnTruck: dailyRoutes[route].totalProductOnTruck
    //             };
    //             routeTruck.push(testRouteTruck);
    //         }
    //         const routeHead: IRouteWithTrucks = {
    //             routeID: dailyRoutes[0].routeID, routeName: dailyRoutes[0].routeName, routeid: dailyRoutes[0].routeid,
    //             timestampID: dailyRoutes[0].timestampID, timestampid: dailyRoutes[0].timestampid, trucks: routeTruck,
    //             totalProductOnAllTrucks: addStockTogether(), loadingStatus: false
    //         };
    //         return routeHead;
    //     } else {
    //         console.log('Here is the data of a single Truck', dailyRoutes);
    //         const routeTruck: ISingleTruckOrder = {
    //             orderID: dailyRoutes[0].orderID, orderid: dailyRoutes[0].orderid, clients: dailyRoutes[0].clients,
    //             truckNr: dailyRoutes[0].truckNr, truckName: dailyRoutes[0].truckName,
    //             totalProductOnTruck: dailyRoutes[0].totalProductOnTruck, loadingStatus: false
    //         };
    //         const routeHead: IRouteWithTrucks = {
    //             routeID: dailyRoutes[0].routeID, routeName: dailyRoutes[0].routeName, routeid: dailyRoutes[0].routeid,
    //             timestampID: dailyRoutes[0].timestampID, timestampid: dailyRoutes[0].timestampid, trucks: routeTruck,
    //             loadingStatus: false
    //         };
    //         return routeHead;
    //     }
    // }





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







    // inputLongDate(longDate: Date): Observable<any> {
    //     return this.datePickerService.inputLongDate(longDate).pipe(
    //         take(1),
    //         tap(data => this.datePackage.next(data))
    //         );
    // }


    // putTrucksOfSameRouteTogether(routes: IRouteIDWithTruckID[]): IDailyRoutes[] {
    //     const dailyRoutesWithTrucksInside: IDailyRoutes[] = [];
    //     while (routes.length > 0) {
    //         const sameRoutes: IRouteIDWithTruckID[] = routes.filter(route => routes[0].routeid === route.routeid);
    //         const routeObject: IDailyRoutes = {
    //             routeName: routes[0].routeName, routeID: routes[0].routeID,
    //             routeid: routes[0].routeid, numberOfTrucks: sameRoutes
    //         };
    //         dailyRoutesWithTrucksInside.push(routeObject);
    //         routes = routes.filter(route => routes[0].routeid !== route.routeid);
    //     }
    //     // console.log('Here are the well ordered routes now: ', dailyRoutesWithTrucksInside);
    //     return dailyRoutesWithTrucksInside;
    // }

}
