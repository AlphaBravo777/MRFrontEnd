import { IPackaging, IDepartment, ICategory, IGroup } from './auxiliary';

export class IItemGroup {
    departmentData: IDepartment;
    categoryData: ICategory;
    groupData: IGroup;
    itemCode: string;
}

export class IItem {
    itemid: number;
    name: string;
    active: boolean;
    size: number;
    unitid: number;
    unit: string;
    convertionToMainUnitAmount: number;
    mainUnitid: number;
    mainUnit: string;
    price: number;
    quantity: number;
    calculatedPriceModifier: number;
    calculatedPriceItemid: number;
    packaging: string | IPackaging;
    buildingBlocks: string | IItem[];
    itemGroup: string | IItemGroup;

}
