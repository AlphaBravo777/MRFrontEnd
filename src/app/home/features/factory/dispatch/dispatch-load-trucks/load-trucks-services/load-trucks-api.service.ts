import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStockSingleProduct, IRouteOrder, IDailyRoutes, IRouteIDWithTruckID } from '../../$dispatch-services/dispatch-interface';
import { map, tap } from 'rxjs/operators';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

@Injectable({
  providedIn: 'root'
})
export class LoadTrucksApiService {

    constructor(
        private urlService: UrlsService,
        private http: HttpClient,
        ) { }

    getMeatriteStock(): Observable<IStockSingleProduct[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/meatriteStock.json').pipe(
            map(data => data.meatriteStock)
        );
    }

    getRouteOrders(routeData: IDailyRoutes, datePackage: IDate): Observable<IRouteOrder> {
        return this.http.get<any>('assets/mockData/meatriteStock/routesOrders.json').pipe(
            map(data => {   // Here we just get all the route data (can't filter JSON),
                            // and then filter to resemble an api call with parameters
                return data.routeData.filter(route => route.routeid === routeData.routeid && route.timestampID === datePackage.nodeID);
            }),
        );
    }

    getDailyRoutes(datePackage: IDate): Observable<IRouteIDWithTruckID[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/routesOrders.json').pipe(
            // Here we must only return the route names, so it will be a different GraphQL query (a short one)
            map(data => {
                console.log('Alpha = ', data, datePackage.nodeID);
                const routeOrders: IRouteOrder[] = data.routeData.filter(route => route.timestampID === datePackage.nodeID);
                const dailyRoutes: IRouteIDWithTruckID[] = routeOrders.map(route => {
                    return {routeid: route.routeid, routeID: route.routeID, routeName: route.routeName,
                        truckNr: route.truckNr, orderID: route.orderID, orderid: route.orderid
                    };
                });
                console.log('Here are the daily routes = ', dailyRoutes);
                return dailyRoutes;
            }),
        );
    }

}
