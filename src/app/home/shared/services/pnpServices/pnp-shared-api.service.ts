import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { HttpClient } from '@angular/common/http';
import { IDate } from '../../main-portal/date-picker/date-picker-service/date-interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IPnPOrder, IPnPOrderProduct } from './pnp-shared-interfaces';

@Injectable({
    providedIn: 'root'
})
export class PnpSharedApiService {

    public GET_PNP_ORDER_QUERY = gql`
    query getPnPOrder($timeStampID:ID){
        nodeOrderdetails(timeStampid:$timeStampID){
            edges{
                node{
                    accountsid {
                        accountID
                    }
                    commonName
                    orderDate
                    delivered
                    orderproductamountsSet{
                        edges{
                            node{
                                amount
                                productid{
                                    rowid
                                    productid
                                    packageweight
                                    rankingInGroup
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

    constructor(private http: HttpClient, private apollo: Apollo) {}

    getPnPOrder(datePackage: IDate): Observable<IPnPOrder[]> {
        console.log(' * * * * * * * * * Collecting PnP Orders * * * * * * * * * ');
        return this.apollo
            .watchQuery({
                variables: { timeStampID: datePackage.nodeID },
                query: this.GET_PNP_ORDER_QUERY
            })
            .valueChanges.pipe(
                map(result => this.consolidatePnPOrder(result.data['nodeOrderdetails'].edges))
            );
    }

    private consolidatePnPOrder(data): IPnPOrder[] {

        const flattendData: IPnPOrder[] = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData: IPnPOrder = {} as IPnPOrder;
            singleData.accountID = data[array].node.accountsid.accountID;
            singleData.commonName = data[array].node.commonName;
            singleData.orderDate = data[array].node.orderDate;
            singleData.delivered = data[array].node.delivered;
            const flattenProducts: IPnPOrderProduct[] = [];
            for (let prod = 0; prod < data[array].node.orderproductamountsSet.edges.length; prod++) {
                const singleProduct = {} as IPnPOrderProduct;
                singleProduct.productMRid = data[array].node.orderproductamountsSet.edges[prod].node.productid.productid;
                singleProduct.productid = data[array].node.orderproductamountsSet.edges[prod].node.productid.rowid;
                singleProduct.amount = data[array].node.orderproductamountsSet.edges[prod].node.amount;
                singleProduct.packageWeight = data[array].node.orderproductamountsSet.edges[prod].node.productid.packageweight;
                singleProduct.rankingInGroup = data[array].node.orderproductamountsSet.edges[prod].node.productid.rankingInGroup;
                if (data[array].node.orderproductamountsSet.edges[prod].node.productid.packageweight <= 8) {
                    singleProduct.lugSize = 1;
                } else {
                    singleProduct.lugSize = 2;
                }
                flattenProducts.push(singleProduct);
            }
            singleData.products = flattenProducts;
            flattendData.push(singleData);
        }
        return flattendData;
    }

    getAllPnPProductsThatAreActive(): Observable<any> {
        return this.apollo
            .watchQuery({
                // variables: { accountID: accountID },
                query: gql`
                query getPnPProducts($brandID:ID="UHJvZHVjdEJyYW5kc1R5cGU6NQ=="){
                    nodeProductlist(brand:$brandID){
                    edges{
                        node{
                            rowid
                            productid
                            packageweight
                            rankingInGroup
                            proddescription
                            productonhold
                            }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateGetAllPnPProducts(result.data['nodeProductlist'].edges)));
    }

    private consolidateGetAllPnPProducts(data) {
        const flattendData = [];
        for (let array = 0; array < data.length; ++array) {
            if (!data[array].node.productonhold) {
                const singleData: IPnPOrderProduct = {} as IPnPOrderProduct;
                singleData.productMRid = data[array].node.productid;
                singleData.productid = data[array].node.rowid;
                singleData.packageWeight = data[array].node.packageweight;
                singleData.proddescription = data[array].node.proddescription;
                singleData.rankingInGroup = data[array].node.rankingInGroup;
                singleData.productonhold = data[array].node.productonhold;
                flattendData.push(singleData);
            }
        }
        return flattendData;
    }

}
