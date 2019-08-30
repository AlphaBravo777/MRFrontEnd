import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class ViewOrdersGraphqlStringsService {

    public GET_MEDIUM_DATA_FOR_SPECIFIC_ROUTE = gql`
    query getSpecificRoute_MEDIUM($accountid:Float, $timeStampid:Float, $routeid: Float){
        nodeOrderDetailsMicroService(timeStampid:$timeStampid, routeid:$routeid, accountid:$accountid){
            edges{
                node{
                    commonName
                    rowid
                    accountid
                    orderTotalAmount
                    orderproductamountsmicroserviceSet{
                        edges{
                            node{
                                productMRid
                                rowid
                                amount
                                productid{
                                    packaging{
                                      packagingWeight
                                      rowid
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;


    constructor() {}



}
