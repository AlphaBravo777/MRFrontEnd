import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStockSingleProduct, ISingleTruckOrder, IBasicRoute, IRouteOrderClient } from '../../$dispatch-services/dispatch-interface';
import { map, tap } from 'rxjs/operators';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';

@Injectable({
    providedIn: 'root'
})
export class LoadTrucksApiService {

    constructor(private http: HttpClient, private toolBox: ToolboxGroupService) { }

    getMeatriteStock(): Observable<IStockSingleProduct[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/meatriteStock.json').pipe(
            map(data => data.meatriteStock)
        );
    }

    getRouteTrucks(routeData: IBasicRoute): Observable<ISingleTruckOrder[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/dailyTrucks.json').pipe(
            tap(data => console.log('Here is all the dailyTrucks: ', data)),
            map(data => {   // Here we just get all the route data (can't filter JSON),
                // and then filter to resemble an api call with parameters
                return data.trucks.filter(route => route.routeid === routeData.routeid);
            }),
            map(data => this.addTruckStockTogether(data))
        );
    }

    addTruckStockTogether(trucks: ISingleTruckOrder[]): ISingleTruckOrder[] {
        for (let truck = 0; truck < trucks.length; truck++) {
            trucks[truck].totalProductOnTruck = this.addStockTogether(trucks[truck].clients);
        }
        return trucks;
    }

    addStockTogether(clients: IRouteOrderClient[]): IStockSingleProduct[] {
        const totalStock: IStockSingleProduct[] = [];
        for (let client = 0; client < clients.length; client++) {
            for (let product = 0; product < clients[client].orders.length; product++) {
                const prodid = clients[client].orders[product].productid;
                const prodAmount = clients[client].orders[product].amount;
                const stockExistsIndex = totalStock.findIndex(prod => prod.productid === prodid);
                if (stockExistsIndex !== -1) {
                    totalStock[stockExistsIndex].amount = totalStock[stockExistsIndex].amount + prodAmount;
                } else {
                    totalStock.push(Object.assign({}, clients[client].orders[product]));
                }
            }
        }
        console.log('I do not know what this will be', totalStock);
        return totalStock;
    }

    getDailyRoutes(datePackage: IDate): Observable<IBasicRoute[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/dailyRoutes.json').pipe(
            // Here we must only return the route names, so it will be a different GraphQL query (a short one)
            // But now we get ALL the routes, then we filter for only the one that we want
            map(data => {
                const routeOrders: IBasicRoute[] = data.routeData.filter(route => route.timestampID === datePackage.nodeID);
                const dailyRoutes: IBasicRoute[] = routeOrders.map(route => {
                    return {
                        routeid: route.routeid, routeID: route.routeID, routeName: route.routeName,
                        timestampid: route.timestampid, timestampID: route.timestampID
                    };
                });
                console.log('Here are the daily routes = ', dailyRoutes);
                return dailyRoutes;
            }),
            // If there are more than two trucks, it will have two objects with the same route, so remove one.
            // map(data => this.toolBox.removeObjectsWithDuplicatePropertiesInArray(data, 'routeName')),
            map(data => this.toolBox.removeObjectsWithDuplicatePropertiesInArray(data, 'routeName')),
        );
    }

}
