import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ProductionStockList_GroupsMockFunc } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IProductionContainer, IStockTakeContainerHash, IContainerWithStockTakeAmount, IStockTakeAmountHash, IStockTakeInstance, IStockTakeAmountPerBatch } from '../../#shared-services/production-stock.interface';
import { ProductStockGraphqlStringService } from './product-stock-graphql-string.service';
import { TotalStockGraphqlApiService } from '../../total-stock-display/1#total-stock-display-services/total-stock-graphql-api.service';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductStockGraphqlApiService {

    constructor(
        private apollo: Apollo,
        private productStockGraphqlStringService: ProductStockGraphqlStringService,
        private totalStockGraphqlApiService: TotalStockGraphqlApiService,
        private toolbox: ToolboxGroupService
    ) { }



    getStockTakeAmountsForStockTakeInstance(stockTakeInstance: IStockTakeInstance): Observable<IStockTakeAmountHash> {
        return this.apollo
            .watchQuery<any>({
                variables: {timeStampid: stockTakeInstance.timeStampid},
                query: this.productStockGraphqlStringService.GET_ALL_STOCKTAKE_AMOUNTS_FOR_STOCK_TAKE_INSTANCE
            })
            .valueChanges.pipe(
                map(result => this.consolidateStockTakeAmounts(this.toolbox.refractureGraphqlRawData(result)['nodeStockTakeInstance'][0]['stocktakeinstancepercontainerSet']))
            );
    }

    private consolidateStockTakeAmounts(amountData): IStockTakeAmountHash {
        // console.table('consolidateStockTakeAmounts: ', amountData)
        const stockTakeAmountHash: IStockTakeAmountHash = {};
        for (let index = 0; index < amountData.length; index++) {
            const instanceContainer = amountData[index];
            const batchArray: IStockTakeAmountPerBatch[] = []

            for (let i = 0; i < instanceContainer.stocktakebatchamountSet.length; i++) {
                const batch = instanceContainer.stocktakebatchamountSet[i];

                const newBatch: IStockTakeAmountPerBatch = {
                    amount: null,
                    amountString: batch.amountString,
                    dayNumber: batch.batchNode.day,
                    id: batch.batchid,
                    weekNumber: batch.batchNode.weeknumber,
                    year: batch.batchNode.year
                }
                batchArray.push(newBatch)
            }
            
            stockTakeAmountHash[instanceContainer.internalProductContainerid.productContainerid] = {containerid: instanceContainer.internalProductContainerid.productContainerid, stockBatches: batchArray}
        }
        console.log('stockTakeAmountHash of stockInstance: ', stockTakeAmountHash)
        return stockTakeAmountHash
    }

    getTotalStockTakeAmountsToGetBatchesInUse(): Observable<IStockTakeAmountHash> {
        return this.totalStockGraphqlApiService.getTotalStockTakeAmounts().pipe()
    }


    getAllProducts(): Observable<IContainerWithStockTakeAmount[]> {
        return of(ProductionStockList_GroupsMockFunc());
        // return of(null);
    }
}
