import { IBatchGroupFrontEnd } from 'projects/product-service/src/lib/insert-batch-group/1#insert-batch-group-services/batch-group-interface';
import { IBatchInfo } from 'projects/production-service/src/lib/#shared-services/production.interface';

// Just the normal batch with its data, then we add the stocktake amount data to it
export class IStockTakeAmountPerBatch extends IBatchInfo {
    amount: number;
    amountString: string;
}

// This is the data that we get from the backend when we get the stocktake amounts data
export class IStockTakeAmountPerContainer {
    containerid: number;
    stockBatches: IStockTakeAmountPerBatch[];
}


// This is just the container as it comes from localStorage or from the database
export class IProductionContainer {
    containerid: number;
    containerName: string;
    productMRid: string;
    productid: number;
    packageWeight: number;
    productRankingInBatch: number;
    proddescription: string;
    productonhold: boolean;
    batchGroupid: number;
    batchName: string;
    batchRanking: number;
    packaging: number;
    brand: number;
    unitWeight: number;
    factoryAreaName: string;
    factoryAreaRanking: number;
    factoryAreaProductRanking: number
    showBatches: boolean;
    fullStockTake: boolean;
}

// This are the amounts that come form the stock take, and are added to the containers
export class IContainerWithStockTakeAmount extends IProductionContainer {
    stockTakeAmount: IStockTakeAmountPerBatch[];
}

export class IProductionStockByFactoryArea {
    factoryAreaName: string;
    factoryAreaProducts: IContainerWithStockTakeAmount[];
    factoryAreaRanking: number;
}

export class IStockTakeInstance {
    id: number
    ID: string;
    timeStampid: number
    userid: number
    username: string
    stockTakerName: string
    isFullStockTake: boolean
    stockTakeLocked: boolean
    parentStockTake: number
    year: number
    dayNumber: number
    weekNumber: number
    stockTakeTime: string
    shortDate: string
}

export class IStockTake extends IStockTakeInstance {
    containers: IProductionStockByFactoryArea[]
}

export class IStockTakeContainerHash {
    [containerid: number]: IProductionContainer;
}

export class IStockTakeAmountHash {
    [containerid: number]: IStockTakeAmountPerContainer;
}




