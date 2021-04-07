import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular-boost';
import { IItemBasic } from './interfaces/item.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMeasuringUnit, IPackaging, IItemVendor, IDepartment, ICategory, IGroup } from './interfaces/auxiliary';
import { ProductGraphqlApiStringService } from './product-graphql-api-string.service';
import { ICategoryTypeNodes, IDepartmentTypeConnection, IDepartmentTypeNodes, IGroupTypeNodes, IItemGroupingTypeConnection, IItemGroupingTypeEdges, IItemGroupingTypeNodes, IItemTypeConnection, IItemTypeNodes, IMeasuringUnitTypeNodes, INewPackagingTypeConnection, INewPackagingTypeNodes, ItemVendorTypeConnection, ItemVendorTypeNodes, MeasuringUnitTypeConnection } from './interfaces/item-graphql.interface';
import { IProductDetails, IProductGroupName } from './interfaces/products-interface';

@Injectable({
    providedIn: 'root'
})
export class ProductGraphqlApiService {

    constructor(
        private apollo: Apollo,
        private productGraphqlApiStringService: ProductGraphqlApiStringService
    ) { }

    getAllItemsBasicInfo(): Observable<IItemBasic[]> {
        return this.apollo
            .watchQuery<IItemTypeConnection>({
                query: this.productGraphqlApiStringService.ALL_ITEMS_BASIC_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateBasicItems(result.data.nodeProdmsItem.edges)));
    }

    private consolidateBasicItems(data: IItemTypeNodes[]): IItemBasic[] {
        if (data.length > 0) {
            const itemBasicsArray: IItemBasic[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: IItemBasic = {
                    itemName: element.defaultItemName,
                    itemid: element.rowid
                };
                itemBasicsArray.push(weeklyProduct);
            }
            console.log('ALPHA (consolidateBasicItems) = ', itemBasicsArray);
            return itemBasicsArray;
        }
        return [];
    }

    getMeasuringUnits(): Observable<IMeasuringUnit[]> {
        return this.apollo
            .watchQuery<MeasuringUnitTypeConnection>({
                query: this.productGraphqlApiStringService.MEASURING_UNITS,
            })
            .valueChanges.pipe(
                map(result => this.consolidateMeasuringUnits(result.data.nodeProdmsMeasuringUnit.edges)));
    }

    private consolidateMeasuringUnits(data: IMeasuringUnitTypeNodes[]): IMeasuringUnit[] {
        if (data.length > 0) {
            const measureingUnitsArray: IMeasuringUnit[] = [];
            for (let unit = 0; unit < data.length; unit++) {
                const element = data[unit].node;
                const weeklyProduct: IMeasuringUnit = {
                    unit: element.unit,
                    unitid: element.rowid,
                    convertionToMainUnitAmount: element.convertionToMainUnitAmount,
                    mainUnitid: element.mainUnit.rowid,
                    mianUnit: element.mainUnit.unit
                };
                measureingUnitsArray.push(weeklyProduct);
            }
            console.log('ALPHA (consolidateMeasuringUnits) = ', measureingUnitsArray);
            return measureingUnitsArray;
        }
        return [];
    }

    getPackaging(): Observable<IPackaging[]> {
        return this.apollo
            .watchQuery<INewPackagingTypeConnection>({
                query: this.productGraphqlApiStringService.PACKAGING,
            })
            .valueChanges.pipe(
                map(result => this.consolidatePackaging(result.data.nodeProdmsPackaging.edges)));
    }

    private consolidatePackaging(data: INewPackagingTypeNodes[]): IPackaging[] {
        if (data.length > 0) {
            const packagingArray: IPackaging[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: IPackaging = {
                    packaging: element.packagingName,
                    packagingid: element.rowid,
                    weight: element.weightOfPackaging
                };
                packagingArray.push(weeklyProduct);
            }
            console.log('ALPHA (packagingArray) = ', packagingArray);
            return packagingArray;
        }
        return [];
    }

    getVendors(): Observable<IItemVendor[]> {
        return this.apollo
            .watchQuery<ItemVendorTypeConnection>({
                query: this.productGraphqlApiStringService.VENDORS,
            })
            .valueChanges.pipe(
                map(result => this.consolidateVendors(result.data.nodeProdmsItemVendor.edges)));
    }

    private consolidateVendors(data: ItemVendorTypeNodes[]): IItemVendor[] {
        if (data.length > 0) {
            const vendorArray: IItemVendor[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: IItemVendor = {
                    vendor: element.vendorid.vendorName,
                    vendorid: element.rowid,
                };
                vendorArray.push(weeklyProduct);
            }
            console.log('ALPHA (vendors) = ', vendorArray);
            return vendorArray;
        }
        return [];
    }

