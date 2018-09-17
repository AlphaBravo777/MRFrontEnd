export class IRawMaterialStockItem {
    stockName: string;
    category: string;
    supplier: string;
    baseUnitSize: number;
    measureUnit: string;
    modelGroup: string;
    price: number;
    active: boolean;
    amount: number;
    modelPersLeft: number;
}

// --------------------------------------------------------------------------

export class IRawMaterialGroup {
    key: string;
    number: number;
    values: IRawMaterialStockItem[];
}
