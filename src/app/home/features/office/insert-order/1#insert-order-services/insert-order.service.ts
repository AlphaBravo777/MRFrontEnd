import { Injectable } from '@angular/core';
import { InsertOrderApiService } from './insert-order-api.service';
import { Observable } from 'rxjs';
import { take, concatMap, tap, map } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { IOrderDetails } from 'projects/insert-order-service/src/lib/#sharedServices/insert-order-service-Interfaces';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderService {

    constructor(private insertOrderApiService: InsertOrderApiService, private dateService: GetDate$Service) {}

    searchForAccount(semiAccountID): Observable<IAccountDetails[]> {
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
                orderForm.orderDate = data.shortDate;
                orderForm.userid =  JSON.parse(localStorage.getItem('userID'));
            }),
            tap(() => console.log('This is the form that will be inserted: ', orderForm)),
            concatMap(() => this.insertDetailsAndProductAmounts(orderForm))
        ).subscribe();
    }

    insertDetailsAndProductAmounts(orderForm: IOrderDetails): Observable<any> {
        const detailsForm = Object.assign({}, orderForm);
        delete detailsForm.orders;
        const productAmounts = [... orderForm.orders];
        console.log('The order details without orders = ', detailsForm);
        return this.insertOrderApiService.enterNewOrderDetails(orderForm).pipe(
            tap(data => console.log('The returning data = ', data)),
            map(data => this.addDataToProductAmounts(productAmounts, data)),
            tap(data => console.log('Alpha - The returning data = ', data)),
            concatMap(data => this.insertOrderApiService.enterProductAmounts(data))
        );
    }

    addDataToProductAmounts(productAmounts, data) {
        for (let prod = 0; prod < productAmounts.length; prod++) {
            productAmounts[prod].orderDetailsid = data.id;
            productAmounts[prod].userid =  JSON.parse(localStorage.getItem('userID'));
        }
        return productAmounts;
    }

}
