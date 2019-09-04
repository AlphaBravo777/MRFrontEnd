import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewSpecificOrderService } from '../1#view-specific-order-services/view-specific-order.service';
import { tap } from 'rxjs/operators';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IProductOrderDetails, IUniqueProductsDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Component({
    selector: 'mr-insert-view-specific-order-data',
    templateUrl: './view-specific-order-data.component.html',
    styleUrls: ['./view-specific-order-data.component.scss']
})
export class ViewSpecificOrderDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    orders: IOrderDetails[];
    // uniqueProducts: IProductOrderDetails[]; // Turns this into an object
    // uniqueProductAmountTotals;  // Turns this into an object
    // uniqueProductAmountWeights; // Turns this into an object
    // Add a product weight also to the object
    uniqueProductsDetails: IUniqueProductsDetails;

    constructor(private viewSpecificOrderService: ViewSpecificOrderService) {}

    ngOnInit() {
        this.getSelectedOrderData();
    }

    getSelectedOrderData() {
        this.subscription = this.viewSpecificOrderService.getViewSpecificOrderInitialData().pipe(
            tap(orders => this.orders = orders),
            // tap(orders => this.uniqueProducts = this.viewSpecificOrderService.getUniqueProducts(orders)),
            // tap(orders => this.uniqueProductAmountTotals = this.viewSpecificOrderService.getUniqueProductTotals(orders)),
            // tap(orders => this.uniqueProductAmountWeights = this.viewSpecificOrderService.getUniqueProductWeights(orders)),
            tap(orders => this.uniqueProductsDetails = this.viewSpecificOrderService.getUniqueProductDetails(orders)),
            tap(() => console.log('Here is the uniqueProductsDetails: ', this.uniqueProductsDetails)),

        ).subscribe();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
