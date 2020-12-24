import * as Factory from "factory.ts";
import * as faker from "faker";
import { IContainerWithStockTakeAmount } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { ITotalStockGroupedByBatches, ITotalStockGroupedByProducts } from 'projects/stock-take-service/src/lib/#shared-services/total-stock.interface';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { ProductionStockList_GroupsMockFunc } from './production-data-mocks';




const groupProductsByBatches = (productionStock: IContainerWithStockTakeAmount[]): ITotalStockGroupedByBatches[] => {

    const createProductDataGroups = (batchProducts): ITotalStockGroupedByProducts[] => {
        const groupedBatchProducts: { key: string, values: IContainerWithStockTakeAmount[] }[] = toolbox.groupByArray(batchProducts, 'productMRid')
        const tempBatchProductsArray: ITotalStockGroupedByProducts[] = []
        groupedBatchProducts.forEach(productGroup => {
            tempBatchProductsArray.push({
                productContainerData: productGroup.values,
                productMRid: productGroup.key,
                productRanking: productGroup.values[0].productRankingInBatch,
                productid: productGroup.values[0].productid
            })
        });
        toolbox.sorting(tempBatchProductsArray, 'productRanking')
        return tempBatchProductsArray
    }

    const toolbox: ToolboxGroupService = new ToolboxGroupService
    const groupData: { key: string, values: IContainerWithStockTakeAmount[] }[] = toolbox.groupByArray(productionStock, 'batchName');
    const totalStockTakeByBatches: ITotalStockGroupedByBatches[] = []
    groupData.forEach(batchGroup => {
        const tempTotalStockTakeByBatches: ITotalStockGroupedByBatches = {
            batchName: batchGroup.key,
            batchid: batchGroup.values[0].batchGroupid,
            batchRanking: batchGroup.values[0].batchRanking,
            productData: createProductDataGroups(batchGroup.values)
        }
        totalStockTakeByBatches.push(tempTotalStockTakeByBatches)

    });
    toolbox.sorting(totalStockTakeByBatches, 'batchRanking')
    console.log('The batch data so far = ', totalStockTakeByBatches)
    return totalStockTakeByBatches
}

export const TotalStockInContainers_MockFunction = (): IContainerWithStockTakeAmount[] => {
    
    const totalStockListAsIfComingFromDatabase: IContainerWithStockTakeAmount[] = ProductionStockList_GroupsMockFunc();
    // console.log('totalStockListAsIfComingFromDatabase = ', totalStockListAsIfComingFromDatabase)
    // const totalStockByBatchesData: ITotalStockGroupedByBatches[] = groupProductsByBatches(totalStockListAsIfComingFromDatabase)
    // // // console.log('Groups: ', prductionStockByFactoryAreaData)
    // // return prductionStockByFactoryAreaData;
    return totalStockListAsIfComingFromDatabase
}