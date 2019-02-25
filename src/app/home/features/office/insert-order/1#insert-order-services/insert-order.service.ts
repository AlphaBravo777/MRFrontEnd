import { Injectable } from '@angular/core';
import { InsertOrderApiService } from './insert-order-api.service';
import { Observable, of, interval } from 'rxjs';
import { take, debounceTime, concatMap, tap } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderService {

    constructor(private insertOrderApiService: InsertOrderApiService, private dateService: GetDate$Service) {}

    searchForAccount(semiAccountID): Observable<any> {
        return this.insertOrderApiService.searchForAccount(semiAccountID.toLowerCase()).pipe(
            take(1)
        );
    }

    getAccountProducts(accountID): Observable<any> {
        return this.insertOrderApiService.getAccountProducts(accountID).pipe(
            take(1),
            tap(data => console.log('The products for the selected account = ', data))
        );
    }

    insertNewOrder(orderForm) {
        const submitOrdersArray = orderForm.orders.filter(order => order.allowed !== false);
        orderForm.orders = [... submitOrdersArray];
        this.dateService.currentDatePackage$.pipe(
            take(1),
            tap((data) => console.log('The timestamp = ', data)),
            tap(data => {
                orderForm.timeStampID = data.nodeID;
                orderForm.timeStampid = data.id;
                orderForm.shortDate = data.shortDate;
            }),
            tap(() => console.log('This is the form that will be inserted: ', orderForm))
        ).subscribe();
    }


}
