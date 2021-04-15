import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class OrderGraphqlApiStringService {

    constructor() { }

    public MAIN_QUERY_FOR_SEARCHING_ORDERS = gql`
    query searchForOrder($accountid:Int, $timeStampid:Int, $routeid: Int){
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
                                productNode {
                                    id
                                    rowid
                                  	description
                                  	active
                                  	itemweightorsize{
                                        weightOrSize
                                        weightOrSizeMeasuringUnitid{
                                            unit
                                        }
                                        itemShippingSize
                                        itemShippingSizeMeasurementid{
                                            unit
                                        }
                                    }
                                  	itempackaging{
                                        unitPackagingid{
                                            rowid
                                            packagingName
                                        }
                                        shippingPackagingid{
                                            weightOfPackaging
                                        }
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
    query getOrderRoutesForDay($timeStampid: Int) {
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

    public QUERY_FOR_GETTING_WEEKLY_DATA = gql`
    query getWeeklyOrders($weekNr:Int, $year:Int){
        nodeWeeklyOrdersMicroService(weekNum:$weekNr, year:$year){
            edges{
                node{
                    timeStampid{
                        weekDay{
                            weekDayNumber
                            weekDayNames
                            weekDayRanking
                        }
                    }
                    productNode{
                        rowid
                        defaultItemName
                        itemweightorsize{
                            weightOrSize
                            weightOrSizeMeasuringUnitid{
                                convertionToMainUnitAmount
                            }
                      }
                    }
                    productTotalAmount
                }
            }
        }
    }`;

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
                                    itemweightorsize{
                                            itemShippingSize
                                            maxUnitsPerShippingUnit
                                        }
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


}
