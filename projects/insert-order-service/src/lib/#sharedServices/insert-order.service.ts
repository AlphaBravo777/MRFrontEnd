import { Injectable } from '@angular/core';
import { of, Observable, from, BehaviorSubject } from 'rxjs';
import { tap, concatMap, map, switchMap } from 'rxjs/operators';
import { IOrderDetails } from './insert-order-service-Interfaces';
import { InsertOrderApiService } from './insert-order-api.service';
import { DatePickerService } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-picker.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { InsertOrderData$Service } from '../insert-order/1#insert-order-services/insert-order-data$.service';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderService {
    constructor(private insertOrderApiService: InsertOrderApiService,
        private datePickerService: DatePickerService,
        private getDateService: GetDate$Service,
        private insertOrderData$Service: InsertOrderData$Service) {}

    private ordersNotInserted = new BehaviorSubject<IOrderDetails[]>([]);
    currentOrdersNotInserted$ = this.ordersNotInserted.asObservable();
    ordersNotInsertedArray: IOrderDetails[] = [];

    insertNewOrder(orders: IOrderDetails[]): Observable<any> {
        console.log('Bravo(c) = ', orders);
        let products: IProductOrderDetails[];
        return from(orders).pipe(
            tap(order => products = JSON.parse(JSON.stringify(order.orders))),
            tap(order => order.orders = null),
            concatMap(order => this.insertOrderApiService.enterNewOrderDetails(order)),
            concatMap(response => {
                if ('error' in response) {
                    return of(response);
                } else {
                    return this.insertProductAmounts(products, response);
                }
            })
        );
    }

    insertProductAmounts(products: IProductOrderDetails[], orderDetails: IOrderDetails): Observable<any> {
        console.log('Bravo(d) = ', orderDetails);
        products.forEach(product => product.orderDetailsid = orderDetails.orderid);
        return this.insertOrderApiService.enterProductAmounts(products).pipe(
            tap(response => console.log('Bravo(b) = ', response)),
        );
    }

    searchForOrder(accountid): Observable<IOrderDetails> {  // IOrderDetails
        return this.getDateService.currentDatePackage$.pipe(
            concatMap(datePackage => this.insertOrderApiService.searchForOrder(datePackage, accountid)),
            tap(order => console.log('Alfa(returned order) = ', order)),
            concatMap(order => {
                if (order) {
                    return this.insertOrderData$Service.currentRoutes$.pipe(
                        tap(routes => console.log('Alfa(routes) = ', order, routes)),
                        tap(routes => {
                            const currentRoute = routes.find(route => route.routeid = order.routeid);
                            order.routeName = currentRoute.routeName;
                        }),
                        map(() => order)
                    );
                } else {
                    return of(order);
                }
            }),
            // tap(order => console.log('Alpha(Returned Order) = ', order)),
            // concatMap(order => this.insertOrderData$Service.currentRoutes$.pipe(
            //     tap(routes => console.log('Alfa(routes) = ', order, routes)),
            //     tap(routes => {
            //         const currentRoute = routes.find(route => route.routeid = order.routeid);
            //         order.routeName = currentRoute.routeName;
            //     }),
            //     map(() => order)
            // ))
        );
    }

    insertNewPnPOrder(orders: IOrderDetails[]): Observable<any> {
        const timeStampidRegister = {};
        return from(orders).pipe(
            concatMap((order: IOrderDetails) => {
                if (order.deliveryDate in timeStampidRegister) {
                    console.log('Date IS in the registry', timeStampidRegister);
                    order.timeStampid = timeStampidRegister[order.deliveryDate];
                    return of(order);
                } else {
                    console.log('Date is NOT in the registry', order.deliveryDate, timeStampidRegister);
                    return this.getDateService.getDatePackageForGivenLongDate(
                        this.datePickerService.shortToLongDate(order.deliveryDate)).pipe(
                        tap(datePackage => timeStampidRegister[order.deliveryDate] = datePackage.id),
                        tap(datePackage => order.timeStampid = datePackage.id),
                        map(() => order)
                    );
                }
            }),
            tap((order) => order.userid = JSON.parse(localStorage.getItem('userID'))),
            tap((order) => console.log('This is the form that will be inserted: ', order)),
            concatMap((order) => this.insertDetailsAndProductAmounts(order))
            );
    }

    insertDetailsAndProductAmounts(orderForm: IOrderDetails): Observable<any> {
        const detailsForm: IOrderDetails = Object.assign({}, orderForm);
        delete detailsForm.orders;
        const orderProducts: IProductOrderDetails[] = [...orderForm.orders];
        return this.insertOrderApiService.enterNewPnPOrderDetails(orderForm).pipe(
            concatMap(response => {
                if ('error' in response) {
                    this.ordersNotInsertedArray.push(orderForm);
                    this.ordersNotInserted.next(this.ordersNotInsertedArray);
                    return of(['No data was inserted for order number:', orderForm.orderNumber]);
                } else {
                    return of(this.addUserIdAndOrderIdToProductAmounts(orderProducts, response)).pipe(
                        concatMap(data => this.insertOrderApiService.enterPnPProductAmounts(data))
                        );
                }
            }),
            tap(result => console.log('The returning data = ', result))
        );
    }

    addUserIdAndOrderIdToProductAmounts(productAmounts: IProductOrderDetails[], orderid): IProductOrderDetails[] {
        for (let prod = 0; prod < productAmounts.length; prod++) {
            productAmounts[prod].orderDetailsid = orderid.id;
            productAmounts[prod].userid = JSON.parse(localStorage.getItem('userID'));
        }
        return productAmounts;
    }

    deleteProductFromOrder(amountid: number) {
        this.insertOrderApiService.deleteProductFromOrder(amountid).subscribe(
            data => console.log('Alfa(delete return data) = ', data)
        );
    }

}
