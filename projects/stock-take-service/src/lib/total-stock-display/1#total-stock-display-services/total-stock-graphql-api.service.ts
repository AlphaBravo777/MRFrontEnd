import { Injectable } from '@angular/core';
import { IContainerInfo } from 'projects/production-service/src/lib/#shared-services/production.interface';
import { Observable, of } from 'rxjs';
import { totalStockContainerAmounts_MockFunction, containerDetailList_mockFunction } from 'src/assets/mockData/stock-take-service/total-stock-data.mocks';
import { IStockTakeAmountHash, IStockTakeAmountPerBatch, IStockTakeAmountPerContainer } from '../../#shared-services/production-stock.interface';
import { Apollo } from 'apollo-angular';
import { TotalStockGraphqlStringService } from './total-stock-graphql-string.service';
import { map } from 'rxjs/operators';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';

@Injectable({
    providedIn: 'root'
})
export class TotalStockGraphqlApiService {

    constructor(
        private apollo: Apollo,
        private totalStockGraphqlStringService: TotalStockGraphqlStringService,
        private toolbox: ToolboxGroupService
    ) { }

    getTotalStockTakeAmountsMock(): Observable<IStockTakeAmountHash> {
        return of(totalStockContainerAmounts_MockFunction())
    }

    getTotalStockTakeAmounts(): Observable<IStockTakeAmountHash> {
        return this.apollo
            .watchQuery<any>({
                query: this.totalStockGraphqlStringService.GET_ALL_TOTAL_STOCK_AMOUNTS
            })
            .valueChanges.pipe(
                map(result => this.consolidateStockTotalAmounts(this.toolbox.refractureGraphqlRawData(result)['nodeTotalProcessedStockInfo']))
            );
    }

    private consolidateStockTotalAmounts(amountData): IStockTakeAmountHash {


        // console.log('+ + + + + + + amountData ', amountData)

        const createStockBatchArray = (batches): IStockTakeAmountPerBatch[] => {

            if (batches.length === 0) {
                return null
            }

            const stockTakeBatchesArray: IStockTakeAmountPerBatch[] = []

            for (let index = 0; index < batches.length; index++) {
                const batch = batches[index];
                const containerHash: IStockTakeAmountPerBatch = {
                    id: batch.rowid,
                    amount: batch.amount,
                    amountString: null,
                    dayNumber: batch.batchNode.day,
                    weekNumber: batch.batchNode.weeknumber, 
                    year: batch.batchNode.year
                };
                stockTakeBatchesArray.push(containerHash)
            }
            return stockTakeBatchesArray
        }

        const containerHash: IStockTakeAmountHash = {};
        for (let index = 0; index < amountData.length; index++) {
            const container = amountData[index];

            const newContainer: IStockTakeAmountPerContainer = {
                containerid: container.containerid,
                stockBatches: createStockBatchArray(container.processedstockbatchamountSet)
            }
            if (newContainer.stockBatches) {
                containerHash[newContainer.containerid] = newContainer
            }
            
        }
        // console.log('- - - - - - - - containerHash ', containerHash[1])
        return containerHash
    }

    getContainersMock(): Observable<IContainerInfo[]> {
        return of(containerDetailList_mockFunction())
    }

    getContainers(): Observable<IContainerInfo[]> {
        return this.apollo
            .watchQuery<any>({
                query: this.totalStockGraphqlStringService.GET_ALL_CONTAINER_DATA
            })
            .valueChanges.pipe(
                map(result => this.consolidateContainerData(this.toolbox.refractureGraphqlRawData(result)['nodeContainerName']))
            );
    }

    private consolidateContainerData(containerData): IContainerInfo[] {

        console.log('- - - - - - - - consolidateContainerData ', containerData)

        const containerDataArray: IContainerInfo[] = []

        for (let index = 0; index < containerData.length; index++) {
            const container = containerData[index];
            const containerHash: IContainerInfo = {
                containerIndex: null,
                containerName: container.containerName,
                containerRanking: container.containerRanking,
                containerid: container.rowid,
                showContainer: false
            };
            containerDataArray.push(containerHash)
        }
        return containerDataArray
    }

}
