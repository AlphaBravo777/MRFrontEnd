import { Injectable } from '@angular/core';
import { ViewOrderData$Service } from '../../view-orders/1#view-order-services/view-order-data$.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IOrderDetails, IWeeklyOrdersDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { map, concatMap, switchMap, tap, take } from 'rxjs/operators';
import { OrderService } from '../../#sharedServices/order.service';
import { IViewRoutesData } from '../../view-orders/1#view-order-services/view-order-interface';
import { ViewOrdersGraphqlStringsService } from '../../view-orders/1#view-order-services/view-orders-graphql-strings.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IUniqueProductTotals } from 'src/app/home/shared/services/productServices/products-interface';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { ViewWeeklyOrdersService } from './view-weekly-orders.service';
import { ViewSpecificOrderApiService } from './view-specific-order-api.service';

@Injectable({
    providedIn: 'root'
})
export class ViewSpecificOrderService {

    constructor(private viewOrderData$Service: ViewOrderData$Service,
        private getDateService: GetDate$Service,
        private orderService: OrderService,
        private viewOrdersGraphQlStringsService: ViewOrdersGraphqlStringsService,
        private viewWeeklyOrdersService: ViewWeeklyOrdersService,
        private viewSpecificOrderApiService: ViewSpecificOrderApiService) {}

    getViewSpecificOrderInitialData(): Observable<IOrderDetails[]> {
        const datePackage$ = this.getDateService.currentDatePackage$;
        const specificRouteDatePackage$ = this.viewOrderData$Service.currentDatePackageForSpecificRoute$;
        const selectedRoute$: Observable<IViewRoutesData> = this.viewOrderData$Service.currentPickedRoute$;
        return combineLatest([datePackage$, selectedRoute$, specificRouteDatePackage$]).pipe(
            concatMap(data => {
                if (data[2]) {
                    console.log('- - - - - - - There WAS A specific route order data package');
                    return this.searchForSpecificOrder(<IDate>data[2], <IViewRoutesData>data[1]).pipe();
                } else {
                    console.log('- - - - - - - There was no specific route order data package');
                    return this.searchForSpecificOrder(<IDate>data[0], <IViewRoutesData>data[1]).pipe();
                }
            }),
        );
    }

    searchForSpecificOrder(datePackage: IDate, route: IViewRoutesData): Observable<IOrderDetails[]> {
        const queryString = this.viewOrdersGraphQlStringsService.GET_MEDIUM_DATA_FOR_SPECIFIC_ROUTE;
        // const headers = {'Remove Spinner': 'True' };
        return this.orderService.searchForOrdersMain(undefined, datePackage, route.routeid, queryString).pipe(
            switchMap(orders => {
                if (route.routeid >= 1) {
                    return of(orders);
                } else if (route.routeid === 0.1) { // When the user selected the "Weekly orders" button
                    console.log('THIS IS THE TOTAL FOR THE WHOLE WEEK');
                    return this.viewWeeklyOrdersService.getWeeklyOrders().pipe(
                        // map(weeklyOrders => this.consolidateWeeklyOrdersIntoOne(weeklyOrders)),
                    );
                } else { // When the user selected the "View total products" button
                    console.log('There was NO route ID');
                    return this.viewOrderData$Service.currentDailyRoute$.pipe(
                        map(dailyRoutes => this.consolidateRouteOrdersIntoOne(orders, dailyRoutes))
                    );
                }
            }),
        );
    }

    getUniqueProductDetails(orders: IOrderDetails[]): Set<IUniqueProductTotals> {
        const uniqueProductDetails: Set<IUniqueProductTotals> = new Set<IUniqueProductTotals>();
        orders.forEach(order => {
            order.orders.forEach(product => {
                if (product.productid in uniqueProductDetails) {
                    uniqueProductDetails[product.productid].totalAmount += product.amount;
                    uniqueProductDetails[product.productid].totalWeight += product.amount * product.packageWeight;
                    uniqueProductDetails[product.productid].totalWeightWithCrates += (Math.ceil(product.amount /
                        product.unitsPerMaxShippingWeight) * product.packagingShippingWeight) + (product.amount * product.packageWeight);
                } else {
                    const uniqueProduct: IUniqueProductTotals = {
                        productMRid: product.productMRid, rowNumber: null, totalAmount: product.amount,
                        totalWeight: product.amount * product.packageWeight, unitWeight: product.packageWeight,
                        totalWeightWithCrates: (Math.ceil(product.amount / product.unitsPerMaxShippingWeight) *
                        product.packagingShippingWeight) + (product.amount * product.packageWeight)
                    };
                    uniqueProductDetails[product.productid] = uniqueProduct;
                }
            });
        });
        console.log('ALPHA (getUniqueProductDetails) = ', JSON.parse(JSON.stringify(uniqueProductDetails)));
        return uniqueProductDetails;
    }

    consolidateRouteOrdersIntoOne(orders: IOrderDetails[], dailyRoutes: IRoute[]): IOrderDetails[] {
        const routeids: Set<Object> = new Set();
        orders.forEach(order => {
            if (order.routeid in routeids) {
                routeids[order.routeid].orders.push.apply(routeids[order.routeid].orders, order.orders);
                routeids[order.routeid].orderTotalAmount += order.orderTotalAmount;
            } else {
                routeids[order.routeid] = order;
            }
        });
        const newOrders: IOrderDetails[] = [];
        dailyRoutes.forEach(route => {
            routeids[route.routeid].commonName = route.routeName;
            newOrders.push(routeids[route.routeid]);
        });
        console.log('The routeids = ', routeids);
        return newOrders;
    }

    calculateRouteWeightWithAndWithoutCrates(uniqueProductsDetails: Set<IUniqueProductTotals>): Array<any> {
        let totalWeight = 0;
        let totalWeightWithCrates = 0;
        for (const key in uniqueProductsDetails) {
            if (uniqueProductsDetails.hasOwnProperty(key)) {
                totalWeight += uniqueProductsDetails[key].totalWeight;
                totalWeightWithCrates += uniqueProductsDetails[key].totalWeightWithCrates;
            }
        }
        return [totalWeight, totalWeightWithCrates];
    }

    refreshWeeklyOrdersCache(): Observable<any> {
        return this.getDateService.currentDatePackage$.pipe(
            take(1),
            map((datePackage => this.changeMondayWeekNumber(datePackage))),
            tap((datePackage) => console.log('Current date package = ', datePackage)),
            concatMap(datePackage => this.viewSpecificOrderApiService.refreshWeeklyOrdersCache(datePackage))
        );
    }

    changeMondayWeekNumber(datePackage: IDate) {
        if (datePackage.weekDay === 1) {
            datePackage.week -= 1;
            return datePackage;
        }
        return datePackage;
    }



}
