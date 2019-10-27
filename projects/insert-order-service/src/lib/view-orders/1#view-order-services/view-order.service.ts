import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IViewRoutesData } from './view-order-interface';
import { InsertOrderData$Service } from '../../insert-order/1#insert-order-services/insert-order-data$.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { tap, concatMap, switchMap, map } from 'rxjs/operators';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { OrderGraphqlApiService } from '../../#sharedServices/order-graphql-api.service';
import { ViewOrderData$Service } from './view-order-data$.service';

@Injectable({
    providedIn: 'root'
})
export class ViewOrderService {

    currentRoutes: IRoute[];

    constructor(private insertOrderData$Service: InsertOrderData$Service,
        private viewOrderData$Service: ViewOrderData$Service,
        private getDateService: GetDate$Service,
        private orderGraphqlApiService: OrderGraphqlApiService) {}

    getViewOrderInitialData(): Observable<IViewRoutesData[]> {
        return this.insertOrderData$Service.currentRoutes$.pipe(
            // extract the getRoutesData service here out of the data, and go look for the routes, and when it returns and it is
            // empty then just call it again, until it returns data
            tap(routes => this.currentRoutes = routes),
            concatMap(() => this.viewOrderData$Service.currentDatePackageForSpecificRoute$),
            concatMap(datePackage => {
                if (datePackage) {
                    return of(datePackage);
                } else {
                    return this.getDateService.currentDatePackage$;
                }
            }),
            // concatMap(() => this.getDateService.currentDatePackage$),
            switchMap(datePackage => this.getRoutesForDatePackage(datePackage)),
            map(orders => this.calculateRoutesAndTotalAmounts(orders)),
            map(routes => this.addRouteNamesToRoutes(routes, this.currentRoutes)),
            tap(namedRoutes => this.viewOrderData$Service.setDailyRoutes(namedRoutes)),
        );
    }

    getRoutesForDatePackage(datePackage: IDate): Observable<IOrderDetails[]> {
        return this.orderGraphqlApiService.getRoutesForDatePackage_minimalData(datePackage);
    }

    calculateRoutesAndTotalAmounts(orders: IOrderDetails[]): IViewRoutesData[] {
        if (orders.length) {
            const  routesSmallData: IViewRoutesData[] =
                [{  routeid: orders[orders.length - 1].routeid, routeName: null,
                    routeAmountTotal: null, routeAmountPercentage: null}];
            while (orders.length > 0) {
                let flag: boolean;
                const lastOrder: IOrderDetails = orders.pop();
                for (let route = 0; route < routesSmallData.length; route++) {
                    if (lastOrder.routeid === routesSmallData[route].routeid) {
                        routesSmallData[route].routeAmountTotal += lastOrder.orderTotalAmount;
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    routesSmallData.push({routeid: lastOrder.routeid, routeName: null,
                    routeAmountTotal: lastOrder.orderTotalAmount, routeAmountPercentage: null});
                }
            }
            return routesSmallData;
        }
    }

    addRouteNamesToRoutes(routes: IViewRoutesData[], currentRoutes: IRoute[]): IViewRoutesData[] {
        if (routes && currentRoutes) {
            routes.forEach(route => {
                route.routeName = currentRoutes.find(currRoute => currRoute.routeid === route.routeid).routeName;
            });
        }
        return routes;
    }

    getTotalDailyWeightAndRoutePercentage(routes: IViewRoutesData[]): number {
        if (routes) {
            let totalWeightForDay = 0;
            routes.forEach(route => totalWeightForDay += route.routeAmountTotal);
            routes.forEach(route => route.routeAmountPercentage = (route.routeAmountTotal / totalWeightForDay * 100).toFixed(2));
            return totalWeightForDay;
        }
    }

}

