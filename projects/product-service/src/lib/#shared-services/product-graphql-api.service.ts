import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { IItemBasic } from './interfaces/item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMeasuringUnit, IPackaging, IItemVendor, IDepartment, ICategory, IGroup } from './interfaces/auxiliary';

@Injectable({
    providedIn: 'root'
})
export class ProductGraphqlApiService {

    public ALL_ITEMS_BASIC_QUERY = gql`
        query ItemsBasic {
            nodeProdmsItem {
                edges{
                    node{
                        name
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
                        packaging
                        weight
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
                        name
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
                        name
                        rankingInDepartment
                        rowid
                        categorySet{
                            edges{
                                node{
                                    name
                                    rankingInCategory
                                    rowid
                                    groupSet{
                                        edges{
                                            node{
                                                name
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


    constructor(private apollo: Apollo) { }

    getAllItemsBasicInfo(): Observable<IItemBasic[]> {
        return this.apollo
            .watchQuery<any>({
                // context: { headers: headers},
                // variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: this.ALL_ITEMS_BASIC_QUERY,
            })
            .valueChanges.pipe(
                map(result => this.consolidateBasicItems(result.data['nodeProdmsItem'].edges)));
    }

    private consolidateBasicItems(data): IItemBasic[] {
        if (data.length > 0) {
            const itemBasicsArray: IItemBasic[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: IItemBasic = {
                    itemName: element.name,
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
            .watchQuery<any>({
                // context: { headers: headers},
                // variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: this.MEASURING_UNITS,
            })
            .valueChanges.pipe(
                map(result => this.consolidateMeasuringUnits(result.data['nodeProdmsMeasuringUnit'].edges)));
    }

    private consolidateMeasuringUnits(data): IMeasuringUnit[] {
        if (data.length > 0) {
            const measureingUnitsArray: IMeasuringUnit[] = [];
            for (let unit = 0; unit < data.length; unit++) {
                const element = data[unit].node;
                const weeklyProduct: IMeasuringUnit = {
                    unit: element.unit,
                    unitid: element.rowid,
                    convertionToMainUnitAmount: element.convertionToMainUnitAmount,
                    mainUnitid: element.mainUnit.unit,
                    mianUnit: element.mainUnit.rowid
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
            .watchQuery<any>({
                // context: { headers: headers},
                // variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: this.PACKAGING,
            })
            .valueChanges.pipe(
                map(result => this.consolidatePackaging(result.data['nodeProdmsPackaging'].edges)));
    }

    private consolidatePackaging(data): IPackaging[] {
        if (data.length > 0) {
            const packagingArray: IPackaging[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: IPackaging = {
                    packaging: element.packaging,
                    packagingid: element.rowid,
                    weight: element.weight
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
            .watchQuery<any>({
                // context: { headers: headers},
                // variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: this.VENDORS,
            })
            .valueChanges.pipe(
                map(result => this.consolidateVendors(result.data['nodeProdmsItemVendor'].edges)));
    }

    private consolidateVendors(data): IItemVendor[] {
        if (data.length > 0) {
            const vendorArray: IItemVendor[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: IItemVendor = {
                    vendor: element.name,
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
            .watchQuery<any>({
                // context: { headers: headers},
                // variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: this.ALL_GROUPING_CATAGORIES,
            })
            .valueChanges.pipe(
                map(result => this.consolidateDepartments(result.data['nodeProdmsDepartment'].edges)));
    }

    private consolidateDepartments(data): IDepartment[] {
        if (data.length > 0) {
            const departmentArray: IDepartment[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: IDepartment = {
                    name: element.name,
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

    private consolidateCategories(data): ICategory[] {
        if (data.length > 0) {
            const categoryArray: ICategory[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: ICategory = {
                    name: element.name,
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

    private consolidateGroups(data): IGroup[] {
        if (data.length > 0) {
            const groupArray: IGroup[] = [];
            for (let prod = 0; prod < data.length; prod++) {
                const element = data[prod].node;
                const weeklyProduct: IGroup = {
                    name: element.name,
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

}
