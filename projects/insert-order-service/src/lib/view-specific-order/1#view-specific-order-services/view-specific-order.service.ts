import { Injectable } from '@angular/core';
import { ViewOrderData$Service } from '../../view-orders/1#view-order-services/view-order-data$.service';
import { Observable, combineLatest } from 'rxjs';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { switchMap, tap } from 'rxjs/operators';
import { OrderService } from '../../#sharedServices/order.service';
import { IViewRoutesData } from '../../view-orders/1#view-order-services/view-order-interface';
import { ViewOrdersGraphqlStringsService } from '../../view-orders/1#view-order-services/view-orders-graphql-strings.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';

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
            switchMap(data => this.orderService.searchForOrdersMain(undefined, <IDate>data[0], <number>data[1].routeid, queryString)),
            tap(orders => console.log('Orders = ', orders))
            // map(orders => convertOrderDataForHTMLTable)
        );
    }

    getUniqueProducts(orders: IOrderDetails[]) {
        const uniqueValues = {};
        const uniqueProducts: IProductOrderDetails[] = [];
        orders.forEach(order => {
            order.orders.forEach(product => {
                if (!(product.productid in uniqueValues)) {
                    uniqueValues[product.productid] = product.productid;
                    uniqueProducts.push(product);
                }
            });
        });
        console.log('UniqueValues = ', uniqueValues);
        return uniqueProducts;
    }

}
