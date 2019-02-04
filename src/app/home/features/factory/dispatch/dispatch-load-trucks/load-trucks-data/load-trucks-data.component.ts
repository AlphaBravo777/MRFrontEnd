import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDispatchStockDataMain, IRouteTemplateData, IRouteID, IDailyRoutes } from '../../$dispatch-services/dispatch-interface';
import { Subscription, of, Observable, Subscriber } from 'rxjs';
import { concatMap, tap, take, map, switchMap } from 'rxjs/operators';
import { LoadTrucksService } from '../load-trucks-services/load-trucks.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

@Component({
    selector: 'app-load-trucks-data',
    templateUrl: './load-trucks-data.component.html',
    styleUrls: ['./load-trucks-data.component.scss']
})
export class LoadTrucksDataComponent implements OnInit, OnDestroy {


    templateData: IRouteTemplateData;
    subscription: Subscription;
    dailyRoutes: IRouteID[];
    routeData: IDispatchStockDataMain;

    constructor(private loadTrucksService: LoadTrucksService, private getDatePackage: GetDate$Service) { }

    ngOnInit() {
        this.getDailyRoutes();
    }

    getDailyRoutes() {
        this.subscription = this.getDatePackage.currentDatePackage$.pipe(
            concatMap(datePackage => this.loadTrucksService.getDailyRoutes(datePackage)),
        ).subscribe(data => this.dailyRoutes = data);
    }

    getDailyHppStockData(routeid: string) {
        const routeObject = this.getRouteObject(parseInt(routeid, 10));
        const getTimePackage$ = this.getDatePackage.currentDatePackage$;
        getTimePackage$.pipe(
            take(1),  // If routes don't change with new date, then this might be the reason (but create Subcribe variable)
            concatMap((datePackage) => this.loadTrucksService.getHppOrders(routeObject, datePackage)),
            tap(data => this.routeData = data),
            map(data => this.normalizeData(data))
        ).subscribe(data => this.templateData = data);
    }

    getRouteObject(routeid: number): IRouteID {
        return this.dailyRoutes.find((route) => route.routeid === routeid);
    }

    normalizeData(data: IDispatchStockDataMain): IRouteTemplateData {
        let routeTemplateData: IRouteTemplateData;
        if (data.routeData.trucks.length > 1) {
            routeTemplateData = {
                routeName: data.routeData.routeName, prodductTotal: data.routeData.totalProductOnAllTrucks,
                totalTrucks: data.routeData.trucks.length, meatriteStock: data.meatriteStock, showLoadTruckTemplate: false
            };
        } else {
            routeTemplateData = {
                routeName: data.routeData.routeName,
                prodductTotal: data.routeData.trucks[0].totalProductOnTruck, showLoadTruckTemplate: false,
                totalTrucks: 1, meatriteStock: data.meatriteStock, clients: data.routeData.trucks[0].clients
            };
        }
        console.log('Here is the template data that is available ', routeTemplateData);
        return routeTemplateData;
    }

    reloadTruck(truckNumber: number): IRouteTemplateData {
        const data = this.routeData;
        let routeTemplateData: IRouteTemplateData;
        if (truckNumber === -1) {
            routeTemplateData = {
                routeName: data.routeData.routeName,
                prodductTotal: data.routeData.totalProductOnAllTrucks, showLoadTruckTemplate: false,
                totalTrucks: data.routeData.trucks.length, meatriteStock: data.meatriteStock
            };
        } else {
            routeTemplateData = {
                routeName: data.routeData.trucks[truckNumber].truckName,
                prodductTotal: data.routeData.trucks[truckNumber].totalProductOnTruck, showLoadTruckTemplate: false,
                totalTrucks: data.routeData.trucks.length, meatriteStock: data.meatriteStock,
                clients: data.routeData.trucks[truckNumber].clients
            };
        }
        console.log('Here is the template data that is available ', routeTemplateData);
        return routeTemplateData;
    }

    loadTruck(truckNumber) {
        this.templateData = this.reloadTruck(truckNumber);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            console.log('Dispatch routes is unsubscribing');
            this.subscription.unsubscribe();
        }
    }


}
