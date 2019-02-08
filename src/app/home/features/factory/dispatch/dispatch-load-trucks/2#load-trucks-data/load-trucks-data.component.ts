import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBasicRoute, IStockSingleProduct } from '../../$dispatch-services/dispatch-interface';
import { Subscription } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { LoadTrucksService } from '../1#load-trucks-services/load-trucks.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { LoadTrucksInfoService } from '../1#load-trucks-services/load-trucks-info.service';

@Component({
    selector: 'app-load-trucks-data',
    templateUrl: './load-trucks-data.component.html',
    styleUrls: ['./load-trucks-data.component.scss']
})
export class LoadTrucksDataComponent implements OnInit, OnDestroy {

    // templateData: IDispatchStockDataMain;

    dailyRoutes: IBasicRoute[];
    subscription: Subscription;
    meatriteStock: IStockSingleProduct[];
    routeTrucks: IBasicRoute;

    constructor(
        private loadTrucksService: LoadTrucksService,
        private getDatePackage: GetDate$Service,
        private loadTruckInfoService: LoadTrucksInfoService
        ) { }

    ngOnInit() {
        this.getInitialTemplateData();
    }

    getInitialTemplateData() {   // Used
        this.subscription = this.getDatePackage.currentDatePackage$.pipe(
            concatMap(datePackage => this.loadTrucksService.getDailyRoutes(datePackage)),
            tap(data => this.dailyRoutes = data),
            concatMap(() => this.loadTrucksService.getInitialTemplateData()),
        ).subscribe(data => {
            this.meatriteStock = data[0];
            this.routeTrucks = data[1];
        });
    }

    refreshRouteSelection(routeObject: IBasicRoute) {   // Used
        this.loadTrucksService.refreshRouteSelection(routeObject).pipe(
            tap(() => {
                // console.log('The templatedata = ', this.templateData);
                if (this.meatriteStock === null) {
                    this.loadTrucksService.refreshMeatriteStock().subscribe(); // no unSubscribe: takes(1)
                }
            }),
            tap(() => this.loadTruckInfoService.setTruck(routeObject.trucks[0]))
        ).subscribe();  // no unSubscribe: takes(1)
    }

    ngOnDestroy(): void {  // Used
        if (this.subscription) {
            console.log('Dispatch data is unsubscribing');
            this.subscription.unsubscribe();
        }
    }


}
