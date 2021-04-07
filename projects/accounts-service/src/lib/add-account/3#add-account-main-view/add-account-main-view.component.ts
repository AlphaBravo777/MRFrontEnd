import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@ng-stack/forms';
import { IAccountFrontend } from '../../#sharedServices/interfaces/account-interface';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { IFranchise } from '../../#sharedServices/interfaces/franchise-interface';
import { IProductGroupName } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';
import { AccountService } from '../../#sharedServices/account.service';
import { take, tap } from 'rxjs/operators';
import { AddAccountFormService } from '../1#add-account-services/add-account-form.service';
import { subscribe } from 'graphql';

@Component({
    selector: 'acc-lib-add-account-main-view',
    templateUrl: './add-account-main-view.component.html',
    styleUrls: ['./add-account-main-view.component.scss'],
})
export class AddAccountMainViewComponent implements OnInit {

    @Input() accountMainForm: FormGroup<IAccountFrontend>;
    @Input() routes: IRoute[];
    @Input() franchises: IFranchise[];
    @Input() productGroupNames: IProductGroupName[];
    totalAccounts: IAccountFrontend[] = [];
    parentAccounts: IAccountFrontend[] = [];

    constructor(private accountService: AccountService,
        private addAccountFormService: AddAccountFormService) { }

    ngOnInit() {
        console.log('Account Form = ', this.accountMainForm);
    }

    routeSelection(routeid: number) {
        this.accountMainForm.get('routeid').setValue(routeid);
    }

    franchiseSelection(franchiseid: number) {
        this.accountMainForm.get('franchiseid').setValue(franchiseid);
    }

    productGroupNameSelection(productGroupid: number) {
        this.accountMainForm.get('productGroupid').setValue(productGroupid);
    }

    userAccountidSelection(data: string) {
        console.log('Account id was hit', data);
        data = data.toUpperCase();
        if (data) {
            this.accountService.getSingleAccountData(data).pipe(
                take(1),
                tap(account => {
                    if (account.length === 1) {
                        this.addAccountFormService.insertAccountData(account[0]);
                    } else if (account.length > 1) {
                        this.totalAccounts = account;
                    } else {
                        this.addAccountFormService.clearAccountFormButNotid();
                    }
                })
            ).subscribe();
        } else {
            this.addAccountFormService.clearAccountFormButNotid();
        }
    }

    parentAccountidSelection(data: string) {
        console.log('Parent id was hit', data);
        data = data.toUpperCase();
        if (data) {
            this.accountService.getSingleAccountData(data).pipe(
                take(1),
                tap(parentAccount => {
                    if (parentAccount.length === 1) {
                        this.addAccountFormService.insertParentAccountData(parentAccount[0]);
                    } else if (parentAccount.length > 1) {
                        this.parentAccounts = parentAccount;
                    } else {
                        this.addAccountFormService.clearAccountFormButNotid();
                    }
                })
            ).subscribe();
        } else {
            this.addAccountFormService.clearAccountFormButNotid();
        }
    }

    accountSelected(index: number) {
        console.log('There was an account selected', index);
        this.addAccountFormService.insertAccountData(this.totalAccounts[index]);
        this.totalAccounts = [];
    }

    parentAccountSelected(index: number) {
        console.log('There was an account selected', index);
        this.addAccountFormService.insertParentAccountData(this.parentAccounts[index]);
        this.parentAccounts = [];
    }

    submitForm() {
        console.log('The form is going to get submitted');
        this.accountService.submitAccountForm(this.accountMainForm.value).pipe(
            take(1),
            tap(() => this.addAccountFormService.clearAccountForm())
        ).subscribe();
    }

    deleteAccount() {
        console.log(this.accountMainForm.get('accountMRid').value, 'will be deleted');
        this.accountService.deleteAccount(this.accountMainForm.get('accountid').value).pipe(
            take(1),
            tap(() => this.addAccountFormService.clearAccountForm())
        ).subscribe();
    }

}
