import { Component, OnInit } from '@angular/core';
import { RoutesSharedApiService } from 'src/app/home/shared/services/routesServices/routes-shared-api.service';
import { tap, concatMap } from 'rxjs/operators';
import { AccountService } from '../../#sharedServices/account.service';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { IFranchise } from '../../#sharedServices/interfaces/franchise-interface';
import { IProductGroupName } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';
import { AddAccountFormService } from '../1#add-account-services/add-account-form.service';
import { IAccountFrontend } from '../../#sharedServices/interfaces/account-interface';
import { FormGroup } from '@ng-stack/forms';

@Component({
    selector: 'acc-lib-add-account-data',
    templateUrl: './add-account-data.component.html',
    styleUrls: ['./add-account-data.component.scss']
})
export class AddAccountDataComponent implements OnInit {

    routes: IRoute[];
    franchises: IFranchise[];
    productGroupNames: IProductGroupName[];
    accountMainForm: FormGroup<IAccountFrontend>;

    constructor(private routeSharedApiService: RoutesSharedApiService,
        private accountService: AccountService,
        private addAccountFormService: AddAccountFormService) { }

    ngOnInit() {
        this.getAccountForm();
        this.getInitialData();
    }

    getAccountForm() {
        this.accountMainForm = this.addAccountFormService.createAccountForm();
    }

    getInitialData() {
        this.routeSharedApiService.getAllRoutes().pipe(
            tap(routes => this.routes = routes),
            concatMap(() => this.accountService.getAllFranchises()),
            tap(franchises => this.franchises = franchises),
            concatMap(() => this.accountService.getAllProductGroupNames()),
            tap((productGroupNames => this.productGroupNames = productGroupNames))
        ).subscribe();
    }

}

// accountMRid
// accountName
// commonName
// parentAccountid
// routeid
// productGroupid
// accountAccessDBid
// franchise
