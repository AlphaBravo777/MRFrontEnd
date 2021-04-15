import { Injectable } from '@angular/core';
import { of, Observable, from, BehaviorSubject } from 'rxjs';
import { tap, concatMap, take } from 'rxjs/operators';
import { IOrderDetails, IWeeklyOrdersDetails, IInserOrderErrors } from './interfaces/order-service-Interfaces';
import { InsertOrderApiService } from './insert-order-api.service';
import { IProductOrderDetails, IProductDetails } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { RoutesSharedApiService } from 'src/app/home/shared/services/routesServices/routes-shared-api.service';
import { OrderGraphqlApiService } from './order-graphql-api.service';
import { IViewRoutesData } from '../view-orders/1#view-order-services/view-order-interface';
import { DocumentNode } from 'graphql';
import { ProductGraphqlApiService } from 'projects/product-service/src/lib/#shared-services/product-graphql-api.service';
import { IAccountDetails } from 'projects/accounts-service/src/lib/#sharedServices/interfaces/account-interface';
import { AccountGraphqlApiService } from 'projects/accounts-service/src/lib/#sharedServices/account-graphql-api.service';
import { InsertOrderData$Service } from '../insert-order/1#insert-order-services/insert-order-data$.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private insertOrderApiService: InsertOrderApiService,
        private productGraphqlApiService: ProductGraphqlApiService,
        private routesSharedAPIService: RoutesSharedApiService,
        private orderGraphQlApiService: OrderGraphqlApiService,
        private accountGraphqlApiService: AccountGraphqlApiService,
        private insertOrderData$Service: InsertOrderData$Service
        ) {
            this.getAllRoutes().pipe(
                take(1)
            ).subscribe();
        }


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

    deleteOrder(order: IOrderDetails) {  // There would need to be a cache check when changing order details
        // const orderAccount: IAccountDetails = Object.assign({}, order);
        this.insertOrderApiService.deleteOrder(order.orderid).pipe(
            take(1),
            tap(() => this.insertOrderData$Service.setWorkingAccount(null))
        ).subscribe(
            data => console.log('Alfa(delete order return data) = ', data)
        );
    }

    changeOrderDetails(orders: IOrderDetails[]): Observable<IOrderDetails> {   // There would need to be a cache check when changing order details
        console.log('Bravo(c) = ', JSON.parse(JSON.stringify(orders)));
        return from(orders).pipe(
            tap(order => order.orders = null),
            concatMap(order => this.insertOrderApiService.enterNewOrderDetails(order)),
        );
    }

    deleteProductFromOrder(amountid: number): Observable<any> {
        return this.insertOrderApiService.deleteProductFromOrder(amountid).pipe(
            tap(data => console.log('Alfa(delete product return data) = ', data))
        );
    }

    updateRouteDate(route: IViewRoutesData, currentDatePackage: IDate, newDatePackage: IDate): Observable<IInserOrderErrors> { // There would need to be a cache check when changing order details
        console.log('The route change data = ', route, currentDatePackage);
        return this.insertOrderApiService.updateRouteDate(route, currentDatePackage, newDatePackage);
    }

    searchForOrder(datePackage: IDate, accountid: number): Observable<IOrderDetails[]> {  // IOrderDetails
        console.log('The date package = ', datePackage, accountid);
        return this.orderGraphQlApiService.searchForOrder(datePackage, accountid).pipe(
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



    getProductListToPickFromForAccount(account: IAccountDetails): Observable<IProductDetails[]> {
        return this.productGraphqlApiService.getProductsOfProductGroup(account.productGroupid.ID).pipe(
            take(1),
            tap(data => console.log('* * * * * * * * getProductsOfProductGroup = ', account.productGroupid.ID, data)),
        );
    }

    getUserInputAccountOrCommonName(accountMRid: string, accountString: string): Observable<IAccountDetails[]> {
        return this.accountGraphqlApiService.searchAccountsOrCommonNames(accountMRid, accountString).pipe(
            take(1),
            tap(data => console.log('getUserInputCommonNameAccounts = ', data))
        );
    }

    getAllRoutes(): Observable<IRoute[]> {
        return this.routesSharedAPIService.getAllRoutes().pipe(
            tap(routes => this.insertOrderData$Service.setRoutes(routes)),
        )
    }

    getWeeklyOrders(datePackage: IDate): Observable<IWeeklyOrdersDetails[]> {
        return this.orderGraphQlApiService.getWeeklyOrders(datePackage);
    }

    getAccountFromAccountid(accountid: number): Observable<IAccountDetails> {
        return this.accountGraphqlApiService.getAccountByAccountid(accountid).pipe();
    }



}
