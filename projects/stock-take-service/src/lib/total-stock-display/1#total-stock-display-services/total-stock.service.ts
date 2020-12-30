import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { TotalStockInContainers_MockFunction } from 'src/assets/mockData/stock-take-service/total-stock-data.mocks';
import { IContainerWithStockTakeAmount } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../../production-stock-take/1#product-stock-services/production-stock.service';
import { ITotalStockGroupedByBatches, ITotalStockGroupedByProducts } from '../../#shared-services/total-stock.interface';
import { TotalStockGraphqlApiService } from './total-stock-graphql-api.service';
import { IContainerInfo, IContainerInfoHash } from 'projects/production-service/src/lib/#shared-services/production.interface';

@Injectable({
    providedIn: 'root'
})
export class TotalStockService {

    constructor(
        private toolbox: ToolboxGroupService,
        private productionStockService: ProductionStockService,
        private totalStockGraphqlApiService: TotalStockGraphqlApiService,
    ) { }

    private mapContainerDataToHashByRanking(containerData: IContainerInfo[]): IContainerInfoHash {
        const rankedContainers: IContainerInfo[] = this.toolbox.sorting(containerData, 'containerRanking')
        const containerHash: IContainerInfoHash = {}
        rankedContainers.forEach((containerObj, index) => {
            containerHash[index] = containerObj
        });
        return rankedContainers
    }

    getContainerHash(): Observable<IContainerInfoHash> {
        return this.totalStockGraphqlApiService.getContainersMock().pipe(
            map(containerData => this.mapContainerDataToHashByRanking(containerData))
        )
    }

    private getContainersAndInsertAmountsMock(): Observable<IContainerWithStockTakeAmount[]> {
        return of(TotalStockInContainers_MockFunction())
    }

    private getContainersAndInsertAmounts(): Observable<IContainerWithStockTakeAmount[]> {
        return combineLatest([
            this.productionStockService.getContainersFromLocalStorageOrDatabase(),
            this.totalStockGraphqlApiService.getTotalStockTakeAmountsMock(),
        ]).pipe(
            map(([containers, stockTakeAmounts]) => this.productionStockService.insertStocktakeAmountsIntoContainers(containers, stockTakeAmounts))
        )
    }

    private getLatestStockTakeDataThatAreGrouped(): Observable<ITotalStockGroupedByBatches[]> {
        // return this.getContainersAndInsertAmounts().pipe(
        return this.getContainersAndInsertAmountsMock().pipe(
            tap(containersWithAmounts => console.log('This is what we have now: ', containersWithAmounts)),
            map(containersWithAmounts => this.groupProductsByBatches(containersWithAmounts))
        )
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

    getLatestTotalStockDataPublicAPI(): Observable<ITotalStockGroupedByBatches[]> {
        return this.getLatestStockTakeDataThatAreGrouped().pipe(
        )
    }
}
