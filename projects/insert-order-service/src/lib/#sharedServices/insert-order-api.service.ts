import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IOrderDetails,
    IOrderDBDetails,
    ff_createOrderDetailsObjectForDB,
    ff_CreateOrderDetailsObjFromDBObj } from './interfaces/order-service-Interfaces';
import { Observable } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { Apollo, gql } from 'apollo-angular-boost';
import { map, take, tap } from 'rxjs/operators';
import { IProductOrderDetails,
    ff_createProductDetailsObjectForDB,
    IProductOrderDBDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { IOrderproductamountsmicroserviceSetNode } from './interfaces/order-backend-interfaces';

@Injectable({
  providedIn: 'root'
})
export class InsertOrderApiService {

    public SEARCH_FOR_ORDER_QUERY = gql`
    query searchForOrder($accountid:Float, $timestampid:Float){
        nodeOrderDetailsMicroService(timeStampid:$timestampid, accountid:$accountid){
            edges{
                node{
                    rowid
                    id
                    accountid
                    accountMRid
                    commonName
                    orderDate
                    dateCreated
                    lastModified
                    userid
                    routeid
                    delivered
                    orderNumber
                    timeStampid
                    orderproductamountsmicroserviceSet{
                        edges{
                            node{
                                rowid
                                id
                                productMRid
                                amount
                                status
                                lastModified
                                userid
                                packageWeight
                                productid{
                                    id
                                    productid
                                    rowid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
  `;

    constructor(private urlService: UrlsService, private http: HttpClient, private apollo: Apollo) { }

    private stockUrl = this.urlService.backendUrl + 'office/';
    private orderServiceUrl = this.urlService.mrOrderService;

    enterNewOrderDetails(orderDetails: IOrderDetails): Observable<IOrderDetails> {
        const orderDetailsBackend: IOrderDBDetails = ff_createOrderDetailsObjectForDB(orderDetails);
        console.log('Backend object: ', orderDetailsBackend);
        return this.http.put<any>(this.orderServiceUrl + 'orders/insertNewOrderDetails/', orderDetailsBackend).pipe(
            tap(response => console.log('This is the responce now', JSON.parse(JSON.stringify(response)))),
            map(response => ff_CreateOrderDetailsObjFromDBObj(response)),
            tap(response => console.log('This is the response now', response))
      );
        // return null;
    }

    enterProductAmounts(productAmounts: IProductOrderDetails[]): Observable<any> {
        const productDetailsBackend: IProductOrderDBDetails[] = [];
        productAmounts.forEach(product => productDetailsBackend.push(ff_createProductDetailsObjectForDB(product)));
        console.log('The products that will be inserted = ', productDetailsBackend);
    //   const productDetailsBackend: IProductOrderDBDetails[] = ff_createProductDetailsObjectForDB(productAmounts)
        return this.http.put<any>(this.orderServiceUrl + 'orders/insertProductAmounts/', productDetailsBackend);
    }

    enterNewPnPOrderDetails(newOrderDetails: IOrderDetails) {
        const dbOrderDetails: IOrderDBDetails = ff_createOrderDetailsObjectForDB(newOrderDetails);
      //   return of({id: 123});
        return this.http.post<any>(this.stockUrl + 'orders/enterDetails/', dbOrderDetails);
    }

    enterPnPProductAmounts(productAmounts) {
        console.log('The inserted product amounts are', productAmounts);
      //   return of('Inserted correctly');
        return this.http.post<any>(this.stockUrl + 'orders/enterProductAmounts/', productAmounts);
    }

    deleteProductFromOrder(amountid: number) {
        return this.http.delete<any>(this.orderServiceUrl + 'orders/deleteProduct/' + amountid);
    }

    deleteOrder(orderid: number) {
        return this.http.delete<any>(this.orderServiceUrl + 'orders/deleteOrder/' + orderid);
    }

    searchForOrder(datePackage: IDate, accountid: number): Observable<IOrderDetails[]> {
        // This may return more than one order, for instance if it is pnp and they have two KZN Delis for one day
        // console.log('Parameters of search orders = ', datePackage.id, accountid);
        return this.apollo
            .watchQuery({
                variables: { accountid: accountid, timestampid: datePackage.id },
                query: this.SEARCH_FOR_ORDER_QUERY
            })
            .valueChanges.pipe(
                take(1),
                map(result => this.consolidateAccountsData(result.data['nodeOrderDetailsMicroService'].edges)));
    }

    private consolidateAccountsData(data): IOrderDetails[] {
        if (data.length > 0) {

            // First check if the property exists before trying to access it.
            const packagingShipping = (product: IOrderproductamountsmicroserviceSetNode) => {
                if (product.node.productid.packagingShipping) {
                    return product.node.productid.packagingShipping.packagingWeight;
                } else {
                    return 0;
                }
            };

            const currentOrders: IOrderDetails[] = [];
            for (let order = 0; order < data.length; order++) {
                const products: IProductOrderDetails[] = [];
                const productEdge = data[order].node.orderproductamountsmicroserviceSet.edges;
                for (let prod = 0; prod < productEdge.length; ++prod) {
                    const singleGroup: IProductOrderDetails = {
                        productid: productEdge[prod].node.productid.rowid || null,
                        productMRid: productEdge[prod].node.productMRid || null,
                        amountid: productEdge[prod].node.rowid || null,
                        amount: productEdge[prod].node.amount || null,
                        status: productEdge[prod].node.status || null,
                        lastModified: productEdge[prod].node.lastModified || null,
                        userid: productEdge[prod].node.userid || null,
                        packageWeight: productEdge[prod].node.packageWeight || null,
                        orderDetailsid: null,
                        lugSize: null,
                        rankingInGroup: null,
                        packagingShippingWeight: packagingShipping(productEdge[prod]) || 0,
                        unitsPerMaxShippingWeight: productEdge[prod].node.productid.unitsPerMaxShippingWeight,
                    };
                    products.push(singleGroup);
                }
                const singleOrder: IOrderDetails = {
                    orderid: data[order].node.rowid || null,
                    accountid: data[order].node.accountid || null,
                    accountMRid: data[order].node.accountMRid || null,
                    accountName: null,
                    commonName: data[order].node.commonName || null,
                    routeid: data[order].node.routeid || null,
                    routeName: null,
                    franchiseid: null,
                    userid: null,
                    timeStampid: data[order].node.timeStampid.rowid || null,
                    franchiseName: data[order].node.accountid || null,
                    orderNumber: data[order].node.orderNumber || null,
                    productGroupid: data[order].node.accountid || null,
                    childAccount: data[order].node.accountid || null,
                    parentAccountid: data[order].node.accountid || null,
                    orderTotalAmount: data[order].node.orderTotalAmount || null,
                    orders: products,
                    franchiseRanking: null,
                    rankingInFranchise: null
                };
                currentOrders.push(singleOrder);
            }
            // console.log('Consolidate search orders = ', currentOrders);
            return currentOrders;
        }

    }

}
