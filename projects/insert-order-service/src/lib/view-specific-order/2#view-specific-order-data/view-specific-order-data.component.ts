import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewSpecificOrderService } from '../1#view-specific-order-services/view-specific-order.service';
import { tap, concatMap } from 'rxjs/operators';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IUniqueProductTotals } from 'src/app/home/shared/services/productServices/products-interface';
import { ViewOrderData$Service } from '../../view-orders/1#view-order-services/view-order-data$.service';
import { IViewRoutesData } from '../../view-orders/1#view-order-services/view-order-interface';


@Component({
    selector: 'mr-insert-view-specific-order-data',
    templateUrl: './view-specific-order-data.component.html',
    styleUrls: ['./view-specific-order-data.component.scss']
})
export class ViewSpecificOrderDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    orders: IOrderDetails[];
    uniqueProductsDetails: Set<IUniqueProductTotals>;
    currentRoute: IViewRoutesData;

    constructor(private viewSpecificOrderService: ViewSpecificOrderService,
        private viewOrderData$Service: ViewOrderData$Service) {}

    ngOnInit() {
        this.getSelectedOrderData();
    }

    getSelectedOrderData() {
        this.subscription = this.viewSpecificOrderService.getViewSpecificOrderInitialData().pipe(
            tap(orders => this.orders = orders),
            tap(orders => this.uniqueProductsDetails = this.viewSpecificOrderService.getUniqueProductDetails(orders)),
            // tap(() => console.log('Here is the uniqueProductsDetails: ', this.uniqueProductsDetails)),
            concatMap(() => this.viewOrderData$Service.currentPickedRoute$),
            tap(currentRoute => this.currentRoute = currentRoute),
        ).subscribe();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
