import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class ViewOrdersGraphqlStringsService {

    public GET_MEDIUM_DATA_FOR_SPECIFIC_ROUTE = gql`
    query getSpecificRoute_MEDIUM($accountid:Int, $timeStampid:Int, $routeid: Int){
        nodeOrderDetailsMicroService(timeStampid:$timeStampid, routeid:$routeid, accountid:$accountid){
            edges{
                node{
                    id
                    commonName
                    rowid
                    accountid
                    orderTotalAmount
                    routeid
                    orderproductamountsmicroserviceSet{
                        edges{
                            node{
                                id
                                productMRid
                                rowid
                                amount
                                packageWeight
                                productNode{
                                    id
                                    rowid
                                    unitsPerMaxShippingWeight
                                    packagingShipping{
                                        id
                                        packagingWeight
                                        }
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
