import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewSpecificOrderService } from '../1#view-specific-order-services/view-specific-order.service';

@Component({
    selector: 'mr-insert-view-specific-order-data',
    templateUrl: './view-specific-order-data.component.html',
    styleUrls: ['./view-specific-order-data.component.scss']
})
export class ViewSpecificOrderDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(private viewSpecificOrderService: ViewSpecificOrderService) {}

    ngOnInit() {
        this.getSelectedOrderData();
    }

    getSelectedOrderData() {
        this.subscription = this.viewSpecificOrderService.getViewSpecificOrderInitialData().pipe(

        ).subscribe();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
