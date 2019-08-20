import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

    constructor() {}

    setRoutes(routes: IRoute[]) {
        this.routes.next(routes);
    }

    setAccountsToPickFrom(accounts: IAccountDetails[]) {
        this.accountsToPickFrom.next(accounts);
    }

    setWorkingAccount(account: IAccountDetails) {
        this.workingAccount.next(account);
    }



}
