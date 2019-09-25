import { Component, OnInit, Input } from '@angular/core';
import { IViewRoutesData } from '../1#view-order-services/view-order-interface';
import { ViewOrderData$Service } from '../1#view-order-services/view-order-data$.service';
import { Router } from '@angular/router';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

@Component({
    selector: 'mr-insert-view-order-main-view',
    templateUrl: './view-order-main-view.component.html',
    styleUrls: ['./view-order-main-view.component.scss']
})
export class ViewOrderMainViewComponent implements OnInit {

    @Input() smallRoutesForDay: IViewRoutesData[];
    @Input() totalWeightForTheDay: number;
    @Input() currentDisplayingDate: IDate;
    @Input() weeklyOrdersHaveBeenRetrieved = false;

    constructor(private viewOrderData$Service: ViewOrderData$Service, private router: Router) {}

    ngOnInit() {}

    routeSelected(route: IViewRoutesData) {
        this.viewOrderData$Service.setPickedRoute(route);
        this.router.navigate(['/main/admin-office/insertOrderService/entry/view-orders/view-specific-order']);
    }

    orderForWeekSelected(route: IViewRoutesData) {
        if (this.weeklyOrdersHaveBeenRetrieved) {
            this.viewOrderData$Service.setPickedRoute(route);
            this.router.navigate(['/main/admin-office/insertOrderService/entry/view-orders/view-specific-order']);
        }
        // console.log('Weekly orders will now be running', route);
        // this.router.navigate(['/main/admin-office/insertOrderService/entry/view-weekly-orders']);
    }

    buttonColor(): Object {
        if (this.weeklyOrdersHaveBeenRetrieved) {
            return {'background': 'none'};
        } else {
            return {'background': 'grey'};
        }
    }

}
