import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ProductionStockList_GroupsMockFunc } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IProductionContainer, IStockTakeContainerHash, IContainerWithStockTakeAmount, IStockTakeAmountHash, IStockTakeInstance, IStockTakeAmountPerBatch } from '../../#shared-services/production-stock.interface';
import { ProductStockGraphqlStringService } from './product-stock-graphql-string.service';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductStockGraphqlApiService {

    constructor(
        private apollo: Apollo,
        private productStockGraphqlStringService: ProductStockGraphqlStringService,
        private toolbox: ToolboxGroupService
    ) { }

        // Get at the same time stocktakeInstance, containerids, and amounts
        // The data that we are looking for the most is the container data with all its data attached to it
        // So first check if our container data is not available form the localStorage, then load it. Save lovalStorage data as a hash if containerid's
        // If there is no data, then get the data new and at it to local storage
        // This is not the stocktakeInstance data, only the container data
        // Then we need to check if there is any counted data for the current stockInstance, and add the data
        // Any container which did not have data added, should be shown as 0
        // When counting only show the lines that need to be counted, depending on the thoroughness of the stocktake
        // In the backend we need to store all containers that have a value, even if they were not counted then we need to go check at the previous stocktake if there was a value, if a container does not have a value, it means it is 0
        // There should be three api calls, the stocktake Instance, the containers, and the data in the containers. Add those things together and the organize them into groups.
        // The containers should always be pulled from the localStorage, if there is nothing in the localStorage then first add it, and then pull from it again. 

        // Get the productInstance data
        // Get the stocktake data for that instance (If there is any)
        // Get all the containers that needs to be counted (depending on the stocktake chosen (halfStockTake?))
        // Inserted the counted containers into the containers that we have
        // When we insert the data that was changed, then the backend will look if there is an id, and if there is it will just update it, else it would create an order, same with the batches
        // Maybe have a refresh product button so that you do not have to load the products everytime you do a stock take...then you only load the amounts.

        // We get here by getting the stock data from the backend, but we also need the the data form every container that there is, because it may be that we are not going to get every container with data, but then we can not leave containers out. So when we get the data that was already inserted, we also need to get all containers, as wel as the stockTakeInstace data (that we should actually already have). We will have a createstocktake page, when we have created a stocktake and we select a createstocktake to use, we then store the data, and open up to this data container page that fetches that data.

    getContainersData(): Observable<IStockTakeContainerHash> {
        return this.apollo
            .watchQuery<any>({
                query: this.productStockGraphqlStringService.ALL_STOCKTAKE_CONTAINERS_DATA
            })
            .valueChanges.pipe(
                map(result => this.consolidateContainers(this.toolbox.refractureGraphqlRawData(result)['nodeProductlist']))
            );
    }

    private consolidateContainers(containerData): IStockTakeContainerHash {
        const containerHash: IStockTakeContainerHash = {};
        for (let index = 0; index < containerData.length; index++) {
            const product = containerData[index];

            for (let i = 0; i < product.productcontainersSet.length; i++) {
                const container = product.productcontainersSet[i];

                const newContainer: IProductionContainer = {
                    containerid: container.rowid,
                    containerName: container.containernameid.containername,
                    productid: product.rowid,
                    productMRid: product.productid,
                    proddescription: product.proddescription,
                    factoryAreaName: container.factoryAreaNode.area,
                    factoryAreaRanking: container.factoryAreaNode.areaRanking,
                    factoryAreaProductRanking: container.factoryRanking,
                    fullStockTake: container.deleteContainerAmount,
                    showBatches: container.showBatches,
                    batchGroup: null,
                    batchRanking: null,
                    brand: null,
                    packageWeight: null,
                    packaging: null,
                    productonhold: null,
                    rankingInGroup: null,
                    unitWeight: null
                }
                containerHash[newContainer.containerid] = newContainer
            }
            
        }
        return containerHash
    }

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
            
            stockTakeAmountHash[instanceContainer.productContainerid] = {containerid: instanceContainer.productContainerid, stockBatches: batchArray}
        }
        // console.log('stockTakeAmountHash: ', stockTakeAmountHash)
        return stockTakeAmountHash
    }

    getAllProducts(): Observable<IContainerWithStockTakeAmount[]> {
        return of(ProductionStockList_GroupsMockFunc());
        // return of(null);
    }
}
