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
import { map } from 'rxjs/operators';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Injectable({
  providedIn: 'root'
})

export class OrderGraphqlApiService {

    public GET_ALL_ORDERS_FOR_DATE = gql`
        query getNewPnPOrder($timeStampid:Float){
            nodeOrderDetailsMicroService(timeStampid:$timeStampid){
                edges{
                    node{
                        accountid
                          accountMRid
                        commonName
                        orderDate
                        delivered
                        orderproductamountsmicroserviceSet{
                            edges{
                                node{
                                    amount
                                    productid{
                                        rowid
                                        productid
                                        packageweight
                                        rankingInGroup
                                        packaging{
                                            rowid
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
  `;

    constructor(private apollo: Apollo) { }

    getAllDailyOrders(datePackage: IDate): Observable<IOrderDetails[]> {
        console.log('Fox(b) = ', datePackage.id);
        return this.apollo
            .watchQuery({
                variables: { timestampid: datePackage.id },
                query: this.GET_ALL_ORDERS_FOR_DATE
            })
            .valueChanges.pipe(
                map(result => this.consolidateAccountsData(result.data['nodeOrderDetailsMicroService'].edges)));
    }

    private consolidateAccountsData(data): IOrderDetails[] {
        console.log('Fox(a) = ', data);
        if (data.length === 1) {
            for (let order = 0; order < data.length; ++order) {
                const products: IProductOrderDetails[] = [];
                const productEdge = data[0].node.orderproductamountsmicroserviceSet.edges;
                for (let prod = 0; prod < productEdge.length; ++prod) {
                    const singleGroup: IProductOrderDetails = {
                        productid: productEdge[prod].node.productid,
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
                }
            return singleOrder;
        }

    }

}
