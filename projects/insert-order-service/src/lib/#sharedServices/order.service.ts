import { Injectable } from '@angular/core';
import { of, Observable, from, BehaviorSubject } from 'rxjs';
import { tap, concatMap, take } from 'rxjs/operators';
import { IOrderDetails } from './insert-order-service-Interfaces';
import { InsertOrderApiService } from './insert-order-api.service';
import { IProductOrderDetails, IProductDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { ProductSharedApiService } from 'src/app/home/shared/services/productServices/product-shared-api.service';
import { AccountSharedApiService } from 'src/app/home/shared/services/accountServices/account-shared-api.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private insertOrderApiService: InsertOrderApiService,
        private productSharedAPIService: ProductSharedApiService,
        private accountSharedAPIService: AccountSharedApiService) {}

    private ordersNotInserted = new BehaviorSubject<IOrderDetails[]>([]);
    currentOrdersNotInserted$ = this.ordersNotInserted.asObservable();
    ordersNotInsertedArray: IOrderDetails[] = [];

    insertNewOrder(orders: IOrderDetails[]): Observable<any> {
        console.log('Bravo(c) = ', JSON.parse(JSON.stringify(orders)));
        let products: IProductOrderDetails[];
        return from(orders).pipe(
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

    searchForOrder(datePackage: IDate, accountid: number): Observable<IOrderDetails> {  // IOrderDetails
        console.log('The date package = ', datePackage);
        return this.insertOrderApiService.searchForOrder(datePackage, accountid).pipe(
            take(1),
            tap(order => console.log('Alfa (returned order) = ', order)),
        );
    }

    setOrdersNotInserted(orders: IOrderDetails[]) {
        // this is just data and not api services, so should be refractured into a data$ service
        this.ordersNotInserted.next(orders);
    }

    deleteProductFromOrder(amountid: number) {
        this.insertOrderApiService.deleteProductFromOrder(amountid).subscribe(
            data => console.log('Alfa(delete product return data) = ', data)
        );
    }

    deleteOrder(orderid: number) {
        this.insertOrderApiService.deleteOrder(orderid).subscribe(
            data => console.log('Alfa(delete order return data) = ', data)
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

}
