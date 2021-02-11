import { IContainerWithStockTakeAmount,  } from './production-stock.interface';



export class ITotalStockGroupedByProducts {
    productMRid: string
    productid: number
    productRanking: number
    productContainerData: IContainerWithStockTakeAmount[]
    productWeight: number
}

export class ITotalStockGroupedByBatches {
    batchName: string
    batchid: number
    batchRanking: number
    productData: ITotalStockGroupedByProducts[]
}