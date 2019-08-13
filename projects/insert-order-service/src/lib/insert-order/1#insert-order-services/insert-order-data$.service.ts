import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoutesSharedApiService } from 'src/app/home/shared/services/routesServices/routes-shared-api.service';
import { take, tap } from 'rxjs/operators';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { AccountSharedApiService } from 'src/app/home/shared/services/accountServices/account-shared-api.service';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { ProductSharedApiService } from 'src/app/home/shared/services/productServices/product-shared-api.service';
import { IProductDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderData$Service {

    private routes = new BehaviorSubject<IRoute[]>(null);
    currentRoutes$ = this.routes.asObservable();
    private productListToPickFrom = new BehaviorSubject<IProductDetails[]>(null);
    productListToPickFrom$ = this.productListToPickFrom.asObservable();

    constructor(private routesSharedAPIService: RoutesSharedApiService,
        private accountSharedAPIService: AccountSharedApiService,
        private productSharedAPIService: ProductSharedApiService) {
        this.getRoutes();
    }

    getRoutes() {
        this.routesSharedAPIService.getAllRoutes().pipe(
            take(1),
            tap(data => this.routes.next(data))
        ).subscribe();
    }

    getUserInputAccountOrCommonName(accountMRid: string, accountString: string): Observable<IAccountDetails[]> {
        return this.accountSharedAPIService.searchAccountsOrCommonNames(accountMRid, accountString).pipe(
            take(1),
            tap(data => console.log('getUserInputCommonNameAccounts = ', data))
        );
    }

    getProductListToPickFromForAccount(account: IAccountDetails): Observable<IProductDetails[]> {
        return this.productSharedAPIService.getProductsOfProductGroup(account.productGroupid.ID).pipe(
            take(1),
            tap(data => console.log('getProductsOfProductGroup = ', data)),
            tap(data => this.productListToPickFrom.next(data))
        );
    }

}
