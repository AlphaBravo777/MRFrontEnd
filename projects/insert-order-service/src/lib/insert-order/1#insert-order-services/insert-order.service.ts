import { Injectable } from '@angular/core';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { ProductSharedApiService } from 'src/app/home/shared/services/productServices/product-shared-api.service';
import { OrderService } from '../../#sharedServices/order.service';
import { InsertFormChangesService } from './insert-form-changes.service';
import { take, tap, switchMap, delay, map, concatMap } from 'rxjs/operators';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { InsertOrderData$Service } from './insert-order-data$.service';
import { Observable, of } from 'rxjs';
import { IOrderDetails } from '../../#sharedServices/insert-order-service-Interfaces';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderService {

    constructor(private orderService: OrderService,
        private insertFormChangesService: InsertFormChangesService,
        private insertOrderService: OrderService,
        private insertOrderData$Service: InsertOrderData$Service) {}

    datePackageOrAccountChanged(workingAccount: IAccountDetails, datePackage: IDate): Observable<any> {
        console.log(' - - - - - Account Selection is running - - - - - ', workingAccount);
        if (workingAccount) {
            console.log('There IS a working account');
            return this.setNewAccountDetails(workingAccount, datePackage).pipe();
        } else { // If there is no current selected account, then it is only the date that changed, or invalid account id
            return of([]);
        }
    }

    setNewAccountDetails(workingAccount: IAccountDetails, datePackage: IDate): Observable<any> {
        this.insertFormChangesService.resetForm();
        this.insertFormChangesService.insertDatesAndUser(datePackage);
        this.insertFormChangesService.insertAccountDetails(workingAccount);
        return this.checkIfAccountHasAnOrder(workingAccount, datePackage).pipe();
    }

    checkIfAccountHasAnOrder(account: IAccountDetails, datePackage: IDate): Observable<IOrderDetails> {
        console.log('Selected account = ', account, datePackage);
        return this.orderService.getProductListToPickFromForAccount(account).pipe(
            take(1),
            tap(productListToPickFrom => this.insertFormChangesService.insertProductsToPickFrom(productListToPickFrom)),
            switchMap(() => this.insertOrderService.searchForOrder(datePackage, account.accountid)),
            tap(order => {
                if (order) {
                    this.insertFormChangesService.insertExistingOrder(order);
                }
            }),
        );
    }

    // What we want to do is when the user changes the accountMRid, it comes here where we debuonce it for .5 sec,
    // then we send the accountMRid or commonName to be searched, then the results we put in a data$ observable,
    // and then our accounts component can just subscribe to that observable adn display the names in the component

    userAccountidSelection(accountMRid: string, commonName: string): Observable<IAccountDetails[]> {
        // let refinedAccountsArray: IAccountDetails[] = [];
        // if (accountMRid || commonName) {
            return of([]).pipe(
                take(1),
                delay(500),
                switchMap(() => this.orderService.getUserInputAccountOrCommonName(accountMRid, commonName)),
                tap(accounts => this.insertOrderData$Service.setAccountsToPickFrom(accounts))
                // tap(data => refinedAccountsArray = data),
                // tap(() => {
                //     if (refinedAccountsArray.length === 1) {
                //         console.log('One entry');
                //         // this.accountSelection(this.refinedAccountsArray[0]);
                //     } else if (refinedAccountsArray.length === 0) {
                //         console.log('Zero entries');
                //         // this.insertFormChangesService.clearAccountMainValues();
                //         // this.insertFormChangesService.getInsertForm();
                //     } else {
                //         console.log('Running');
                //         this.insertOrderData$Service.setAccountsToPickFrom(refinedAccountsArray);
                //     }
                // })
            );
        }
    // }
}
