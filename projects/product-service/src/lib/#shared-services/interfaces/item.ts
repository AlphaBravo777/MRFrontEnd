import { IPackaging, IDepartment, ICategory, IGroup, IItemVendor } from './auxiliary';

export class IItemGroup {
    departmentData: IDepartment;
    categoryData: ICategory;
    groupData: IGroup;
    itemCode: string;
    rankInGroup: number;
}

export class IItemSingleInfo {
    active: boolean;
}

export class IItemPrice {
    price: number;
    calculatedPriceModifier: number;
    calculatedPriceItemid: number;
    calculatedPriceItemName: string;
}

export class IItemSize {
    size: number;
    unitid: number;
    unit: string;
    convertionToMainUnitAmount: number;
}

export class IItemName {
    itemid: number;
    name: string;
    itemGroupWithID: string | IItemGroup[];
}

export class IItemFormBuildingBlocks {
    buildingblockName: string;
    buildingblockid: number;
    quantity: number;
}

export class IItemForm {
    identification: IItemName;
    pricing: IItemPrice;
    singleInfo: IItemSingleInfo;
    size: IItemSize;
    vendor: IItemVendor;
    packaging: IPackaging;
    buildingBlocks: IItemFormBuildingBlocks[];
}

export class IItemFormString {
    identification: string;
    pricing: string;
    singleInfo: string;
    size: string;
    vendor: string;
    packaging: string;
    buildingBlocks: string;
}

export class IItemBasic {
    itemName: string;
    itemid: number;
}
