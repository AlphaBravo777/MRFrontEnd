import { Injectable } from '@angular/core';
import { of, Observable, from, BehaviorSubject } from 'rxjs';
import { tap, concatMap, map, take } from 'rxjs/operators';
import { IOrderDetails, IProductOrderDetails } from './insert-order-service-Interfaces';
import { InsertOrderApiService } from './insert-order-api.service';
import { DatePickerService } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-picker.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { DialogBoxService } from 'src/app/home/core/dialog-box/dialog-box.service';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderService {
    constructor(private insertOrderApiService: InsertOrderApiService,
        private datePickerService: DatePickerService,
        private getDateService: GetDate$Service,
        private dialogBoxService: DialogBoxService) {}

    private ordersNotInserted = new BehaviorSubject<IOrderDetails[]>([]);
    currentOrdersNotInserted$ = this.ordersNotInserted.asObservable();
    ordersNotInsertedArray: IOrderDetails[] = [];

    /*
        * Inserting orders and giving popup feedback one-for-one is turning out to be to problematic. Just capture the orders that have not
        been inserted into an array, and then right under the insert button display all the orders nicely.
        * Sort out if there are more than 3 orders for a day. Say two deli's and a premium
        * Next step will also be to make let Andelines orders that she reads in be inserted into the mysql database as well.
    */

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
