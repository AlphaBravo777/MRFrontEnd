import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewOrderService } from '../1#view-order-services/view-order.service';
import { IViewRoutesData } from '../1#view-order-services/view-order-interface';

@Component({
    selector: 'mr-insert-view-order-data',
    templateUrl: './view-order-data.component.html',
    styleUrls: ['./view-order-data.component.scss']
})
export class ViewOrderDataComponent implements OnInit, OnDestroy {

    // Dynamic data = everytime the date changes, we need new data
    // Then we need to get all the routes for that day
    // Data that we only need to get once = routeids and names
    // We need a service that puts the all route data together with the order route data

    subscription: Subscription;
    smallRoutesForDay: IViewRoutesData[];
    totalWeightForTheDay: number;

    constructor(private viewOrderService: ViewOrderService) {}

    ngOnInit() {
        this.gatherAllNeededDataForRouteSummary();
    }

    gatherAllNeededDataForRouteSummary() {
        this.subscription = this.viewOrderService.getViewOrderInitialData().subscribe(
            routes => {
                this.smallRoutesForDay = routes;
                this.totalWeightForTheDay = this.viewOrderService.getTotalDailyWeightAndRoutePercentage(routes);
                this.gatherIndividualRouteData();
            }
        );
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
