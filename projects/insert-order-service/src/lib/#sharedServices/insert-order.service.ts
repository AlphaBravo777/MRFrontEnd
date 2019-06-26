import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { take, tap, concatMap, map } from 'rxjs/operators';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IOrderDetails, IProductOrderDetails } from './insert-order-service-Interfaces';
import { InsertOrderApiService } from './insert-order-api.service';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderService {
    constructor(private insertOrderApiService: InsertOrderApiService) {}


    insertNewOrder(orderForm: IOrderDetails) {
        const tempDatePack: IDate = {id: 827, shortDate: '2019-06-29'};
        of(tempDatePack)
            .pipe(
                take(1),
                tap(data => {
                    // orderForm.timeStampID = data.nodeID;
                    orderForm.timeStampid = data.id;
                    orderForm.orderDate = data.shortDate;
                    orderForm.userid = JSON.parse(
                        localStorage.getItem('userID')
                    );
                }),
                tap(() => console.log('This is the form that will be inserted: ', orderForm)
                ),
                concatMap(() => this.insertDetailsAndProductAmounts(orderForm))
            )
            .subscribe();
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
            concatMap(data =>
                this.insertOrderApiService.enterProductAmounts(data)
            )
        );
    }

    addUserIdAndOrderIdToProductAmounts(productAmounts, orderid): IProductOrderDetails {
        for (let prod = 0; prod < productAmounts.length; prod++) {
            productAmounts[prod].orderDetailsid = orderid.id;
            productAmounts[prod].userid = JSON.parse(localStorage.getItem('userID'));
        }
        return productAmounts;
    }

    // insertUserID(orderForm: IOrderDetails) {
    //     return
    // }
}
