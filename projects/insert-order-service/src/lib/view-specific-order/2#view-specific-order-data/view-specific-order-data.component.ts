import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewSpecificOrderService } from '../1#view-specific-order-services/view-specific-order.service';
import { tap, concatMap } from 'rxjs/operators';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IUniqueProductTotals } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';
import { ViewOrderData$Service } from '../../view-orders/1#view-order-services/view-order-data$.service';
import { IViewRoutesData } from '../../view-orders/1#view-order-services/view-order-interface';
import { SpinnerVisibilityService } from 'ng-http-loader';


@Component({
    selector: 'mr-insert-view-specific-order-data',
    templateUrl: './view-specific-order-data.component.html',
    styleUrls: ['./view-specific-order-data.component.scss']
})
export class ViewSpecificOrderDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    orders: IOrderDetails[] = [];
    uniqueProductsDetails: Set<IUniqueProductTotals>;
    currentRoute: IViewRoutesData;

    constructor(private viewSpecificOrderService: ViewSpecificOrderService,
        private viewOrderData$Service: ViewOrderData$Service,
        private spinner: SpinnerVisibilityService) {}

    ngOnInit() {
        this.getSelectedOrderData();
    }

    getSelectedOrderData() {
        this.subscription = this.viewSpecificOrderService.getViewSpecificOrderInitialData().pipe(
            tap(orders => this.orders = orders),
            tap(orders => this.uniqueProductsDetails = this.viewSpecificOrderService.getUniqueProductDetails(orders)),
            tap(() => console.log('Here is the uniqueProductsDetails: ', this.uniqueProductsDetails)),
            // tap(() => this.productsTableArray = this.viewSpecificOrderService.createTableArray(this.orders, this.uniqueProductsDetails)),
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
