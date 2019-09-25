import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { IWeeklyOrdersDetails, IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { concatMap, tap, map } from 'rxjs/operators';
import { ViewOrdersGraphqlStringsService } from '../../view-orders/1#view-order-services/view-orders-graphql-strings.service';
import { OrderService } from '../../#sharedServices/order.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';

@Injectable({
    providedIn: 'root'
})
export class ViewWeeklyOrdersService {

    constructor(private getDateService: GetDate$Service,
        private viewOrdersGraphQlStringsService: ViewOrdersGraphqlStringsService,
        private orderService: OrderService,
        private toolbox: ToolboxGroupService) {}

    getWeeklyOrders(): Observable<IOrderDetails[]> {
        return this.getDateService.currentDatePackage$.pipe(
            concatMap(datePackage => this.getDateService.getAllDatePackagesForGivenWeekNR(datePackage)),
            map(datePackages => this.turnEachDatePackageIntoAnObservable(datePackages)),
            concatMap(dateObs => combineLatest(dateObs)),
            map((data) => this.toolbox.sorting(data, 'weekDayRank')),
            tap(data => console.log('* * Charlie * *', data)),
            map(weeklyOrders => this.consolidateWeeklyOrdersIntoOne(weeklyOrders)),
        );
    }

    private turnEachDatePackageIntoAnObservable(datePackages: IDate[]): Array<Observable<any>> {
        const queryString = this.viewOrdersGraphQlStringsService.GET_MEDIUM_DATA_FOR_SPECIFIC_ROUTE;
        const dateObservables = [];
        const headers = {'Remove Spinner': 'True' };
        datePackages.forEach(date => {
            dateObservables.push(this.orderService.searchForOrdersMain(undefined, date, undefined, queryString, headers).pipe(
                map(orders => {
                    const ord =  {weekDayName: date.weekDayName, weekDayRank: date.weekDayRank, orders: orders};
                    return ord;
                })
            ));
        });
        return dateObservables;
    }

    private consolidateWeeklyOrdersIntoOne(weeklyOrders: IWeeklyOrdersDetails[]): IOrderDetails[] {
        console.log('* * ALPHA * * ', weeklyOrders);
        if (weeklyOrders) {
            const copyOfWeeklyOrders: IWeeklyOrdersDetails[] = JSON.parse(JSON.stringify(weeklyOrders));
            const newWeeklyOrders: IOrderDetails[] = [];
            copyOfWeeklyOrders.forEach(weekDay => {
                if (weekDay.orders.length > 0) {
                    const dailyOrder: IOrderDetails = weekDay.orders[weekDay.orders.length - 1];
                    let dailyTotalWeight = weekDay.orders[weekDay.orders.length - 1].orderTotalAmount;
                    dailyOrder.commonName = weekDay.weekDayName;
                    weekDay.orders.pop();
                    while (weekDay.orders.length > 0) {
                        const currentOrder: IOrderDetails = weekDay.orders.pop();
                        dailyOrder.orders.push.apply(dailyOrder.orders, currentOrder.orders);
                        dailyTotalWeight += currentOrder.orderTotalAmount;
                    }
                    dailyOrder.orderTotalAmount = dailyTotalWeight;
                    newWeeklyOrders.push(dailyOrder);
                }
            });
            return newWeeklyOrders;
        }
    }

}
