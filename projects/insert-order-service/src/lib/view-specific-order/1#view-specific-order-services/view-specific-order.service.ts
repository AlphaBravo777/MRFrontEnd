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
import { IProductOrderDetails, IUniqueProductsDetails } from 'src/app/home/shared/services/productServices/products-interface';

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

    getUniqueProducts2(orders: IOrderDetails[]): Set<Object> {
        const uniqueValues = new Set<Object>();
        orders.forEach(order => {
            order.orders.forEach(product => {
                uniqueValues[product.productid] = product.productMRid;
            });
        });
        // console.log('UniqueValues2 = ', uniqueValues);
        return uniqueValues;
    }

    getUniqueProductTotals(orders: IOrderDetails[]) {
        const uniqueProductsDictionary = {};
        orders.forEach(order => {
            order.orders.forEach(product => {
                if (product.productid in uniqueProductsDictionary) {
                    uniqueProductsDictionary[product.productid] += product.amount;
                } else {
                    uniqueProductsDictionary[product.productid] = product.amount;
                }
            });
        });
        return uniqueProductsDictionary;
    }

    getUniqueProductTotals2(orders: IOrderDetails[]) {
        const uniqueProductDetails: IUniqueProductsDetails = {productRowValues: new Set(), productTotalWeights: new Set(),
            productTotalAmounts: new Set(), productTotalWeightsWithCrates: new Set(), productUnitWeight: new Set(),
            uniqueProducts: new Set()};
        orders.forEach(order => {
            order.orders.forEach(product => {
                if (product.productid in uniqueProductDetails.productTotalAmounts) {
                    uniqueProductDetails.productTotalAmounts[product.productid] += product.amount;
                    uniqueProductDetails.productTotalWeights[product.productid] += product.amount * product.packageWeight;
                    uniqueProductDetails.productTotalWeightsWithCrates[product.productid] +=
                        (Math.ceil(product.amount / product.unitsPerMaxShippingWeight) * product.packagingShippingWeight) +
                        (product.amount * product.packageWeight);
                } else {
                    uniqueProductDetails.productTotalAmounts[product.productid] = product.amount;
                    uniqueProductDetails.productTotalWeights[product.productid] = product.amount * product.packageWeight;
                    uniqueProductDetails.uniqueProducts[product.productid] = product.productMRid;
                    uniqueProductDetails.productUnitWeight[product.productid] = product.packageWeight;
                    uniqueProductDetails.productTotalWeightsWithCrates[product.productid] =
                        (Math.ceil(product.amount / product.unitsPerMaxShippingWeight) * product.packagingShippingWeight) +
                        (product.amount * product.packageWeight);
                }
            });
        });
        return uniqueProductDetails;
    }

    getUniqueProductWeights(orders: IOrderDetails[]) {

    }

    getUniqueProductDetails(orders: IOrderDetails[]) {
        // this.uniqueProductDetails.productids = this.getUniqueProducts2(orders);
        // this.getUniqueProductTotals2(orders);
        return this.getUniqueProductTotals2(orders); // Try and make this global variable local
    }

}
