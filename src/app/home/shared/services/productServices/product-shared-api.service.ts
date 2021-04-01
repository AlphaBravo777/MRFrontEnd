import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ToolboxGroupService } from '../toolbox/toolbox-group.service';
import { IProductDetails, IProductGroupName } from './products-interface';

@Injectable({
    providedIn: 'root'
})
export class ProductSharedApiService {

    // public GET_PRODUCTS_OF_PRODUCTGROUP = gql`
    //     query productGroup($groupnameid:ID){
    //         nodeProductgroups(groupnameid:$groupnameid){
    //             edges{
    //                 node{
    //                     productid{
    //                         rowid
    //                         productid
    //                         proddescription
    //                         packaging{
    //                             rowid
    //                         }
    //                         unitweight{
    //                             unitAmount
    //                         }
    //                         packageweight
    //                         productonhold
    //                         batchranking
    //                         rankingInGroup
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `;

    public GET_PRODUCTS_OF_PRODUCTGROUP = gql`
    query productGroup(
        $groupid:ID, 
        $batchesDepartment:ID,
        $active:Boolean
        ){
        nodeProdmsItemGrouping(groupid:$groupid, active:$active){
            edges{
                node{
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
                        itemgroupingSet(departmentid:$batchesDepartment){
                            edges{
                                node{
                                    itemRanking
                                    groupid{
                                        groupName
                                        rankingInGroup
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    `;

    // This would also need to be changed from oldProducts to production I think
    ALL_PRODUCTGROUPNAMES_QUERY = gql`
    query ProductGroupNames{
        nodeProductgroupnames{
                edges{
                    node{
                        rowid
                        groupname
                    }
                }
            }
        }
    `;

    constructor(private apollo: Apollo, private toolbox: ToolboxGroupService) {}

    getProductsOfProductGroup(groupid: string, batchesDepartment: string = 'RGVwYXJ0bWVudFR5cGU6MQ==', active: boolean = true): Observable<IProductDetails[]> {
        return this.apollo
            .watchQuery({
                variables: { groupid: groupid, batchesDepartment: batchesDepartment, active:active },
                query: this.GET_PRODUCTS_OF_PRODUCTGROUP
            })
            .valueChanges.pipe(
                map(result =>
                    this.consolidateProducts(this.toolbox.refractureGraphqlRawData(result)['nodeProdmsItemGrouping'])
                )
            );
    }

    private consolidateProducts(data): IProductDetails[] {
        console.log('* * * * * Here is the products data: ', data);
        const flattendData: IProductDetails[] = [];
        for (let array = 0; array < data.length; ++array) {
            const element = data[array]
            const singleData: IProductDetails = {
                productid: element.itemid.rowid,
                productMRid: element.itemid.defaultItemName,
                proddescription: element.itemid.description,
                lugSize: element.itemid.itempackaging.unitPackagingid.rowid,
                batchRanking: null,
                packageWeight: element.itemid.itemweightorsize.itemShippingSize,
                // productonhold: element.itemid.active,
                productonhold: null,
                rankingInGroup: null,
                packagingShippingWeight: null,
                unitsPerMaxShippingWeight: null
            };
        flattendData.push(singleData);
        }
        console.log('Here is the products data: ', flattendData);
        return flattendData;

    // private consolidateProducts(data): IProductDetails[] {
    //     const flattendData: IProductDetails[] = [];
    //     for (let array = 0; array < data.length; ++array) {
    //         const singleData: IProductDetails = {
    //             productid: data[array].node.productid.rowid,
    //             productMRid: data[array].node.productid.productid,
    //             proddescription: data[array].node.productid.proddescription,
    //             lugSize: data[array].node.productid.packaging.rowid,
    //             batchRanking: data[array].node.productid.batchranking,
    //             packageWeight: data[array].node.productid.packageweight,
    //             productonhold: data[array].node.productid.productonhold,
    //             rankingInGroup: data[array].node.productid.rankingInGroup,
    //             packagingShippingWeight: null,
    //             unitsPerMaxShippingWeight: null
    //         };
    //     flattendData.push(singleData);
    //     }
    //     console.log('Here is the products data: ', flattendData);
    //     return flattendData;
    }

    getAllProductGroupNames(): Observable<IProductGroupName[]> {
        return this.apollo
            .watchQuery<any>({
                // context: { headers: headers},
                query: this.ALL_PRODUCTGROUPNAMES_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateProductGroupNames(result.data['nodeProductgroupnames'].edges)));
    }

    private consolidateProductGroupNames(data): IProductGroupName[] {
        if (data.length > 0) {
            const productGroupNameArray: IProductGroupName[] = [];
            for (let grp = 0; grp < data.length; grp++) {
                const productGroup: IProductGroupName = {
                    id: data[grp].node.rowid,
                    groupName: data[grp].node.groupname,
                    ID: null
                };
                productGroupNameArray.push(productGroup);
            }
            console.log('ALPHA (consolidateProductGroupNames) = ', productGroupNameArray);
            return productGroupNameArray;
        }
    }
}
