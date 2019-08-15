import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InsertOrderData$Service } from '../../1#insert-order-services/insert-order-data$.service';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { tap, take, switchMap, concatMap } from 'rxjs/operators';
import { InsertFormChangesService } from '../../1#insert-order-services/insert-form-changes.service';
import { InsertOrderService } from '../../../#sharedServices/insert-order.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IProductDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Component({
    selector: 'mr-insert-account-view',
    templateUrl: './account-view.component.html',
    styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {

    @Input() accountMRidFormControl: FormControl;
    @Input() commonNameFormControl: FormControl;
    @Input() orderNumberFormControl: FormControl;
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
        private insertOrderService: InsertOrderService,
        private getDateService: GetDate$Service) {}

    ngOnInit() {}

    accountSelection(account: IAccountDetails) {
        console.log('Selected account = ', account);
        let prodListToPickFrom: IProductDetails[] = [];
        this.insertFormChangesService.changeAccountDetails(account);
        this.insertFormChangesService.changeFormProductGroup(account.productGroupid);
        this.insertOrderData$Service.getProductListToPickFromForAccount(account).pipe(
            take(1),
            tap(productListToPickFrom => prodListToPickFrom = productListToPickFrom),
            tap(productListToPickFrom => this.insertFormChangesService.insertProductsToPickFrom(productListToPickFrom)),
            concatMap(() => this.getDateService.currentDatePackage$),
            switchMap((datePackage) => this.insertOrderService.searchForOrder(datePackage, account.accountid)),
            tap(order => {
                if (order) {
                    this.insertFormChangesService.insertProductsToPickFrom(prodListToPickFrom);
                    // Here we first have to insert a new productslist to choose from.
                    this.insertFormChangesService.insertExistingOrder(order);
                }
            })
        ).subscribe();
        this.refinedAccountsArray = [];
        this.refinedAccountsCommonNameArray = [];
    }

    userAccountidSelection(accountMRid: string) {
        this.refinedAccountsArray = [];
        if (accountMRid) {
            this.insertOrderData$Service.getUserInputAccountOrCommonName(accountMRid, undefined).pipe(
                tap(data => this.refinedAccountsArray = data),
                tap(() => {
                    if (this.refinedAccountsArray.length === 1) {
                        this.accountSelection(this.refinedAccountsArray[0]);
                    } else if (this.refinedAccountsCommonNameArray.length === 0) {
                        this.insertFormChangesService.clearAccountMainValues();
                    }
                })
            ).subscribe();
        }
    }

    userAccountCommonNameSelection(commonName: string) {
        this.refinedAccountsCommonNameArray = [];
        console.log('The commonName string =', commonName);
        if (commonName) {
            this.insertOrderData$Service.getUserInputAccountOrCommonName(undefined, commonName).pipe(
                tap(data => this.refinedAccountsCommonNameArray = data),
                tap(() => {
                    if (this.refinedAccountsCommonNameArray.length === 1) {
                        this.accountSelection(this.refinedAccountsCommonNameArray[0]);
                    } else if (this.refinedAccountsCommonNameArray.length === 0) {
                        this.insertFormChangesService.clearAccountMainValues();
                    }
                })
            ).subscribe();
        }
    }
}
