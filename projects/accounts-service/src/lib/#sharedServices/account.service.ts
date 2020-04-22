import { Injectable } from '@angular/core';
import { AccountGraphqlApiService } from './account-graphql-api.service';
import { IFranchise } from './interfaces/franchise-interface';
import { Observable, of } from 'rxjs';
import { ProductSharedApiService } from 'src/app/home/shared/services/productServices/product-shared-api.service';
import { IProductGroupName } from 'src/app/home/shared/services/productServices/products-interface';
import { IAccountFrontendBasicID, IAccountFrontend, IAccountBackend } from './interfaces/account-interface';
import { map, concatMap } from 'rxjs/operators';
import { AccountApiService } from './account-api.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private accountGraphqlApiService: AccountGraphqlApiService,
        private productSharedApiService: ProductSharedApiService,
        private accountApiService: AccountApiService) { }

    getAllFranchises(): Observable<IFranchise[]> {
        return this.accountGraphqlApiService.getAllFranchises();
    }

    getAllProductGroupNames(): Observable<IProductGroupName[]> {
        return this.productSharedApiService.getAllProductGroupNames();
    }

    getAllAccountMRids(): Observable<IAccountFrontendBasicID[]> {
        return this.accountGraphqlApiService.getAllAccountMRids();
    }

    getSingleAccountData(accountMRid): Observable<IAccountFrontend[]> {
        return this.accountGraphqlApiService.getAllAccountsContainingArgument(accountMRid);
    }

    submitAccountForm(accountForm: IAccountFrontend): Observable<any> {
        console.log('The form that will be submitted is: ', accountForm);
        return of([]).pipe(
            map(() => this.changeAccountFrontendToBackendFactory(accountForm)),
            concatMap(accountBackend => this.accountApiService.submitAccountForm(accountBackend))
        );
    }

    deleteAccount(accountid: number): Observable<any> {
        return this.accountApiService.deleteAccount(accountid);
    }

    changeAccountFrontendToBackendFactory(accountFrontEnd: IAccountFrontend): IAccountBackend {
        const accountBackend: IAccountBackend = {
            id: accountFrontEnd.accountid,
            accountMRid: accountFrontEnd.accountMRid,
            commonName: accountFrontEnd.commonName,
            accountName: accountFrontEnd.commonName,
            franchise: accountFrontEnd.franchiseid,
            parentAccountid: accountFrontEnd.parentAccountid,
            productGroupid: accountFrontEnd.productGroupid,
            routeid: accountFrontEnd.routeid,
            accountAccessDBid: 1,
        };
        return accountBackend;
    }

}
