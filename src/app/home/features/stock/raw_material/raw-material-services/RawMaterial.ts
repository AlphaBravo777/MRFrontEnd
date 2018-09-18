export class IRawMaterialStockItem {
    stockName: string;
    category: string;
    supplier: string;
    baseUnitSize: number;
    measureUnit: string;
    modelGroup: string;
    modelStock: number;
    price: number;
    active: boolean;
    amount: number;
    modelPersLeft: number;
    dailyUse: number;
}

// --------------------------------------------------------------------------

export class IRawMaterialGroup {
    key: string;
    number: number;
    values: IRawMaterialStockItem[];
}