    getAllGroupingCatagories(): Observable<IDepartment[]> {
        return this.apollo
            .watchQuery<IDepartmentTypeConnection>({
                query: this.productGraphqlApiStringService.ALL_GROUPING_CATAGORIES,
            })
            .valueChanges.pipe(
                map(result => this.consolidateDepartments(result.data.nodeProdmsDepartment.edges)));
    }

    private consolidateDepartments(data: IDepartmentTypeNodes[]): IDepartment[] {
        if (data.length > 0) {
            const departmentArray: IDepartment[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: IDepartment = {
                    name: element.departmentName,
                    departmentid: element.rowid,
                    rankingInDepartment: element.rankingInDepartment,
                    categories: this.consolidateCategories(element.categorySet.edges)
                };
                departmentArray.push(weeklyProduct);
            }
            console.log('ALPHA (departmentArray) = ', departmentArray);
            return departmentArray;
        }
        return [];
    }

    private consolidateCategories(data: ICategoryTypeNodes[]): ICategory[] {
        if (data.length > 0) {
            const categoryArray: ICategory[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: ICategory = {
                    name: element.categoryName,
                    categoryid: element.rowid,
                    rankingInCategory: element.rankingInCategory,
                    groups: this.consolidateGroups(element.groupSet.edges)
                };
                categoryArray.push(weeklyProduct);
            }
            console.log('ALPHA (categoryArray) = ', categoryArray);
            return categoryArray;
        }
        return [];
    }

    private consolidateGroups(data: IGroupTypeNodes[]): IGroup[] {
        if (data.length > 0) {
            const groupArray: IGroup[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: IGroup = {
                    name: element.groupName,
                    groupid: element.rowid,
                    rankingInGroup: element.rankingInGroup,
                };
                groupArray.push(weeklyProduct);
            }
            console.log('ALPHA (groupArray) = ', groupArray);
            return groupArray;
        }
        return [];
    }



    getProductsOfProductGroup(groupid: string, vendorDepartment: string = 'RGVwYXJ0bWVudFR5cGU6NQ==', active: boolean = true): Observable<IProductDetails[]> {
        console.log('Variables = ', groupid, vendorDepartment, active)
        return this.apollo
            .watchQuery<IItemGroupingTypeConnection>({
                variables: { groupid: groupid, vendorDepartment: vendorDepartment, active:active },
                query: this.productGraphqlApiStringService.GET_PRODUCTS_OF_PRODUCTGROUP
            })
            .valueChanges.pipe(
                map(result =>
                    this.consolidateProducts(result.data.nodeProdmsItemGrouping)
                )
            );
    }

    private consolidateProducts(data: IItemGroupingTypeEdges): IProductDetails[] {
        console.log('* * * * * Here is the products data: ', data);
        const flattendData: IProductDetails[] = [];
        for (let array = 0; array < data.edges.length; ++array) {
            const element: IItemGroupingTypeNodes = data.edges[array]
            const singleData: IProductDetails = {
                productid: element.node.itemid.rowid,
                productMRid: element.node.itemid.defaultItemName,
                proddescription: element.node.itemid.description,
                lugSize: element.node.itemid.itempackaging.unitPackagingid.rowid,
                batchRanking: null,
                packageWeight: element.node.itemid.itemweightorsize.itemShippingSize,
                // productonhold: element.itemid.active,
                productActive: element.node.itemid.active,
                rankingInGroup: null,
                packagingShippingWeight: null,
                unitsPerMaxShippingWeight: null
            };
        flattendData.push(singleData);
        }
        console.log('Here is the products data: ', flattendData);
        return flattendData;
    }

    getAllProductGroupNames(departmentid: string = 'RGVwYXJ0bWVudFR5cGU6NQ==', categoryid: string ='Q2F0ZWdvcnlUeXBlOjE4'): Observable<IProductGroupName[]> {
        return this.apollo
            .watchQuery<IDepartmentTypeConnection>({
                // departmentid = "Vendor Product Groups", categoryid = "Vendor Product Groups"
                variables: { departmentid: departmentid, categoryid: categoryid },
                query: this.productGraphqlApiStringService.ALL_PRODUCTGROUPNAMES_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateProductGroupNames(result.data.nodeProdmsDepartment.edges[0].node.categorySet.edges[0].node.groupSet.edges)));
    }

    private consolidateProductGroupNames(data: IGroupTypeNodes[]): IProductGroupName[] {
        if (data.length > 0) {
            const productGroupNameArray: IProductGroupName[] = [];
            for (let grp = 0; grp < data.length; grp++) {
                const element = data[grp]
                const productGroup: IProductGroupName = {
                    id: element.node.rowid,
                    groupName: element.node.groupName,
                    ID: null
                };
                productGroupNameArray.push(productGroup);
            }
            console.log('ALPHA (consolidateProductGroupNames) = ', productGroupNameArray);
            return productGroupNameArray;
        }
    }

}
