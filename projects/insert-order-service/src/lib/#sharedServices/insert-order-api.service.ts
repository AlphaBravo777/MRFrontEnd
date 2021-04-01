import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IOrderDetails,
    IOrderDBDetails,
    ff_createOrderDetailsObjectForDB,
    ff_CreateOrderDetailsObjFromDBObj,
    IInserOrderErrors} from './interfaces/order-service-Interfaces';
import { Observable, of } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { Apollo, gql } from 'apollo-angular-boost';
import { map, take, tap, concatMap, catchError } from 'rxjs/operators';
import { IProductOrderDetails,
    ff_createProductDetailsObjectForDB,
    IProductOrderDBDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { IOrderproductamountsmicroserviceSetNode } from './interfaces/order-backend-interfaces';
import { IViewRoutesData } from '../view-orders/1#view-order-services/view-order-interface';

@Injectable({
  providedIn: 'root'
})
export class InsertOrderApiService {

    public SEARCH_FOR_ORDER_QUERY = gql`
    query searchForOrder($accountid:Int, $timestampid:Int){
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
                                productNode{
                                    id
                                    defaultItemName
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

    // Enters the main order details
    enterNewOrderDetails(orderDetails: IOrderDetails): Observable<IOrderDetails> {
        const orderDetailsBackend: IOrderDBDetails = ff_createOrderDetailsObjectForDB(orderDetails);
        console.log('Backend object: ', orderDetailsBackend);
        return this.http.post<any>(this.urlService.insertNewOrderDetailsUrl, orderDetailsBackend).pipe(
            tap(response => console.log('This is the responce now', JSON.parse(JSON.stringify(response)))),
            map(response => ff_CreateOrderDetailsObjFromDBObj(response)),
            tap(response => console.log('This is the response now', response)),
            //  --------------  Kafka Implementation --------------------
            // concatMap(() => this.http.put<any>(this.urlService.insertKafkaNewOrderDetails, orderDetailsBackend))
      );
    }

    // Enter the products and all their amounts, after the order details were inserted
    enterProductAmounts(productAmounts: IProductOrderDetails[]): Observable<any> {
        const productDetailsBackend: IProductOrderDBDetails[] = [];
        productAmounts.forEach(product => productDetailsBackend.push(ff_createProductDetailsObjectForDB(product)));
        console.log('The products that will be inserted = ', productDetailsBackend);
    //   const productDetailsBackend: IProductOrderDBDetails[] = ff_createProductDetailsObjectForDB(productAmounts)
        return this.http.post<any>(this.urlService.insertProductAmounts, productDetailsBackend);
    }

    deleteProductFromOrder(amountid: number) {
        return this.http.delete<any>(this.urlService.deleteProduct + amountid);
    }

    deleteOrder(orderid: number) {
        return this.http.delete<any>(this.urlService.deleteOrder + orderid);
    }

    updateRouteDate(route: IViewRoutesData, currentDatePackage: IDate, newDatePackage: IDate): Observable<IInserOrderErrors> {
        const routeUpdateData = {routeid: route.routeid, currentTimeStampid: currentDatePackage.id, newTimeStampid: newDatePackage.id };
        console.log('Updating now', routeUpdateData);
        return this.http.put<IInserOrderErrors>(this.urlService.updateRouteDate, routeUpdateData);
    }

    searchForOrder(datePackage: IDate, accountid: number): Observable<IOrderDetails[]> {
        // This may return more than one order, for instance if it is pnp and they have two KZN Delis for one day
        // console.log('Parameters of search orders = ', datePackage.id, accountid);
        console.log('HEADERS IS RUNNING HERE !!!');
        return this.apollo
            .watchQuery({
                context: { headers: {'Custom-Header': 'custom' }},
                variables: { accountid: accountid, timestampid: datePackage.id },
                query: this.SEARCH_FOR_ORDER_QUERY
            })
            .valueChanges.pipe(
                take(1),
                map(result => this.consolidateAccountsData(result.data['nodeOrderDetailsMicroService'].edges)));
    }

    private consolidateAccountsData(data): IOrderDetails[] {
        console.log('The raw returning order = ', data);
        if (data.length > 0) {

            // First check if the property exists before trying to access it.
            const packagingShipping = (product: IOrderproductamountsmicroserviceSetNode) => {
                if (product.node.productNode.packagingShipping) {
                    return product.node.productNode.packagingShipping.packagingWeight;
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
                        productid: productEdge[prod].node.productNode.rowid || null,
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
                        unitsPerMaxShippingWeight: productEdge[prod].node.productNode.unitsPerMaxShippingWeight,
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

    // sendOrderDetailsToKafka(order: IOrderDetails): Observable<IOrderDetails> {
    //     return this.http.post<any>( this.urlService.sagaCoordinatorMS + 'testmodule/kafkaTestEndpoint/', order).pipe(
    //         tap(response => console.log('The kafka response = ', response)),
    //         map(() => order),
    //         catchError(error => {
    //             console.log('The error = ', error);
    //             return of(order);
    //         })
    //     );
    // }

}
