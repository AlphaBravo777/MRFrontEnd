export class IHppStockDataMain {
    pnpOrder?: IHppProducts[];
    mrStock?: IHppBatchGroups[];
    hppStock?: IHppBatchGroups[];
    hppLeakers?: IHppBatchGroups[];
}

export class IHppBatchGroups {
    batchNumber: string;
    products: IHppProducts[];
}

export class IHppProducts {
    productid: string;
    timestampid: number;
    amount: number;
    truckCode?: string;
    condition?: string;
}

