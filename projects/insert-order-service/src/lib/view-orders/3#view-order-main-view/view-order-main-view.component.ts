import { Component, OnInit, Input } from '@angular/core';
import { IViewRoutesData } from '../1#view-order-services/view-order-interface';
import { ViewOrderData$Service } from '../1#view-order-services/view-order-data$.service';
import { Router } from '@angular/router';

@Component({
    selector: 'mr-insert-view-order-main-view',
    templateUrl: './view-order-main-view.component.html',
    styleUrls: ['./view-order-main-view.component.scss']
})
export class ViewOrderMainViewComponent implements OnInit {

    @Input() smallRoutesForDay: IViewRoutesData[];
    @Input() totalWeightForTheDay: number;

    constructor(private viewOrderData$Service: ViewOrderData$Service, private router: Router) {}

    ngOnInit() {}

    routeSelected(route: IViewRoutesData) {
        this.viewOrderData$Service.setPickedRoute(route);
        this.router.navigate(['/main/admin-office/insertOrderService/entry/view-orders/view-specific-order']);
    }

}
