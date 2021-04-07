import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class ProductGraphqlApiStringService {

    constructor() { }

    public ALL_ITEMS_BASIC_QUERY = gql`
        query ItemsBasic {
            nodeProdmsItem {
                edges{
                    node{
                        defaultItemName
                        rowid
                    }
                }
            }
        }`;

    public MEASURING_UNITS = gql`
        query MeasuringUnits {
            nodeProdmsMeasuringUnit{
                edges{
                    node{
                        unit
                        convertionToMainUnitAmount
                        mainUnit{
                            rowid
                            unit
                        }
                        rowid
                    }
                }
            }
        }`;

    public PACKAGING = gql`
        query Packaging {
            nodeProdmsPackaging{
                edges{
                    node{
                        packagingName
                        weightOfPackaging
                        rowid
                    }
                }
            }
        }`;

    public VENDORS = gql`
        query Vendors {
            nodeProdmsItemVendor{
                edges{
                    node{
                        vendorid{
                            vendorName
                            }
                        rowid
                    }
                }
            }
        }`;

    public ALL_GROUPING_CATAGORIES = gql`
        query Groupings{
            nodeProdmsDepartment{
                edges{
                    node{
                        departmentName
                        rankingInDepartment
                        rowid
                        categorySet{
                            edges{
                                node{
                                    categoryName
                                    rankingInCategory
                                    rowid
                                    groupSet{
                                        edges{
                                            node{
                                                groupName
                                                rankingInGroup
                                                rowid
                                              
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

    public GET_PRODUCTS_OF_PRODUCTGROUP = gql`
        query productGroup(
            $groupid:ID, 
            $vendorDepartment:ID,
            $active:Boolean
            ){
            nodeProdmsItemGrouping(groupid:$groupid, active:$active, departmentid:$vendorDepartment){
                edges{
                    node{
                        itemRanking
                        groupid{
                            groupName
                            rankingInGroup
                        }
                        itemid{
                            rowid
                            description
                            defaultItemName
                            active
                            itempackaging{
                                unitPackagingid{
                                    rowid
                                }
                            }
                            itemweightorsize{
                                weightOrSize
                                itemShippingSize
                                weightOrSizeMeasuringUnitid{
                                    unit
                                    convertionToMainUnitAmount
                                }
                            }
                        }
                    }
                }
            }
        }
        `;
    
    ALL_PRODUCTGROUPNAMES_QUERY = gql`
        query getAllProductSalesGroups(
            $departmentid:ID,
            $categoryid:ID
            ){
            nodeProdmsDepartment(id:$departmentid){
                edges{
                    node{
                        id
                        departmentName
                        categorySet(id: $categoryid){
                            edges{
                                node{
                                    id
                                    categoryName
                                    groupSet{
                                        edges{
                                            node{
                                                id
                                                groupName
                                                rowid
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
    
