import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class ProductStockGraphqlStringService {

    constructor() { }

    // Put in as much data as you can, and then add the fetch=false flag if you do not need it



    public GET_ALL_STOCKTAKE_AMOUNTS_FOR_STOCK_TAKE_INSTANCE = gql`
    query StocktakeInstance ($timeStampid: Int) {
        nodeStockTakeInstance(timeStampid: $timeStampid) {
            edges{
                node{
                    stocktakeinstancepercontainerSet{
                        edges{
                            node{
                                internalProductContainerid{
                                    productContainerid
                                }
                                stocktakebatchamountSet{
                                    edges{
                                        node{
                                            batchid
                                            amountString
                                            batchNode{
                                                weeknumber
                                                year
                                                day
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;

}
