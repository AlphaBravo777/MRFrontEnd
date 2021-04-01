import { Injectable } from '@angular/core';
import { IOrderDetails, IWeeklyOrdersDetails } from './interfaces/order-service-Interfaces';
import { Observable, of } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { Apollo, DocumentNode } from 'apollo-angular-boost';
import { map } from 'rxjs/operators';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { INodeOrderDetailsMicroService,
    IOrderproductamountsmicroserviceSet,
    } from './interfaces/order-backend-interfaces';
import { OrderGraphqlApiStringService } from './order-graphql-api-string.service';

@Injectable({
  providedIn: 'root'
})

export class OrderGraphqlApiService {

    constructor(private apollo: Apollo, private orderGraphqlApiStringService: OrderGraphqlApiStringService) { }

    searchForOrdersMain(accountid: number,
        datePackage: IDate,
        routeid: number,
        queryString: DocumentNode = this.orderGraphqlApiStringService.MAIN_QUERY_FOR_SEARCHING_ORDERS,
        headers = {}): Observable<IOrderDetails[]> {
        console.log('Fox(b) = ', accountid, datePackage.id, routeid, queryString, headers);
        return this.apollo
            .watchQuery<INodeOrderDetailsMicroService>({
                context: { headers: headers},
                variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: queryString,
            })
            .valueChanges.pipe(
                map(result => this.consolidateDailyOrders(result.data['nodeOrderDetailsMicroService'])));
    }

    private consolidateDailyOrders(data: INodeOrderDetailsMicroService): IOrderDetails[] {

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
                        // This line (productid) gives an error when there were two db's and new products were not added to the other db yet (mono and productsMSdb)
                        productid: productData.edges[prod].node.productNode.rowid,
                        productMRid: productData.edges[prod].node.productMRid,
                        amountid: productData.edges[prod].node.rowid,
                        amount: productData.edges[prod].node.amount,
                        status: productData.edges[prod].node.status,
                        lastModified: productData.edges[prod].node.lastModified,
                        userid: productData.edges[prod].node.userid,
                        packageWeight: productData.edges[prod].node.packageWeight || null,
                        orderDetailsid: productData.edges[prod].node.rowid,
                        lugSize: calculateLugSize(productData.edges[prod].node.productNode.packaging.rowid),
                        rankingInGroup: productData.edges[prod].node.productNode.rankingInGroup,
                        packagingShippingWeight: productData.edges[prod].node.productNode.packagingShipping.packagingWeight || 0,
                        unitsPerMaxShippingWeight: productData.edges[prod].node.productNode.unitsPerMaxShippingWeight,
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
            .watchQuery<INodeOrderDetailsMicroService>({
                variables: { timeStampid: datePackage.id },
                query: this.orderGraphqlApiStringService.QUERY_FOR_GETTING_MINIMAL_ROUTE_DATA_FOR_DATE,
            })
            .valueChanges.pipe(
                map(result => this.consolidateDailyOrders(result.data['nodeOrderDetailsMicroService'])));
    }

    getWeeklyOrders(datePackage: IDate): Observable<IWeeklyOrdersDetails[]> {
        // if (datePackage.id === null) {  // Do this, else if datePackage === null EVERY order will be returned
        //     return of([]);
        // }
        console.log('getweeklyOrders date package = ', datePackage);
        return this.apollo
            .watchQuery<INodeOrderDetailsMicroService>({
                variables: { weekNr: datePackage.week },
                query: this.orderGraphqlApiStringService.QUERY_FOR_GETTING_WEEKLY_DATA,
            })
            .valueChanges.pipe(
                map(result => this.consolidateWeeklyOrders(result.data['nodeWeeklyOrdersMicroService'].edges)));
    }

    private consolidateWeeklyOrders(data): IWeeklyOrdersDetails[] {
        if (data.length > 0) {
            const weeklyProducts: IWeeklyOrdersDetails[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const weeklyProduct: IWeeklyOrdersDetails = {
                    packageWeight: data[prod].node.productNode.packageweight,
                    productMRid: data[prod].node.productNode.productid,
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
}
