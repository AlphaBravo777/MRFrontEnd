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
                    id
                    commonName
                    rowid
                    accountid
                    orderTotalAmount
                    orderproductamountsmicroserviceSet{
                        edges{
                            node{
                                id
                                productMRid
                                rowid
                                amount
                                productid{
                                    id
                                    rowid
                                    packaging{
                                        id
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
