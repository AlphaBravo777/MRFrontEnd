import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDispatchStockDataMain, IBasicRoute } from '../../$dispatch-services/dispatch-interface';
import { Subscription } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { LoadTrucksService } from '../1#load-trucks-services/load-trucks.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';

@Component({
    selector: 'app-load-trucks-data',
    templateUrl: './load-trucks-data.component.html',
    styleUrls: ['./load-trucks-data.component.scss']
})
export class LoadTrucksDataComponent implements OnInit, OnDestroy {


    templateData: IDispatchStockDataMain;
    dailyRoutes: IBasicRoute[];
    // routeData: IDispatchStockDataMain;
    subscription: Subscription;
    subscription2: Subscription;

    constructor(private loadTrucksService: LoadTrucksService, private getDatePackage: GetDate$Service) { }

    ngOnInit() {
        this.getDailyRoutes();
        this.getInitialTemplateData();
    }

    getDailyRoutes() {  // Used
        this.subscription = this.getDatePackage.currentDatePackage$.pipe(
            concatMap(datePackage => this.loadTrucksService.getDailyRoutes(datePackage)),
        ).subscribe(data => this.dailyRoutes = data);
    }

    getInitialTemplateData() {   // Used
        this.subscription2 = this.loadTrucksService.getInitialTemplateData().pipe(
        ).subscribe(data => this.templateData = data);
    }

    refreshRouteSelection(routeid: string) {   // Used
        const routeObject = this.getRouteObject(parseInt(routeid, 10));
        this.loadTrucksService.refreshRouteSelection(routeObject).pipe(
            tap(() => {
                // console.log('The templatedata = ', this.templateData);
                if (this.templateData.meatriteStock === null) {
                    this.loadTrucksService.refreshMeatriteStock().subscribe(); // no unSubscribe: takes(1)
                }
            })
        ).subscribe();  // no unSubscribe: takes(1)
    }

    // getDailyHppStockData(routeid: string) {  // should depricate
    //     const routeObject = this.getRouteObject(parseInt(routeid, 10));
    //     const getTimePackage$ = this.getDatePackage.currentDatePackage$;
    //     getTimePackage$.pipe(
    //         take(1),  // If routes don't change with new date, then this might be the reason (but create Subcribe variable)
    //         concatMap((datePackage) => this.loadTrucksService.getHppOrders(routeObject, datePackage)),
    //         tap(data => this.routeData = data),
    //         map(data => this.normalizeData(data))
    //     ).subscribe(data => this.templateData = data);
    // }

    getRouteObject(routeid: number): IBasicRoute {
        return this.dailyRoutes.find((route) => route.routeid === routeid);
    }

    // normalizeData(data: IDispatchStockDataMain): IRouteTemplateData {
    //     let routeTemplateData: IRouteTemplateData;
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

    // reloadTruck(truckNumber: number): IRouteTemplateData {
    //     const data = this.routeData;
    //     let routeTemplateData: IRouteTemplateData;
    //     if (truckNumber === -1) {
    //         routeTemplateData = {
    //             routeName: data.routeData.routeName,
    //             prodductTotal: data.routeData.totalProductOnAllTrucks, showLoadTruckTemplate: false,
    //             totalTrucks: data.routeData.trucks.length, meatriteStock: data.meatriteStock
    //         };
    //     } else {
    //         routeTemplateData = {
    //             routeName: data.routeData.trucks[truckNumber].truckName,
    //             prodductTotal: data.routeData.trucks[truckNumber].totalProductOnTruck, showLoadTruckTemplate: false,
    //             totalTrucks: data.routeData.trucks.length, meatriteStock: data.meatriteStock,
    //             clients: data.routeData.trucks[truckNumber].clients
    //         };
    //     }
    //     console.log('Here is the template data that is available ', routeTemplateData);
    //     return routeTemplateData;
    // }

    loadTruck(truckNumber) {
        // this.templateData = this.reloadTruck(truckNumber);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            console.log('Dispatch data is unsubscribing');
            this.subscription.unsubscribe();
            this.subscription2.unsubscribe();
        }
    }


}
