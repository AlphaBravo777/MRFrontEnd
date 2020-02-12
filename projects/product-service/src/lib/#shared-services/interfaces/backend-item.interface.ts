import { IItemGroup, IItemForm, IItemFormBuildingBlocks, IItemPrice } from './item';

class IItemBuildingBlocks {
    itemid: number;
    buildingBlock: number;
    quantity: number;
}

class ICalculatedPrice {
    itemid: number;
    priceSource: number;
    modifier: number;
}

class IItemGrouping {
    itemid: number;
    departmentid: number;
    catagoryid: number;
    groupid: number;
    itemCode: string;
}

export class IItemBackend {
    id: number;
    name: string;
    size: number;
    unit: number;
    active: boolean;
    packaging: number;
    price: number;
    vendor: number;
    buildingBlocks: IItemBuildingBlocks[];
    calculatedPrice: ICalculatedPrice;
    itemGrouping: IItemGrouping[];
}

function factory_createItemGroup(formItemGroup: IItemGroup[], itemid: number): IItemGrouping[] {

    const itemGroupingArray: IItemGrouping[] = [];
    for (let grp = 0; grp < formItemGroup.length; grp++) {
        const element = formItemGroup[grp];
        const itemGroup: IItemGrouping = {
            catagoryid: element.categoryData.categoryid,
            departmentid: element.departmentData.departmentid,
            groupid: element.groupData.groupid,
            itemCode: element.itemCode,
            itemid: itemid
        };
        console.log('formItemGroup = ', itemGroup);
        itemGroupingArray.push(itemGroup);
    }
    return itemGroupingArray;
}

function factory_createBuildingBlocks(formBuildingBlocks: IItemFormBuildingBlocks[], itemid: number): IItemBuildingBlocks[] {
    const buildingBlockArray: IItemBuildingBlocks[] = [];
    for (let block = 0; block < formBuildingBlocks.length; block++) {
        const element = formBuildingBlocks[block];
        const buildingBlock: IItemBuildingBlocks = {
            buildingBlock: element.buildingblockid,
            itemid: itemid,
            quantity: element.quantity
        };
        buildingBlockArray.push(buildingBlock);
    }
    return buildingBlockArray;
}

function factory_createCalculatedPrice(formCalculatedPrice: IItemPrice, itemid: number): ICalculatedPrice {
    return {
        itemid: itemid,
        modifier: formCalculatedPrice.calculatedPriceModifier,
        priceSource: formCalculatedPrice.calculatedPriceItemid
    };
}

export function factory_createBackendItemFromForm(formData: IItemForm): IItemBackend  {
    return {
        id: formData.identification.itemid,
        name: formData.identification.name,
        size: formData.size.size,
        unit: formData.size.unitid,
        active: formData.singleInfo.active,
        packaging: formData.packaging.packagingid,
        price: formData.pricing.price,
        vendor: formData.vendor.vendorid,
        buildingBlocks: factory_createBuildingBlocks(<IItemFormBuildingBlocks[]>formData.buildingBlocks, formData.identification.itemid),
        calculatedPrice: factory_createCalculatedPrice(<IItemPrice>formData.pricing, formData.identification.itemid),
        itemGrouping: factory_createItemGroup(<IItemGroup[]>formData.identification.itemGroupWithID, formData.identification.itemid),
    };
}
