import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { tap, concatMap, map } from 'rxjs/operators';
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
        const orderProducts = [...orderForm.orders];
        // console.log('The order details without products = ', detailsForm);
        return this.insertOrderApiService.enterNewOrderDetails(orderForm).pipe(
            // tap(orderid => console.log('The returning data = ', orderid)),
            map(orderid => this.addUserIdAndOrderIdToProductAmounts(orderProducts, orderid)),
            // tap(data => console.log('Alpha - The returning data = ', data)),
            concatMap(data => this.insertOrderApiService.enterProductAmounts(data)),
            tap(result => console.log('The returning data = ', result))
        );
    }

    addUserIdAndOrderIdToProductAmounts(productAmounts, orderid): IProductOrderDetails {
        for (let prod = 0; prod < productAmounts.length; prod++) {
            productAmounts[prod].orderDetailsid = orderid.id;
            productAmounts[prod].userid = JSON.parse(localStorage.getItem('userID'));
        }
        return productAmounts;
    }
}
