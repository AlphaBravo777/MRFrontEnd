import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class ProductStockGraphqlStringService {

    constructor() { }

    // Put in as much data as you can, and then add the fetch=false flag if you do not need it
    public ALL_STOCKTAKE_CONTAINERS_DATA = gql`
    query StockTakeContainers {
        nodeProductlist{
            edges{
                node{
                    id @include(if: false)
                    productid @include(if: true)
                    rowid @include(if: true)
                    packageweight @include(if: false)
                    rankingInGroup @include(if: false)
                    proddescription @include(if: true)
                    productonhold @include(if: false)
                    batchgroup @include(if: false) {
                        batchname @include(if: false)
                        ranking @include(if: false)
                        rowid @include(if: false)
                    }
                    packaging @include(if: false) {
                        packagingType @include(if: false)
                        rowid @include(if: false)
                    }
                    brand @include(if: false) {
                        brand @include(if: false)
                    }
                    unitweight @include(if: false) {
                        unitAmount @include(if: false)
                        measuringUnit @include(if: false)
                    }
                    productcontainersSet @include(if: true) {
                        edges{
                            node{
                                rowid @include(if: true)
                                deleteContainerAmount @include(if: true)
                                showBatches @include(if: true)
                                containernameid @include(if: true) {
                                    containername @include(if: true)
                                }
                                factoryRanking @include(if: true)
                                factoryAreaNode @include(if: true) {
                                    area @include(if: true)
                                    areaRanking @include(if: true)
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;

    public GET_ALL_STOCKTAKE_AMOUNTS_FOR_STOCK_TAKE_INSTANCE = gql`
    query StocktakeInstance ($timeStampid: Int) {
        nodeStockTakeInstance(timeStampid: $timeStampid) {
            edges{
                node{
                    stocktakeinstancepercontainerSet{
                        edges{
                            node{
                                productContainerid
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
