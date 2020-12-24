import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { TotalStockInContainers_MockFunction } from 'src/assets/mockData/stock-take-service/total-stock-data.mocks';
import { IContainerWithStockTakeAmount } from '../../#shared-services/production-stock.interface';
import { ITotalStockGroupedByBatches, ITotalStockGroupedByProducts } from '../../#shared-services/total-stock.interface';

@Injectable({
    providedIn: 'root'
})
export class TotalStockService {

    constructor(
        private toolbox: ToolboxGroupService
    ) { }

    private getLatestTotalStockDataFromMockData(): Observable<IContainerWithStockTakeAmount[]> {
        return of(TotalStockInContainers_MockFunction())
    }

    private groupContainersByProducts = (batchProducts): ITotalStockGroupedByProducts[] => {
        const groupedBatchProducts: { key: string, values: IContainerWithStockTakeAmount[] }[] = this.toolbox.groupByArray(batchProducts, 'productMRid')
        const tempBatchProductsArray: ITotalStockGroupedByProducts[] = []
        groupedBatchProducts.forEach(productGroup => {
            tempBatchProductsArray.push({
                productContainerData: productGroup.values,
                productMRid: productGroup.key,
                productRanking: productGroup.values[0].productRankingInBatch,
                productid: productGroup.values[0].productid
            })
        });
        this.toolbox.sorting(tempBatchProductsArray, 'productRanking')
        return tempBatchProductsArray
    }

    private groupProductsByBatches = (productionStock: IContainerWithStockTakeAmount[]): ITotalStockGroupedByBatches[] => {
        const groupData: { key: string, values: IContainerWithStockTakeAmount[] }[] = this.toolbox.groupByArray(productionStock, 'batchName');
        const totalStockTakeByBatches: ITotalStockGroupedByBatches[] = []
        groupData.forEach(batchGroup => {
            const tempTotalStockTakeByBatches: ITotalStockGroupedByBatches = {
                batchName: batchGroup.key,
                batchid: batchGroup.values[0].batchGroupid,
                batchRanking: batchGroup.values[0].batchRanking,
                productData: this.groupContainersByProducts(batchGroup.values)
            }
            totalStockTakeByBatches.push(tempTotalStockTakeByBatches)
            });
        this.toolbox.sorting(totalStockTakeByBatches, 'batchRanking')
        console.log('The batch data so far = ', totalStockTakeByBatches)
        return totalStockTakeByBatches
    }

    getLatestTotalStockDataPublicAPI(): Observable<any> {
        return this.getLatestTotalStockDataFromMockData().pipe(
            map(data => this.groupProductsByBatches(data))
        )
    }
}
