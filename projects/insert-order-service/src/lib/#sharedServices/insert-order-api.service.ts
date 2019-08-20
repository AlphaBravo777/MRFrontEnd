import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IOrderDetails,
    IOrderDBDetails,
    factoryFunctionDBLayerCreateNewOrder,
    ff_CreateOrderDetailsObjFromDBObj } from './insert-order-service-Interfaces';
import { Observable } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { Apollo, gql } from 'apollo-angular-boost';
import { map, take } from 'rxjs/operators';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';

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
      return this.http.post<any>(this.orderServiceUrl + 'orders/insertNewOrderDetails/', orderDetails).pipe(
          map(response => ff_CreateOrderDetailsObjFromDBObj(response))
      );
    }

    enterProductAmounts(productAmounts: IProductOrderDetails[]): Observable<any> {
      return this.http.post<any>(this.orderServiceUrl + 'orders/insertProductAmounts/', productAmounts);
    }

    enterNewPnPOrderDetails(newOrderDetails: IOrderDetails) {
        const dbOrderDetails: IOrderDBDetails = factoryFunctionDBLayerCreateNewOrder(newOrderDetails);
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
                    productid: productEdge[prod].node.productid.rowid,
                    productMRid: productEdge[prod].node.productMRid,
                    amountid: productEdge[prod].node.rowid,
                    amount: productEdge[prod].node.amount,
                    status: productEdge[prod].node.status,
                    lastModified: productEdge[prod].node.lastModified,
                    userid: productEdge[prod].node.userid,
                    packageWeight: productEdge[prod].node.packageWeight,
                    orderDetailsid: null,
                    lugSize: null,
                    rankingInGroup: null,
                };
                products.push(singleGroup);
            }
            const singleOrder: IOrderDetails = {
                orderid: data[0].node.rowid,
                accountid: data[0].node.accountid,
                accountMRid: data[0].node.accountMRid,
                accountName: null,
                commonName: data[0].node.commonName,
                routeid: data[0].node.routeid,
                routeName: null,
                franchiseid: null,
                userid: null,
                timeStampid: data[0].node.timeStampid.rowid,
                franchiseName: data[0].node.accountid,
                orderNumber: data[0].node.orderNumber,
                productGroupid: data[0].node.accountid,
                childAccount: data[0].node.accountid,
                parentAccountid: data[0].node.accountid,
                orders: products,
            };
            return singleOrder;
        }

    }

}
