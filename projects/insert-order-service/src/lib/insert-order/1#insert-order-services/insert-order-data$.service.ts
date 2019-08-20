import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoutesSharedApiService } from 'src/app/home/shared/services/routesServices/routes-shared-api.service';
import { take, tap } from 'rxjs/operators';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { IProductDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderData$Service {

    // A data service should almost not have to subscribe to any other service, else you are doing it wrong
    // It is like a temp database (and a database does not depend on other services) that just recieves data,
    // and gives it back as necessary.

    private workingAccount = new BehaviorSubject<IAccountDetails>(null);
    currentWorkingAccount$ = this.workingAccount.asObservable();
    private accountsToPickFrom = new BehaviorSubject<IAccountDetails[]>([]);
    returnedAccountsFromDBToPickFrom$ = this.accountsToPickFrom.asObservable();
    private routes = new BehaviorSubject<IRoute[]>(null);
    currentRoutes$ = this.routes.asObservable();
    private productListToPickFrom = new BehaviorSubject<IProductDetails[]>(null);
    productListToPickFrom$ = this.productListToPickFrom.asObservable();

    constructor(private routesSharedAPIService: RoutesSharedApiService,
        ) {
        this.getRoutes();
    }

    // Refracrute this out, since it is depending on another service. Just let data.component call a method in
    // insert-order-service to populate this observable, and then insert it here.
    getRoutes() {
        this.routesSharedAPIService.getAllRoutes().pipe(
            take(1),
            tap(data => this.routes.next(data))
        ).subscribe();
    }

    setAccountsToPickFrom(accounts: IAccountDetails[]) {
        this.accountsToPickFrom.next(accounts);
    }

    setWorkingAccount(account: IAccountDetails) {
        this.workingAccount.next(account);
    }



}
