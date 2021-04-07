import { Injectable } from '@angular/core';
import { OrderService } from '../../#sharedServices/order.service';
import { InsertFormChangesService } from './insert-form-changes.service';
import { take, tap, switchMap, delay, map } from 'rxjs/operators';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { InsertOrderData$Service } from './insert-order-data$.service';
import { Observable, of } from 'rxjs';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { FormGroup, FormArray } from '@angular/forms';
import { InsertOrderApiService } from '../../#sharedServices/insert-order-api.service';
import { IAccountDetails } from 'projects/accounts-service/src/lib/#sharedServices/interfaces/account-interface';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderService {

    constructor(private orderService: OrderService,
        private insertFormChangesService: InsertFormChangesService,
        private insertOrderService: OrderService,
        private insertOrderData$Service: InsertOrderData$Service,
        private insertOrderApiService: InsertOrderApiService) {}

    datePackageOrAccountChanged(workingAccount: IAccountDetails, datePackage: IDate): Observable<any> {
        console.log(' - - - - - Account Selection is running - - - - - ', workingAccount);
        if (workingAccount) {
            console.log('There IS a working account');
            return this.setNewAccountDetails(workingAccount, datePackage).pipe();
        } else { // If there is no current selected account, then it is only the date that changed, or invalid account id
            this.insertFormChangesService.resetOrderForm();
            return of([]);
        }
    }

    private setNewAccountDetails(workingAccount: IAccountDetails, datePackage: IDate): Observable<any> {
        this.insertFormChangesService.resetOrderForm();
        this.insertFormChangesService.insertDatesAndUser(datePackage);
        this.insertFormChangesService.insertAccountDetails(workingAccount);
        return this.checkIfAccountHasAnOrder(workingAccount, datePackage).pipe();
    }

    private checkIfAccountHasAnOrder(account: IAccountDetails, datePackage: IDate): Observable<IOrderDetails|any> {
        console.log('Selected account = ', account, datePackage);
        return this.orderService.getProductListToPickFromForAccount(account).pipe(
            take(1),
            tap(productListToPickFrom => this.insertFormChangesService.insertProductsToPickFrom(productListToPickFrom)),
            tap(productListToPickFrom => this.insertOrderData$Service.setProductListToPickFrom(productListToPickFrom)),
            switchMap(() => this.insertOrderService.searchForOrder(datePackage, account.accountid)),
            switchMap(orders => {
                if (orders) {
                    if (orders.length === 1) {
                        let route: IRoute;
                        return this.insertOrderData$Service.currentRoutes$.pipe(
                            tap(routes => route = routes.find(r => r.routeid === orders[0].routeid)),
                            tap(() => this.insertFormChangesService.insertExistingOrder(orders[0], route)),
                            map(() => orders[0])
                        );
                    } else {
                        this.insertOrderData$Service.setOrderNumbers(orders);
                        // This is where we want to run a function that goes through the orders and shows it as ordernumber
                        // for the user to pick
                        return of(orders[0]);
                    }

                } else {
                    return of();
                }
            }),
        );
    }



    userAccountidSelection(accountMRid: string, commonName: string): Observable<IAccountDetails[]> {
            return of([]).pipe(
                take(1),
                delay(500),
                switchMap(() => this.orderService.getUserInputAccountOrCommonName(accountMRid, commonName)),
                tap(accounts => this.insertOrderData$Service.setAccountsToPickFrom(accounts))
            );
        }

    changeAmountMeasurementToUnitsIfCurrentlyKgs(orderForm: FormGroup, routeForm: FormGroup) {
        if (routeForm.get('productUnitMeasurement').value === 2) {
            const orderedProducts = <FormArray>orderForm.controls.orders;
            for (const control of orderedProducts['controls']) {
                control.get('amount').setValue(Math.floor(control.get('amount').value / control.get('packageWeight').value));
            }
        }
    }

    deleteOrder(order: IOrderDetails) {
        // const orderAccount: IAccountDetails = Object.assign({}, order);
        this.insertOrderApiService.deleteOrder(order.orderid).pipe(
            take(1),
            tap(() => this.insertOrderData$Service.setWorkingAccount(null))
        ).subscribe(
            data => console.log('Alfa(delete order return data) = ', data)
        );
    }
}
