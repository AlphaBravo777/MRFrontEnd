import { Injectable } from '@angular/core';
import { AccountGraphqlApiService } from './account-graphql-api.service';
import { IFranchise } from './interfaces/franchise-interface';
import { Observable } from 'rxjs';
import { ProductSharedApiService } from 'src/app/home/shared/services/productServices/product-shared-api.service';
import { IProductGroupName } from 'src/app/home/shared/services/productServices/products-interface';
import { IAccountFrontendBasicID, IAccountFrontend } from './interfaces/account-interface';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private accountGraphqlApiService: AccountGraphqlApiService, private productSharedApiService: ProductSharedApiService) { }

    getAllFranchises(): Observable<IFranchise[]> {
        return this.accountGraphqlApiService.getAllFranchises();
    }

    getAllProductGroupNames(): Observable<IProductGroupName[]> {
        return this.productSharedApiService.getAllProductGroupNames();
    }

    getAllAccountMRids(): Observable<IAccountFrontendBasicID[]> {
        return this.accountGraphqlApiService.getAllAccountMRids();
    }

    getSingleAccountData(accountMRid): Observable<IAccountFrontend> {
        return this.accountGraphqlApiService.getSingleAccountData(accountMRid);
    }

}
