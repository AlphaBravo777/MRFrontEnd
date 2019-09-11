import { Component, OnInit } from '@angular/core';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { ViewWeeklyOrdersService } from '../1#view-weekly-orders-services/view-weekly-orders.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'mr-insert-view-weekly-orders-data',
    templateUrl: './view-weekly-orders-data.component.html',
    styleUrls: ['./view-weekly-orders-data.component.scss']
})
export class ViewWeeklyOrdersDataComponent implements OnInit {

    weeklyOrdersByDay: IOrderDetails[] = [];
    subscription: Subscription;

    constructor(private viewWeeklyOrdersService: ViewWeeklyOrdersService) {}

    ngOnInit() {
        this.getWeeklyOrdersData();
    }

    getWeeklyOrdersData() {
        this.subscription = this.viewWeeklyOrdersService.getWeeklyOrders().pipe(
            tap(orders => this.weeklyOrdersByDay = orders),
            tap(() => console.log('This is the finals ', this.weeklyOrdersByDay))
        ).subscribe();
    }
}
