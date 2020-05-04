import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IProductDetails, IProductGroupName } from './products-interface';

@Injectable({
    providedIn: 'root'
})
export class ProductSharedApiService {

    public GET_PRODUCTS_OF_PRODUCTGROUP = gql`
        query productGroup($groupnameid:ID){
            nodeProductgroups(groupnameid:$groupnameid){
                edges{
                    node{
                        productid{
                            rowid
                            productid
                            proddescription
                            packaging{
                                rowid
                            }
                            unitweight{
                                unitAmount
                            }
                            packageweight
                            productonhold
                            batchranking
                            rankingInGroup
                        }
                    }
                }
            }
        }
    `;

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

    constructor(private apollo: Apollo) {}

    getProductsOfProductGroup(groupnameid: string): Observable<IProductDetails[]> {
        return this.apollo
            .watchQuery({
                variables: { groupnameid: groupnameid },
                query: this.GET_PRODUCTS_OF_PRODUCTGROUP
            })
            .valueChanges.pipe(
                map(result =>
                    this.consolidateProducts(
                        result.data['nodeProductgroups'].edges
                    )
                )
            );
    }

    private consolidateProducts(data): IProductDetails[] {
        const flattendData: IProductDetails[] = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData: IProductDetails = {
                productid: data[array].node.productid.rowid,
                productMRid: data[array].node.productid.productid,
                proddescription: data[array].node.productid.proddescription,
                lugSize: data[array].node.productid.packaging.rowid,
                batchRanking: data[array].node.productid.batchranking,
                packageWeight: data[array].node.productid.packageweight,
                productonhold: data[array].node.productid.productonhold,
                rankingInGroup: data[array].node.productid.rankingInGroup,
                packagingShippingWeight: null,
                unitsPerMaxShippingWeight: null
            };
        flattendData.push(singleData);
        }
        console.log('Here is the products data: ', flattendData);
        return flattendData;
    }

    getAllProductGroupNames(): Observable<IProductGroupName[]> {
        return this.apollo
            .watchQuery<any>({
                // context: { headers: headers},
                // variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
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
