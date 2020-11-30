import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class StockCreateGraphqlStringService {

    constructor() { }

    
    public GET_LAST_10_STOCK_TAKES = gql`
    query StockTakeInstanceLast10($count:Int!) {
        nodeStockTakeInstance (last:$count) {
            edges{
                node{
                    id
                    rowid
                    timeStampid
                    timeStampNode{
                        year
                        week
                        weekDay{
                            weekDayNumber
                        }
                        shortDate
                        time{
                            times
                        }
                    }
                    stockTakerName
                    isFullStockTake
                    stockTakeLocked
                    parentStockTake{
                        rowid
                    }
                    useridNode{
                        firstName
                        rowid
                    }
                }
            }
        }
    }`;

    public GET_SINGLE_STOCK_STAKE_WITH_TIMESTAMPID = gql`
    query StockTakeSingleInstance ($timeStampid:Int!) {
        nodeStockTakeInstance (timeStampid: $timeStampid) {
            edges{
                node{
                    id
                    rowid
                    timeStampid
                    stockTakerName
                    isFullStockTake
                    parentStockTake{
                        rowid
                    }
                    useridNode{
                        username
                        rowid
                    }
                }
            }
        }
    }`;

}
