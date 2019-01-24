import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { LoadTrucksApiService } from './load-trucks-api.service';
import {
    IRouteOrder,
    IDispatchStockDataMain,
    IDispatchStockSideBySide,
    IStockSingleProduct,
    IDailyRoutes,
    IRouteIDWithTruckID,
    ITestRouteOrder,
    ITestTruck
} from '../../$dispatch-services/dispatch-interface';
import { switchMap, tap, map } from 'rxjs/operators';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';

@Injectable({
    providedIn: 'root'
})
export class LoadTrucksService {


    constructor(private loadTrucksApiService: LoadTrucksApiService, private toolBox: ToolboxGroupService) {
    }

    getHppOrders(routeData: IDailyRoutes, datePackage: IDate): Observable<IDispatchStockDataMain> {
        const meatriteStock$ = this.loadTrucksApiService.getMeatriteStock();
        const routeOrders$ = this.loadTrucksApiService.getRouteOrders(routeData, datePackage);
        const mainData$ = combineLatest([meatriteStock$, routeOrders$]);
        return mainData$.pipe(
            map(data => {
                return { meatriteStock: data[0], routeData: this.normalizeRouteData(data[1]) };
            }),
        );
    }

    normalizeRouteData(dailyRoutes: IRouteOrder[]): ITestRouteOrder {

        function addStockTogether(): IStockSingleProduct[] {
            const totalRouteStock: IStockSingleProduct[] = [];
            for (let route = 0; route < dailyRoutes.length; route++) {
                for (let product = 0; product < dailyRoutes[route].productTotals.length; product++) {
                    const prodid = dailyRoutes[route].productTotals[product].productid;
                    const prodAmount = dailyRoutes[route].productTotals[product].amount;
                    const stockExistsIndex = totalRouteStock.findIndex(prod => prod.productid === prodid);
                    if (stockExistsIndex !== -1) {
                        totalRouteStock[stockExistsIndex].amount = totalRouteStock[stockExistsIndex].amount + prodAmount;
                    } else {
                        totalRouteStock.push(Object.assign({}, dailyRoutes[route].productTotals[product]));
                    }
                }
            }
            return totalRouteStock;
        }

        if (dailyRoutes.length > 1) {
            const routeTruck: ITestTruck[] = [];
            for (let route = 0; route < dailyRoutes.length; route++) {
                const testRouteTruck: ITestTruck = {
                    orderID: dailyRoutes[route].orderID, orderid: dailyRoutes[route].orderid, clients: dailyRoutes[route].clients,
                    truckNumber: dailyRoutes[route].truckNr, truckName: dailyRoutes[route].truckName, loadingStatus: false,
                    totalProductOnTruck: dailyRoutes[route].productTotals
                };
                routeTruck.push(testRouteTruck);
            }
            const routeHead: ITestRouteOrder = {
                routeID: dailyRoutes[0].routeID, routeName: dailyRoutes[0].routeName, routeid: dailyRoutes[0].routeid,
                timestampID: dailyRoutes[0].timestampID, timestampid: dailyRoutes[0].timestampid, trucks: routeTruck,
                totalProductOnAllTrucks: addStockTogether(), loadingStatus: false
            };
            return routeHead;
        } else {
            const routeTruck: ITestTruck[] = [{
                orderID: dailyRoutes[0].orderID, orderid: dailyRoutes[0].orderid, clients: dailyRoutes[0].clients,
                truckNumber: dailyRoutes[0].truckNr, truckName: dailyRoutes[0].truckName,
                totalProductOnTruck: dailyRoutes[0].productTotals, loadingStatus: false
            }];
            const routeHead: ITestRouteOrder = {
                routeID: dailyRoutes[0].routeID, routeName: dailyRoutes[0].routeName, routeid: dailyRoutes[0].routeid,
                timestampID: dailyRoutes[0].timestampID, timestampid: dailyRoutes[0].timestampid, trucks: routeTruck,
                loadingStatus: false
            };
            return routeHead;
        }
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

    getDailyRoutes(datePackage: IDate): Observable<IDailyRoutes[]> {
        return this.loadTrucksApiService.getDailyRoutes(datePackage).pipe(
            map(data => this.toolBox.removeObjectsWithDuplicatePropertiesInArray(data, 'routeName')),
            // map(data => this.putTrucksOfSameRouteTogether(data)),
        );
    }

    putTrucksOfSameRouteTogether(routes: IRouteIDWithTruckID[]): IDailyRoutes[] {
        const dailyRoutesWithTrucksInside: IDailyRoutes[] = [];
        while (routes.length > 0) {
            const sameRoutes: IRouteIDWithTruckID[] = routes.filter(route => routes[0].routeid === route.routeid);
            const routeObject: IDailyRoutes = {
                routeName: routes[0].routeName, routeID: routes[0].routeID,
                routeid: routes[0].routeid, numberOfTrucks: sameRoutes
            };
            dailyRoutesWithTrucksInside.push(routeObject);
            routes = routes.filter(route => routes[0].routeid !== route.routeid);
        }
        // console.log('Here are the well ordered routes now: ', dailyRoutesWithTrucksInside);
        return dailyRoutesWithTrucksInside;
    }

}
