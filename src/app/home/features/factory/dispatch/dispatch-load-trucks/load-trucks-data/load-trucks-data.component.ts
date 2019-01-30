import { Component, OnInit, OnDestroy } from '@angular/core';
import {    IDispatchStockDataMain, IRouteOrder, IDailyRoutes,
            ITestRouteOrder, IRouteTemplateData, IRouteOrderClient } from '../../$dispatch-services/dispatch-interface';
import { Subscription } from 'rxjs';
import { concatMap, tap, take, map } from 'rxjs/operators';
import { LoadTrucksService } from '../load-trucks-services/load-trucks.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';

@Component({
    selector: 'app-load-trucks-data',
    templateUrl: './load-trucks-data.component.html',
    styleUrls: ['./load-trucks-data.component.scss']
})
export class LoadTrucksDataComponent implements OnInit, OnDestroy {


    // dispatchMainData: IDispatchStockDataMain;
    templateData: IRouteTemplateData;
    subscription: Subscription;
    routes: IDailyRoutes[];
    routeData: IDispatchStockDataMain;
    clientData: IRouteOrderClient;
    showLoadTruckTemplate: boolean;

    constructor(private loadTrucksService: LoadTrucksService, private getDatePackage: GetDate$Service) { }

    ngOnInit() {
        this.getDailyRoutes();
    }

    getDailyRoutes() { // we get too much data here, need only routeName, routeid, and routeID
        this.getDatePackage.currentDatePackage$.pipe(
            take(1),
            concatMap(datePackage => this.loadTrucksService.getDailyRoutes(datePackage)),
        ).subscribe(data => this.routes = data);
    }

    getDailyHppStockData(routeid: string) {
        this.showLoadTruckTemplate = false;
        const routeObject = this.getRouteObject(parseInt(routeid, 10));
        const getTimePackage$ = this.getDatePackage.currentDatePackage$;
        getTimePackage$.pipe(
            take(1),  // If routes don't change with new date, then this might be the reason (but create Sub variable)
            concatMap((datePackage) => this.loadTrucksService.getHppOrders(routeObject, datePackage)),
            tap(data => this.routeData = data),
            map(data => this.normalizeData(data))
        ).subscribe(data => this.templateData = data);
    }

    getRouteObject(routeid: number): IDailyRoutes {
        return this.routes.find((route) => route.routeid === routeid);
    }

    normalizeData(data: IDispatchStockDataMain): IRouteTemplateData {
        let routeTemplateData: IRouteTemplateData;
        if (data.routeData.trucks.length > 1) {
            routeTemplateData = { routeName: data.routeData.routeName, prodductTotal: data.routeData.totalProductOnAllTrucks,
            totalTrucks: data.routeData.trucks.length, meatriteStock: data.meatriteStock, showLoadTruckTemplate: false };
        } else {
            routeTemplateData = {
            routeName: data.routeData.routeName,
            prodductTotal: data.routeData.trucks[0].totalProductOnTruck, showLoadTruckTemplate: false,
            totalTrucks: 1, meatriteStock: data.meatriteStock, clients: data.routeData.trucks[0].clients };
        }
        console.log('Here is the template data that is available ', routeTemplateData);
        return routeTemplateData;
    }

    reloadTruck(truckNumber: number): IRouteTemplateData {
        const data = this.routeData;
        let routeTemplateData: IRouteTemplateData;
        if (truckNumber === -1) {
            routeTemplateData = { routeName: data.routeData.routeName,
            prodductTotal: data.routeData.totalProductOnAllTrucks, showLoadTruckTemplate: false,
            totalTrucks: data.routeData.trucks.length, meatriteStock: data.meatriteStock };
        } else {
            routeTemplateData = {
            routeName: data.routeData.trucks[truckNumber].truckName,
            prodductTotal: data.routeData.trucks[truckNumber].totalProductOnTruck, showLoadTruckTemplate: false,
            totalTrucks: data.routeData.trucks.length, meatriteStock: data.meatriteStock,
            clients: data.routeData.trucks[truckNumber].clients };
        }
        console.log('Here is the template data that is available ', routeTemplateData);
        return routeTemplateData;
    }

    loadTruck(truckNumber) {
        this.showLoadTruckTemplate = false;
        this.templateData = this.reloadTruck(truckNumber);
    }

    loadClient(clientInfo: IRouteOrderClient) {
        this.clientData = clientInfo;
        this.showLoadTruckTemplate = true;
    }

    ngOnDestroy(): void {
        // if (this.subscription) {
        //     this.subscription.unsubscribe();
        // }
    }


}
