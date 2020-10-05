export class IProductionStock {
    productMRid: string;
    productid: number;
    packageWeight: number;
    rankingInGroup: number;
    proddescription: string;
    productonhold: boolean;
    batchGroup: string;
    batchRanking: number;
    packaging: number;
    brand: number;
    unitWeight: number;
    factoryAreaName: string;  // This might be showers, polony-pulldown-1, L-shape front
    factoryAreaRanking: number;
    factoryAreaProductRanking: number
}

export class IProductionStockByFactoryArea {
    factoryAreaName: string;
    factoryAreaProducts: IProductionStock[];
    factoryAreaRanking: number;
}
