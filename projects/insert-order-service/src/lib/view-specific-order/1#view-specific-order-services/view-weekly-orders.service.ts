import { Injectable } from '@angular/core';
import { Observable, of, from, forkJoin, combineLatest } from 'rxjs';
import { IOrderDetails, IWeeklyOrdersDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { concatMap, switchMap, tap, flatMap, map } from 'rxjs/operators';
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

    getWeeklyOrders(): Observable<IWeeklyOrdersDetails[]> {
        return this.getDateService.currentDatePackage$.pipe(
            concatMap(datePackage => this.getDateService.getAllDatePackagesForGivenWeekNR(datePackage)),
            map(datePackages => this.turnEachDatePackageIntoAnObservable(datePackages)),
            concatMap(dateObs => combineLatest(dateObs)),
            map((data) => this.toolbox.sorting(data, 'weekDayRank')),
            tap(data => console.log('* * Charlie * *', data)),
        );
    }

    private turnEachDatePackageIntoAnObservable(datePackages: IDate[]): Array<Observable<any>> {
        const queryString = this.viewOrdersGraphQlStringsService.GET_MEDIUM_DATA_FOR_SPECIFIC_ROUTE;
        const dateObservables = [];
        datePackages.forEach(date => {
            dateObservables.push(this.orderService.searchForOrdersMain(undefined, date, undefined, queryString).pipe(
                map(orders => {
                    const ord =  {weekDayName: date.weekDayName, weekDayRank: date.weekDayRank, orders: orders};
                    return ord;
                })
            ));
        });
        return dateObservables;
    }

}
