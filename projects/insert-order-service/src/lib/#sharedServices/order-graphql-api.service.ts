import { Injectable } from '@angular/core';
import { IOrderDetails, IWeeklyOrdersDetails } from './interfaces/order-service-Interfaces';
import { Observable, of } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { Apollo, DocumentNode } from 'apollo-angular-boost';
import { map, take } from 'rxjs/operators';
import { IProductOrderDetails } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';
import { IOrderDetailsMicroServiceTypeConnection, IOrderDetailsMicroServiceTypeNodes, IOrderProductAmountsMicroServiceType, IOrderProductAmountsMicroServiceTypeEdges,  IWeeklyOrdersCacheTypeConnection, IWeeklyOrdersCacheTypeNodes } from './interfaces/order-graphql.interface';
import { OrderGraphqlApiStringService } from './order-graphql-api-string.service';

@Injectable({
  providedIn: 'root'
})

export class OrderGraphqlApiService {

    constructor(
        private apollo: Apollo,
        private orderGraphqlApiStringService: OrderGraphqlApiStringService
    ) { }

    searchForOrdersMain(accountid: number,
        datePackage: IDate,
        routeid: number,
        queryString: DocumentNode = this.orderGraphqlApiStringService.MAIN_QUERY_FOR_SEARCHING_ORDERS, // This is a default string, if the first one is not given
        headers = {}): Observable<IOrderDetails[]> {
        console.log('Fox(b) = ', accountid, datePackage.id, routeid, queryString, headers);
        return this.apollo
            .watchQuery<IOrderDetailsMicroServiceTypeConnection>({
                context: { headers: headers},
                variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: queryString,
            })
            .valueChanges.pipe(
                map(result => this.consolidateDailyOrders(result.data.nodeOrderDetailsMicroService.edges)));
    }

