import { Injectable } from '@angular/core';
import { IAccountFrontend } from '../../#sharedServices/interfaces/account-interface';
import { FormGroup, FormControl, Validators } from '@ng-stack/forms';

@Injectable({
    providedIn: 'root'
})
export class AddAccountFormService {

    accountForm: FormGroup<IAccountFrontend>;

    constructor() { }

    createAccountForm(): FormGroup<IAccountFrontend> {
        this.accountForm = new FormGroup<IAccountFrontend>({
            accountid: new FormControl(null),
            accountMRid: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            commonName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            accountName: new FormControl(null),
            accountID: new FormControl(null),
            parentAccountid: new FormControl(null),
            parentAccountMRid: new FormControl(null),
            accountAccessDBid: new FormControl(null),
            routeid: new FormControl(null, [Validators.required]),
            routeName: new FormControl(null),
            productGroupid: new FormControl(null, [Validators.required]),
            franchiseid: new FormControl(null, [Validators.required]),
            franchiseName: new FormControl(null),
            franchiseRanking: new FormControl(null),
            rankingInFranchise: new FormControl(null),
        });
        return this.accountForm;
    }

    insertAccountData(account: IAccountFrontend) {
        this.accountForm.get('accountid').setValue(account.accountid);
        this.accountForm.get('accountMRid').setValue(account.accountMRid);
        this.accountForm.get('routeid').setValue(account.routeid);
        this.accountForm.get('franchiseid').setValue(account.franchiseid);
        this.accountForm.get('commonName').setValue(account.commonName);
        this.accountForm.get('productGroupid').setValue(account.productGroupid);
        this.accountForm.get('parentAccountMRid').setValue(account.parentAccountMRid);
        this.accountForm.get('parentAccountid').setValue(account.parentAccountid);
    }

    insertParentAccountData(account: IAccountFrontend) {
        this.accountForm.get('parentAccountMRid').setValue(account.accountMRid);
        this.accountForm.get('parentAccountid').setValue(account.accountid);
    }

    clearAccountFormButNotid() {
        const accountMRid = this.accountForm.get('accountMRid').value;
        this.accountForm.reset();
        this.accountForm.get('accountMRid').setValue(accountMRid);
    }

    clearParentAccountFields() {
        this.accountForm.get('parentAccountMRid').setValue(null);
        this.accountForm.get('parentAccountid').setValue(null);
    }

    clearAccountForm() {
        this.accountForm.reset();
    }
}
