import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class ProductionGraphqlStringService {

    constructor() { }

    
    public ALL_STOCKTAKE_CONTAINERS_DATA = gql`
    query ItemGroups ($active: Boolean = true){
        nodeProdmsItemGrouping(departmentid: "RGVwYXJ0bWVudFR5cGU6Mg==", active: $active ){
            edges{
                node{
                    itemRanking
                    itemid{
                        id @include(if: false)
                        defaultItemName @include(if: true)
                        description @include(if: true)
                        rowid @include(if: true)
                        active @include(if: true)
                        itemweightorsize{
                            weightOrSize
                            itemShippingSize
                        }
                    }
                    groupid{
                        groupName
                        rowid
                        rankingInGroup
                    }
                    containerDetailNode (containerActive:$active){
                        edges{
                            node{
                                active
                                showBatches
                                productContainerWeight
                                productContainerid{
                                    rowid
                                    productcontainerproductionareajunctionSet{
                                        edges{
                                            node{
                                                productionAreaRanking
                                                productionAreaid{
                                                    rowid
                                                    productionAreaName
                                                    ranking
                                                }
                                            }
                                        }
                                    }
                                    productcontainergroupjunctionSet{
                                        edges{
                                            node{
                                                    productContainerGroupid{
                                                    rowid
                                                }
                                            }
                                        }
                                    }
                                    containerNameid{
                                        rowid
                                        containerName
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
