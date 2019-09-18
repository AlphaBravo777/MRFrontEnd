import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, iif, of } from 'rxjs';
import { ViewOrderService } from '../1#view-order-services/view-order.service';
import { IViewRoutesData } from '../1#view-order-services/view-order-interface';
import { tap, concatMap } from 'rxjs/operators';
import { ViewOrderData$Service } from '../1#view-order-services/view-order-data$.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

@Component({
    selector: 'mr-insert-view-order-data',
    templateUrl: './view-order-data.component.html',
    styleUrls: ['./view-order-data.component.scss']
})
export class ViewOrderDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    smallRoutesForDay: IViewRoutesData[];
    totalWeightForTheDay: number;
    currentDisplayingDate: IDate;

    constructor(private viewOrderService: ViewOrderService,
        private viewOrderDataService: ViewOrderData$Service,
        private getDateService: GetDate$Service) {}

    ngOnInit() {
        this.gatherAllNeededDataForRouteSummary();
    }

    gatherAllNeededDataForRouteSummary() {
        this.subscription = this.viewOrderService.getViewOrderInitialData().pipe(
            tap(routes => this.smallRoutesForDay = routes),
            tap(routes => this.totalWeightForTheDay = this.viewOrderService.getTotalDailyWeightAndRoutePercentage(routes)),
            concatMap(() => this.viewOrderDataService.currentDatePackageForSpecificRoute$),
            concatMap(datePackage => iif(() => Boolean(datePackage), of(datePackage), this.getDateService.currentDatePackage$)),
            tap(datePackage => this.currentDisplayingDate = datePackage),
            tap(() => this.gatherIndividualRouteData())
        ).subscribe();
    }

    gatherIndividualRouteData() {
        console.log('I should be running more towards the end where I could pre-fetch product data');
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
