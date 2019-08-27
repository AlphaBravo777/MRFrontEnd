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
                                productid{
                                    productid
                                    rowid
                                }
                                productMRid
                                amount
                                status
                                lastModified
                                userid
                                packageWeight
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

    searchForOrder(datePackage: IDate, accountid: number): Observable<IOrderDetails> {
        console.log('Fox(b) = ', datePackage.id, accountid);
        return this.apollo
            .watchQuery({
                variables: { accountid: accountid, timestampid: datePackage.id },
                query: this.SEARCH_FOR_ORDER_QUERY
            })
            .valueChanges.pipe(
                take(1),
                map(result => this.consolidateAccountsData(result.data['nodeOrderDetailsMicroService'].edges)));
    }

    private consolidateAccountsData(data): IOrderDetails {
        console.log('Fox(a) = ', data);
        if (data.length === 1) {
            const products: IProductOrderDetails[] = [];
            const productEdge = data[0].node.orderproductamountsmicroserviceSet.edges;
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
                };
                products.push(singleGroup);
            }
            const singleOrder: IOrderDetails = {
                orderid: data[0].node.rowid || null,
                accountid: data[0].node.accountid || null,
                accountMRid: data[0].node.accountMRid || null,
                accountName: null,
                commonName: data[0].node.commonName || null,
                routeid: data[0].node.routeid || null,
                routeName: null,
                franchiseid: null,
                userid: null,
                timeStampid: data[0].node.timeStampid.rowid || null,
                franchiseName: data[0].node.accountid || null,
                orderNumber: data[0].node.orderNumber || null,
                productGroupid: data[0].node.accountid || null,
                childAccount: data[0].node.accountid || null,
                parentAccountid: data[0].node.accountid || null,
                orderTotalAmount: data[0].node.orderTotalAmount || null,
                orders: products,
            };
            return singleOrder;
        }

    }

}
