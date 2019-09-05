import { Injectable } from '@angular/core';
import { ViewOrderData$Service } from '../../view-orders/1#view-order-services/view-order-data$.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { switchMap, tap, map, concatMap } from 'rxjs/operators';
import { OrderService } from '../../#sharedServices/order.service';
import { IViewRoutesData } from '../../view-orders/1#view-order-services/view-order-interface';
import { ViewOrdersGraphqlStringsService } from '../../view-orders/1#view-order-services/view-orders-graphql-strings.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IUniqueProductTotals } from 'src/app/home/shared/services/productServices/products-interface';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';

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
            concatMap(data => this.orderService.searchForOrdersMain(undefined, <IDate>data[0], <number>data[1].routeid, queryString).pipe(
                concatMap(orders => {
                    if (data[1].routeid) {
                        return of(orders);
                    } else {
                        console.log('There was NO route ID');
                        return this.viewOrderData$Service.currentDailyRoute$.pipe(
                            map(dailyRoutes => this.consolidateRouteOrdersIntoOne(orders, dailyRoutes))
                        );
                    }
                }),
            )),
            tap(orders => console.log('Orders = ', orders))
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
        console.log('ALPHA = ', uniqueProductDetails);
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

    calculateRouteWeightWithAndWithoutWeight(uniqueProductsDetails: Set<IUniqueProductTotals>): Array<any> {
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

}
