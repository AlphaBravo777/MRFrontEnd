import { IBatchGroupFrontEnd } from 'projects/product-service/src/lib/insert-batch-group/1#insert-batch-group-services/batch-group-interface';
import { IProductionContainer } from './production-stock.interface';



export class ITotalStockGroupedByProducts {
    productMRid: string
    productid: number
    productRanking: number
    productContainerData: IProductionContainer[]
}

export class ITotalStockGroupedByBatches {
    batchName: string
    batchid: number
    batchRanking: number
    productData: ITotalStockGroupedByProducts[]
}