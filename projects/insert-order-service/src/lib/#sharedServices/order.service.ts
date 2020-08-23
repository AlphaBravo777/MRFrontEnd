import { Injectable } from '@angular/core';
import { of, Observable, from, BehaviorSubject } from 'rxjs';
import { tap, concatMap, take } from 'rxjs/operators';
import { IOrderDetails, IWeeklyOrdersDetails, IInserOrderErrors } from './interfaces/order-service-Interfaces';
import { InsertOrderApiService } from './insert-order-api.service';
import { IProductOrderDetails, IProductDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { ProductSharedApiService } from 'src/app/home/shared/services/productServices/product-shared-api.service';
import { AccountSharedApiService } from 'src/app/home/shared/services/accountServices/account-shared-api.service';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { RoutesSharedApiService } from 'src/app/home/shared/services/routesServices/routes-shared-api.service';
import { OrderGraphqlApiService } from './order-graphql-api.service';
import { IViewRoutesData } from '../view-orders/1#view-order-services/view-order-interface';
import { DocumentNode } from 'graphql';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private insertOrderApiService: InsertOrderApiService,
        private productSharedAPIService: ProductSharedApiService,
        private accountSharedAPIService: AccountSharedApiService,
        private routesSharedAPIService: RoutesSharedApiService,
        private orderGraphQlApiService: OrderGraphqlApiService
        ) {}

    private ordersInserted = new BehaviorSubject<IOrderDetails[]>([]);
    currentOrdersInserted$ = this.ordersInserted.asObservable();
    private ordersNotInserted = new BehaviorSubject<IOrderDetails[]>([]);
    currentOrdersNotInserted$ = this.ordersNotInserted.asObservable();
    private unknownProducts = new BehaviorSubject<IProductOrderDetails[]>([]);
    currentUnknownProducts$ = this.unknownProducts.asObservable();
    // ordersNotInsertedArray: IOrderDetails[] = [];


    insertNewOrderAndProducts(orders: IOrderDetails[]): Observable<any> {
        console.log('Bravo(c) = ', JSON.parse(JSON.stringify(orders)));
        let products: IProductOrderDetails[];
        return from(orders).pipe(
            // concatMap(order => this.insertOrderApiService.sendOrderDetailsToKafka(order)),
            tap(order => products = JSON.parse(JSON.stringify(order.orders))),
            tap(order => order.orders = null),
            concatMap(order => this.insertOrderApiService.enterNewOrderDetails(order)),
            concatMap(response => {
                if ('error' in response) {
                    return of(response);
                } else {
                    return this.insertProductAmounts(products, response);
                }
            })
        );
    }

    insertProductAmounts(products: IProductOrderDetails[], orderDetails: IOrderDetails): Observable<any> {
        console.log('Bravo(Insert product amouts) = ', JSON.parse(JSON.stringify(products)));
        products.forEach(product => product.orderDetailsid = orderDetails.orderid);
        return this.insertOrderApiService.enterProductAmounts(products).pipe(
            tap(response => console.log('Bravo(b) = ', response)),
        );
    }

    changeOrderDetails(orders: IOrderDetails[]): Observable<IOrderDetails> {
        console.log('Bravo(c) = ', JSON.parse(JSON.stringify(orders)));
        return from(orders).pipe(
            tap(order => order.orders = null),
            concatMap(order => this.insertOrderApiService.enterNewOrderDetails(order)),
        );
    }

    searchForOrder(datePackage: IDate, accountid: number): Observable<IOrderDetails[]> {  // IOrderDetails
        console.log('The date package = ', datePackage, accountid);
        return this.insertOrderApiService.searchForOrder(datePackage, accountid).pipe(
            take(1),
            tap(order => console.log('Alfa (returned order) = ', order)),
        );
    }

    searchForOrdersMain(accountid: number, datePackage: IDate,
            routeid: number, queryString: DocumentNode, headers = {}): Observable<IOrderDetails[]> {
        return this.orderGraphQlApiService.searchForOrdersMain(accountid, datePackage, routeid, queryString, headers);
    }

    setOrdersNotInserted(orders: IOrderDetails[]) {
        // this is just data and not api services, so should be refractured into a data$ service
        this.ordersNotInserted.next(orders);
    }

    setOrdersInserted(orders: IOrderDetails[]) {
        // this is just data and not api services, so should be refractured into a data$ service
        this.ordersInserted.next(orders);
    }

    setUnknownProducts(products: IProductOrderDetails[]) {
        // this is just data and not api services, so should be refractured into a data$ service
        this.unknownProducts.next(products);
    }

    deleteProductFromOrder(amountid: number) {
        this.insertOrderApiService.deleteProductFromOrder(amountid).subscribe(
            data => console.log('Alfa(delete product return data) = ', data)
        );
    }

    getProductListToPickFromForAccount(account: IAccountDetails): Observable<IProductDetails[]> {
        return this.productSharedAPIService.getProductsOfProductGroup(account.productGroupid.ID).pipe(
            take(1),
            tap(data => console.log('getProductsOfProductGroup = ', data)),
        );
    }

    getUserInputAccountOrCommonName(accountMRid: string, accountString: string): Observable<IAccountDetails[]> {
        return this.accountSharedAPIService.searchAccountsOrCommonNames(accountMRid, accountString).pipe(
            take(1),
            tap(data => console.log('getUserInputCommonNameAccounts = ', data))
        );
    }

    getAllRoutes(): Observable<IRoute[]> {
        return this.routesSharedAPIService.getAllRoutes();
    }

    getWeeklyOrders(datePackage: IDate): Observable<IWeeklyOrdersDetails[]> {
        return this.orderGraphQlApiService.getWeeklyOrders(datePackage);
    }

    getAccountFromAccountid(accountid: number): Observable<IAccountDetails> {
        return this.accountSharedAPIService.getAccountByAccountid(accountid).pipe();
    }

    updateRouteDate(route: IViewRoutesData, currentDatePackage: IDate, newDatePackage: IDate): Observable<IInserOrderErrors> {
        console.log('The route change data = ', route, currentDatePackage);
        return this.insertOrderApiService.updateRouteDate(route, currentDatePackage, newDatePackage);
    }

}