    private consolidateDailyOrders(data: IOrderDetailsMicroServiceTypeNodes[]): IOrderDetails[] {

        function calculateLugSize(containerid) {
            if (containerid === 7) {
                return 1;
            } else {
                return 2;
            }
        }

        console.log('Fox(a) = ', data);
        const orders: IOrderDetails[] = [];
        for (let order = 0; order < data.length; ++order) {
            const products: IProductOrderDetails[] = [];
            if (data[order].node.orderproductamountsmicroserviceSet) {
                const productData: IOrderProductAmountsMicroServiceTypeEdges = data[order].node.orderproductamountsmicroserviceSet;
                for (let prod = 0; prod < productData.edges.length; ++prod) {
                    const productAmount: IOrderProductAmountsMicroServiceType = productData.edges[prod].node
                    const singleGroup: IProductOrderDetails = {
                        // This line (productid) gives an error when there were two db's and new products were not added to the other db yet (mono and productsMSdb)
                        productid: productAmount.productNode.rowid,
                        productMRid: productAmount.productMRid,
                        amountid: productAmount.rowid,
                        amount: productAmount.amount,
                        status: productAmount.status,
                        lastModified: productAmount.lastModified,
                        userid: productAmount.userid,
                        packageWeight: productAmount.packageWeight || null,
                        orderDetailsid: productAmount.rowid,
                        productActive: null,
                        lugSize: calculateLugSize(productAmount.productNode.itempackaging.unitPackagingid.rowid),
                        rankingInGroup: null, // productAmount.productrankingInGroup,
                        packagingShippingWeight: productAmount.productNode.itempackaging.shippingPackagingid.weightOfPackaging,
                        unitsPerMaxShippingWeight: productAmount.productNode.itemweightorsize.maxUnitsPerShippingUnit,
                    };
                    products.push(singleGroup);
                }
            }
            const singleOrder: IOrderDetails = {
                orderid: data[order].node.rowid,
                accountid: data[order].node.accountid,
                accountMRid: data[order].node.accountMRid,
                accountName: null,
                commonName: data[order].node.commonName,
                routeid: data[order].node.routeid,
                routeName: null,
                franchiseid: null,
                userid: null,
                timeStampid: data[order].node.timeStampid,
                franchiseName: null,
                orderNumber: data[order].node.orderNumber,
                productGroupid: null,
                parentAccountid: null,
                orders: products,
                orderTotalAmount: data[order].node.orderTotalAmount,
                franchiseRanking: null,
                rankingInFranchise: null
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
            .watchQuery<IOrderDetailsMicroServiceTypeConnection>({
                variables: { timeStampid: datePackage.id },
                query: this.orderGraphqlApiStringService.QUERY_FOR_GETTING_MINIMAL_ROUTE_DATA_FOR_DATE,
            })
            .valueChanges.pipe(
                map(result => this.consolidateDailyOrders(result.data.nodeOrderDetailsMicroService.edges)));
    }

    getWeeklyOrders(datePackage: IDate): Observable<IWeeklyOrdersDetails[]> {
        // NB NB NB NB Here we need to get the year as well, so that we do not pull in last years orders as well
        // if (datePackage.id === null) {  // Do this, else if datePackage === null EVERY order will be returned
        //     return of([]);
        // }
        console.log('getweeklyOrders date package = ', datePackage);
        return this.apollo
            .watchQuery<IWeeklyOrdersCacheTypeConnection>({
                variables: { weekNr: datePackage.week },
                query: this.orderGraphqlApiStringService.QUERY_FOR_GETTING_WEEKLY_DATA,
            })
            .valueChanges.pipe(
                map(result => this.consolidateWeeklyOrders(result.data.nodeWeeklyOrdersMicroService.edges)));
    }

    private consolidateWeeklyOrders(data: IWeeklyOrdersCacheTypeNodes[]): IWeeklyOrdersDetails[] {
        if (data.length > 0) {
            const weeklyProducts: IWeeklyOrdersDetails[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const weeklyProduct: IWeeklyOrdersDetails = {
                    packageWeight: data[prod].node.productNode.itemweightorsize.weightOrSize,
                    productMRid: data[prod].node.productNode.defaultItemName,
                    productid: data[prod].node.productNode.rowid,
                    productTotalAmount: data[prod].node.productTotalAmount,
                    weekDayName: data[prod].node.timeStampid.weekDay.weekDayNames,
                    weekDayNumber: data[prod].node.timeStampid.weekDay.weekDayNumber,
                    weekDayRanking: data[prod].node.timeStampid.weekDay.weekDayRanking,
                };
                weeklyProducts.push(weeklyProduct);
            }
            console.log('ALPHA (consolidateWeeklyOrders) = ', weeklyProducts);
            return weeklyProducts;
        }
    }

    
    searchForOrder(datePackage: IDate, accountid: number): Observable<IOrderDetails[]> {
        // This may return more than one order, for instance if it is pnp and they have two KZN Delis for one day
        // console.log('Parameters of search orders = ', datePackage.id, accountid);
        console.log('HEADERS IS RUNNING HERE !!!', accountid, datePackage.id);
        return this.apollo
            .watchQuery<IOrderDetailsMicroServiceTypeConnection>({
                context: { headers: {'Custom-Header': 'custom' }},
                variables: { accountid: accountid, timestampid: datePackage.id },
                query: this.orderGraphqlApiStringService.SEARCH_FOR_ORDER_QUERY
            })
            .valueChanges.pipe(
                take(1),
                map(result => this.consolidateAccountsData(result.data.nodeOrderDetailsMicroService.edges)));
    }

    private consolidateAccountsData(data: IOrderDetailsMicroServiceTypeNodes[]): IOrderDetails[] {
        console.log('The raw returning order = ', data);
        if (data.length > 0) {

            // First check if the property exists before trying to access it.
            // const packagingShipping = (product: IOrderProductAmountsMicroServiceType) => {
            //     if (product.productNode.itempackaging.shippingPackagingid.rowid) {
            //         return product.productNode.itemweightorsize.itemShippingSize;
            //     } else {
            //         return 0;
            //     }
            // };

            const currentOrders: IOrderDetails[] = [];
            for (let order = 0; order < data.length; order++) {
                const products: IProductOrderDetails[] = [];
                const productEdge = data[order].node.orderproductamountsmicroserviceSet.edges;
                for (let prod = 0; prod < productEdge.length; ++prod) {
                    const singleGroup: IProductOrderDetails = {
                        productid: productEdge[prod].node.productNode.rowid,
                        productMRid: productEdge[prod].node.productNode.defaultItemName,
                        amountid: productEdge[prod].node.rowid,
                        amount: productEdge[prod].node.amount,
                        status: productEdge[prod].node.status,
                        lastModified: productEdge[prod].node.lastModified,
                        userid: productEdge[prod].node.userid,
                        packageWeight: productEdge[prod].node.packageWeight,
                        orderDetailsid: null,
                        lugSize: null,
                        rankingInGroup: null,
                        productActive: null,
                        packagingShippingWeight: productEdge[prod].node.productNode.itemweightorsize.itemShippingSize,
                        unitsPerMaxShippingWeight: productEdge[prod].node.productNode.itemweightorsize.maxUnitsPerShippingUnit,
                    };
                    products.push(singleGroup);
                }
                const singleOrder: IOrderDetails = {
                    orderid: data[order].node.rowid,
                    accountid: data[order].node.accountid,
                    accountMRid: data[order].node.accountMRid,
                    accountName: null,
                    commonName: data[order].node.commonName,
                    routeid: data[order].node.routeid,
                    routeName: null,
                    franchiseid: null,
                    userid: null,
                    timeStampid: data[order].node.timeStampid,
                    franchiseName: null,
                    orderNumber: data[order].node.orderNumber,
                    productGroupid: null,
                    childAccount: null,
                    parentAccountid: null,
                    orderTotalAmount: data[order].node.orderTotalAmount,
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
