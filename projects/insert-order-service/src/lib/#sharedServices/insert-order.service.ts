import { Injectable } from '@angular/core';
import { of, Observable, from, BehaviorSubject } from 'rxjs';
import { tap, concatMap, map, take } from 'rxjs/operators';
import { IOrderDetails, IProductOrderDetails } from './insert-order-service-Interfaces';
import { InsertOrderApiService } from './insert-order-api.service';
import { DatePickerService } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-picker.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderService {
    constructor(private insertOrderApiService: InsertOrderApiService,
        private datePickerService: DatePickerService,
        private getDateService: GetDate$Service) {}

    private ordersNotInserted = new BehaviorSubject<IOrderDetails[]>([]);
    currentOrdersNotInserted$ = this.ordersNotInserted.asObservable();
    ordersNotInsertedArray: IOrderDetails[] = [];

    insertNewOrder(orders: IOrderDetails[]): Observable<any> {
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
        return this.insertOrderApiService.enterNewOrderDetails(orderForm).pipe(
            concatMap(response => {
                if ('error' in response) {
                    // this.dialogBoxService.popUpMessage(
                    //     'There was already an order with the order number: ' + orderForm.orderNumber +
                    //     '  ( ' + orderForm.commonName + ' )');
                    this.ordersNotInsertedArray.push(orderForm);
                    this.ordersNotInserted.next(this.ordersNotInsertedArray);
                    return of(['No data was inserted for order number:', orderForm.orderNumber]);
                } else {
                    return of(this.addUserIdAndOrderIdToProductAmounts(orderProducts, response)).pipe(
                        concatMap(data => this.insertOrderApiService.enterProductAmounts(data))
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
}
