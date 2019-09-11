import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { IOrderDetails, IWeeklyOrdersDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { concatMap, switchMap, tap, flatMap } from 'rxjs/operators';
import { ViewOrdersGraphqlStringsService } from '../../view-orders/1#view-order-services/view-orders-graphql-strings.service';
import { OrderService } from '../../#sharedServices/order.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

@Injectable({
    providedIn: 'root'
})
export class ViewWeeklyOrdersService {

        totalAmountOfWeeklyOrders: Array<IWeeklyOrdersDetails> = [];

    constructor(private getDateService: GetDate$Service,
        private viewOrdersGraphQlStringsService: ViewOrdersGraphqlStringsService,
        private orderService: OrderService) {}

    getWeeklyOrders(): Observable<IOrderDetails[]> {
        return this.getDateService.currentDatePackage$.pipe(
            switchMap(datePackage => this.getDateService.getAllDatePackagesForGivenWeekNR(datePackage)),
            concatMap(datePackages => this.itterateOverDates(datePackages))
        );
    }

    itterateOverDates(datePackages: IDate[]): Observable<any> {
        const totalAmountOfWeeklyOrders: IOrderDetails[] = [];
        return of({}).pipe(
            tap(() => console.log('The datepackages are: ', datePackages)),
            switchMap(() => from(datePackages).pipe(
                flatMap(datePackage => this.getOrdersForDate(datePackage))
                )
            )
        );
    }

    getOrdersForDate(datePackage: IDate): Observable<any> {
        // const totalAmountOfWeeklyOrders: IOrderDetails[] = [];
        this.totalAmountOfWeeklyOrders = [];
        console.log('DatePackage is running', datePackage);
        const queryString = this.viewOrdersGraphQlStringsService.GET_MEDIUM_DATA_FOR_SPECIFIC_ROUTE;
        return this.orderService.searchForOrdersMain(undefined, datePackage, undefined, queryString).pipe(
            tap(orders => console.log('The returned orders are: ', orders)),
            // tap(orders => this.totalAmountOfWeeklyOrders.push.apply(this.totalAmountOfWeeklyOrders, orders)),
            tap(orders => this.totalAmountOfWeeklyOrders.push({
                weekDayName: datePackage.weekDayName, weekDayRank: datePackage.weekDayRank, orders: orders
            })),
            tap(orders => console.log('The totalAmountOfWeeklyOrders orders are: ', this.totalAmountOfWeeklyOrders)),
            );
    }



}
