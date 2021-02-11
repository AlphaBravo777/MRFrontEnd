import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class TotalStockGraphqlStringService {
   

    constructor() { }


    public GET_ALL_TOTAL_STOCK_AMOUNTS = gql`
    query TotalStockAmount {
        nodeTotalProcessedStockInfo{
            edges{
                node{
                    containerid
                    processedstockbatchamountSet{
                        edges{
                            node{
                                batchid
                                amount
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
    }`;

    
    public GET_ALL_CONTAINER_DATA = gql`
    query ContainerData {
        nodeContainerName{
            edges{
                node{
                containerName
                rowid
                containerRanking
                }
            }
        }
    }`;

}
