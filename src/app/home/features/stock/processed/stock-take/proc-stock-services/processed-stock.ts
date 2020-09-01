export class IProcessedStock {
    containerID: string;
    databaseID: number;
    productid: string;
    description: string;
    batchgroup: string;
    batchcolor: string;
    brand: string;
    brandImage: string;
    container: string;
    unitweight: number;
    unitcolor: number;
    unitmeasurement: string;
    amountTimestampID: string;
    factoryRanking: number;
    filter: string;
    filterRating: number;
    factoryFilter: string;
    factoryFilterRating: number;
}

export class IProcessedStockWithAmount extends IProcessedStock {
    amount?: number;
}

export class IProcessedStockGroup {
    key: string;
    values: IProcessedStock[];
    filters?: any[];
}

export class IProcessedStockAmounts {
    amount: number;
    containerID: string;
    databaseID: number;
    deleteAmount: boolean;
}
