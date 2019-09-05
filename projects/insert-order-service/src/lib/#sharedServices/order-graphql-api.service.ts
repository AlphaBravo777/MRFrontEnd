import { Injectable } from '@angular/core';
import { IOrderDetails } from './interfaces/order-service-Interfaces';
import { Observable } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { Apollo, gql } from 'apollo-angular-boost';
import { map } from 'rxjs/operators';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { INodeOrderDetailsMicroService,
    IOrderproductamountsmicroserviceSet,
    getDefaultINodeOrderDetailsMicroService } from './interfaces/order-backend-interfaces';

@Injectable({
  providedIn: 'root'
})

export class OrderGraphqlApiService {

    public MAIN_QUERY_FOR_SEARCHING_ORDERS = gql`
    query searchForOrder($accountid:Float, $timeStampid:Float, $routeid: Float){
        nodeOrderDetailsMicroService(timeStampid:$timeStampid, accountid:$accountid, routeid: $routeid){
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
                                id
                                rowid
                                productid {
                                    id
                                    rowid
                                    proddescription
                                    productonhold
                                    batchranking
                                    rankingInGroup
                                    brand{
                                        id
                                        brand
                                    }
                                    unitweight{
                                        id
                                        unitAmount
                                        measuringUnit
                                    }
                                    packaging{
                                        id
                                        rowid
                                        packagingType
                                    }
                                    packagingShipping{
                                        id
                                        packagingWeight
                                    }
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
    }`;

    public QUERY_FOR_GETTING_MINIMAL_ROUTE_DATA_FOR_DATE = gql`
    query getOrderRoutesForDay($timeStampid: Float) {
        nodeOrderDetailsMicroService(timeStampid:$timeStampid){
        edges{
            node{
                id
                orderTotalAmount
                routeid
                }
            }
        }
    }`;

    constructor(private apollo: Apollo) { }

    searchForOrdersMain(accountid: number, datePackage: IDate,
        routeid: number, queryString = this.MAIN_QUERY_FOR_SEARCHING_ORDERS): Observable<IOrderDetails[]> {
        console.log('Fox(b) = ', accountid, datePackage.id, routeid, queryString);
        return this.apollo
            .watchQuery<INodeOrderDetailsMicroService>({
                variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: queryString,
            })
            .valueChanges.pipe(
                map(result => this.consolidateDailyOrders(result.data['nodeOrderDetailsMicroService'])));
    }

    private consolidateDailyOrders(data: INodeOrderDetailsMicroService): IOrderDetails[] {
        const defaultValues: INodeOrderDetailsMicroService = getDefaultINodeOrderDetailsMicroService();
        console.log('DEFAULT VALUES: ', defaultValues);

        function calculateLugSize(containerid) {
            if (containerid === 7) {
                return 1;
            } else {
                return 2;
            }
        }

        console.log('Fox(a) = ', data);
        const orders: IOrderDetails[] = [];
        for (let order = 0; order < data.edges.length; ++order) {
            const products: IProductOrderDetails[] = [];
            if (data.edges[order].node.orderproductamountsmicroserviceSet) {
                const productData: IOrderproductamountsmicroserviceSet = data.edges[order].node.orderproductamountsmicroserviceSet;
                for (let prod = 0; prod < productData.edges.length; ++prod) {
                    const singleGroup: IProductOrderDetails = {
                        productid: productData.edges[prod].node.productid.rowid,
                        productMRid: productData.edges[prod].node.productMRid,
                        amountid: productData.edges[prod].node.rowid,
                        amount: productData.edges[prod].node.amount,
                        status: productData.edges[prod].node.status,
                        lastModified: productData.edges[prod].node.lastModified,
                        userid: productData.edges[prod].node.userid,
                        packageWeight: productData.edges[prod].node.packageWeight || null,
                        orderDetailsid: productData.edges[prod].node.rowid,
                        lugSize: calculateLugSize(productData.edges[prod].node.productid.packaging.rowid),
                        rankingInGroup: productData.edges[prod].node.productid.rankingInGroup,
                        packagingShippingWeight: productData.edges[prod].node.productid.packagingShipping.packagingWeight || 0,
                        unitsPerMaxShippingWeight: productData.edges[prod].node.productid.unitsPerMaxShippingWeight,
                    };
                    products.push(singleGroup);
                }
            }
            const singleOrder: IOrderDetails = {
                orderid: data.edges[order].node.rowid,
                accountid: data.edges[order].node.accountid,
                accountMRid: data.edges[order].node.accountMRid,
                accountName: null,
                commonName: data.edges[order].node.commonName,
                routeid: data.edges[order].node.routeid,
                routeName: null,
                franchiseid: null,
                userid: null,
                timeStampid: data.edges[order].node.timeStampid,
                franchiseName: null,
                orderNumber: data.edges[order].node.orderNumber,
                productGroupid: null,
                parentAccountid: null,
                orders: products,
                orderTotalAmount: data.edges[order].node.orderTotalAmount,
            };
            orders.push(singleOrder);
        }
        console.log('FOX (Normal order returns) = ', orders);
        return orders;
    }

    getRoutesForDatePackage_minimalData(datePackage: IDate): Observable<IOrderDetails[]> {
        console.log('Fox(b) = ', datePackage.id);
        if (datePackage.id === null) {  // Do this, else if datePackage === null EVERY order will be returned
            datePackage.id = 0;
        }
        return this.apollo
            .watchQuery<INodeOrderDetailsMicroService>({
                variables: { timeStampid: datePackage.id },
                query: this.QUERY_FOR_GETTING_MINIMAL_ROUTE_DATA_FOR_DATE,
            })
            .valueChanges.pipe(
                map(result => this.consolidateDailyOrders(result.data['nodeOrderDetailsMicroService'])));
    }

}
