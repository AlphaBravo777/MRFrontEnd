import { Injectable } from '@angular/core';
import { ViewOrderData$Service } from '../../view-orders/1#view-order-services/view-order-data$.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { switchMap, tap } from 'rxjs/operators';
import { OrderService } from '../../#sharedServices/order.service';
import { IViewRoutesData } from '../../view-orders/1#view-order-services/view-order-interface';
import { ViewOrdersGraphqlStringsService } from '../../view-orders/1#view-order-services/view-orders-graphql-strings.service';

@Injectable({
    providedIn: 'root'
})
export class ViewSpecificOrderService {

    constructor(private viewOrderData$Service: ViewOrderData$Service,
        private getDateService: GetDate$Service,
        private orderService: OrderService,
        private viewOrdersGraphQlStringsService: ViewOrdersGraphqlStringsService) {}

    getViewSpecificOrderInitialData(): Observable<IOrderDetails[]> {
        const queryString = this.viewOrdersGraphQlStringsService.GET_MEDIUM_DATA_FOR_SPECIFIC_ROUTE;
        const datePackage$ = this.getDateService.currentDatePackage$;
        const selectedRoute$: Observable<IViewRoutesData> = this.viewOrderData$Service.currentPickedRoute$;
        return combineLatest([datePackage$, selectedRoute$]).pipe(
            // switchMap(data => this.orderService.searchForOrdersMain(undefined, data[0], data[1].routeid, queryString)),
            switchMap(data => this.orderService.searchForOrdersMain(undefined, data[0], data[1].routeid, queryString)),
            tap(orders => console.log('Orders = ', orders))
        );
    }
}
