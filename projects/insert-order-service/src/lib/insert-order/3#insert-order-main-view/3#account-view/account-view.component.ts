import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InsertOrderData$Service } from '../../1#insert-order-services/insert-order-data$.service';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { tap, take } from 'rxjs/operators';
import { InsertFormChangesService } from '../../1#insert-order-services/insert-form-changes.service';
import { OrderService } from '../../../#sharedServices/order.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'mr-insert-account-view',
    templateUrl: './account-view.component.html',
    styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {

    @Input() datePackage: IDate;
    @Input() accountMRidFormControl: FormControl;
    @Input() commonNameFormControl: FormControl;
    @Input() orderNumberFormControl: FormControl;
    subscription: Subscription;
    refinedAccountsArray: IAccountDetails[] = [];
    refinedAccountsCommonNameArray: IAccountDetails[] = [];
    accountMRidPlaceHolderText = 'Start typing account id';
    commonNamePlaceHolderText = 'Start typing account name';
    orderNumberPlaceHolderText = 'Enter order number';
    accountMRidCaption = 'Account/Shop ID';
    commonNameCaption = 'Account/Shop Name';
    orderNumberCaption = 'Order Number';

    constructor(private insertOrderData$Service: InsertOrderData$Service,
        private insertFormChangesService: InsertFormChangesService,
        private orderService: OrderService) {}

    ngOnInit() {
        this.subscription = this.subscribeToListOfAccounts().subscribe();
    }

    subscribeToListOfAccounts(): Observable<any> {
        return this.insertOrderData$Service.returnedAccountsFromDBToPickFrom$.pipe(
            tap(accounts => this.refinedAccountsArray = accounts)
        );
    }

    accountSelection(account: IAccountDetails) {
        this.insertOrderData$Service.setWorkingAccount(account);
        this.refinedAccountsArray = [];
        this.refinedAccountsCommonNameArray = [];
    }

    userAccountidSelection(accountMRid: string) {
        this.refinedAccountsArray = [];
        if (accountMRid) {
            this.orderService.getUserInputAccountOrCommonName(accountMRid, undefined).pipe(
                take(1),
                tap(data => this.refinedAccountsArray = data),
                tap(() => {
                    if (this.refinedAccountsArray.length === 1) {
                        this.accountSelection(this.refinedAccountsArray[0]);
                    } else if (this.refinedAccountsArray.length === 0) {
                        this.insertFormChangesService.resetOrderForm();
                    }
                })
            ).subscribe();
        } else {
            this.insertFormChangesService.resetOrderForm();
        }
    }

    userAccountCommonNameSelection(commonName: string) {
        // this.refinedAccountsCommonNameArray = [];
        // console.log('The commonName string =', commonName);
        // if (commonName) {
        //     this.insertOrderData$Service.getUserInputAccountOrCommonName(undefined, commonName).pipe(
        //         take(1),
        //         tap(data => this.refinedAccountsCommonNameArray = data),
        //         tap(() => {
        //             if (this.refinedAccountsCommonNameArray.length === 1) {
        //                 this.accountSelection(this.refinedAccountsCommonNameArray[0]);
        //             } else if (this.refinedAccountsCommonNameArray.length === 0) {
        //                 // this.insertFormChangesService.clearAccountMainValues();
        //                 // this.insertFormChangesService.getInsertForm();
        //             }
        //         })
        //     ).subscribe();
        // }
    }

    clearOrderNumber() {
        this.insertFormChangesService.insertOrderNumber('');
    }
}
