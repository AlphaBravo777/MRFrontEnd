import { Injectable } from '@angular/core';
import { combineLatest, iif, Observable, of, throwError } from 'rxjs';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { IProductionStockByFactoryArea, IContainerWithStockTakeAmount, IStockTakeInstance, IStockTake, IStockTakeAmountPerContainer, IStockTakeContainerHash, IStockTakeAmountHash, IStockTakeAmountPerBatch } from '../../#shared-services/production-stock.interface';
import { ProductStockGraphqlApiService } from './product-stock-graphql-api.service';
import { map, tap } from 'rxjs/operators';
import { StockCreateData$Service } from '../../stock-take-create/1#stock-create-services/stock-create-data$.service';
import { factory_createStockTake_fromInstanceAndContainers, factory_stocktakeFrontEndToBackend } from '../../#shared-services/stock-take-factory.interface';
import { ProductionStockList_GroupsMockFunc } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { FormArray, FormGroup } from '@ng-stack/forms';
import { ProductionStockRestApiService } from './production-stock-rest-api.service';
import { SnackBarAlertService } from 'src/app/home/core/alerts/snack-bar-alert-service/snack-bar-alert.service';
import { CreateBatchService } from 'projects/production-service/src/lib/create-batch/1#create-batch-services/create-batch.service';
import { Router } from '@angular/router';
import { ProductionService } from 'projects/production-service/src/lib/#shared-services/production.service';

@Injectable({
    providedIn: 'root'
})
export class ProductionStockService {

    constructor(
        private toolbox: ToolboxGroupService,
        private productStockGraphqlApiService: ProductStockGraphqlApiService,
        private stockCreateData$Service: StockCreateData$Service,
        private productionStockRestApiService: ProductionStockRestApiService,
        private snackBarAlertService: SnackBarAlertService,
        private createBatchService: CreateBatchService,
        private router: Router,
        private productionService: ProductionService
        ) { }




    private getCurrentStockTakeAmounts(stockTakeInstance: IStockTakeInstance): Observable<IStockTakeAmountHash>  {

        if (!stockTakeInstance) {
            this.snackBarAlertService.alert('getCurrentStockTakeAmounts - No stock take selection was found', 'X')
            this.router.navigate(['main/stock-take/entry/create-stock-take']);
            throw new Error('getCurrentStockTakeAmounts - No stock take selection was found')
        }
        // Here we have to look if the stocktake was already taken (locked), which means we get the data for the stocktake, or if it is a new stocktake, then get curre stock amounts so that we can know what batches are available
        return iif(() => 
            stockTakeInstance.stockTakeLocked,
            this.productStockGraphqlApiService.getStockTakeAmountsForStockTakeInstance(stockTakeInstance),
            this.productStockGraphqlApiService.getTotalStockTakeAmountsToGetBatchesInUse()
        ).pipe()
    }

    insertStocktakeAmountsIntoContainers(containersHash: IStockTakeContainerHash, stockTakeAmountsHash: IStockTakeAmountHash): IContainerWithStockTakeAmount[] {

        const containerWithStockDataArray: IContainerWithStockTakeAmount[] = []

        const containerHasAStocktakeAmountAvailable = () => {
            return stockTakeAmountsHash[key] !== undefined
        }

        const insertStocktakeAmountsForContainer = () => {
            const containerWithStockData: IContainerWithStockTakeAmount = {...containersHash[key], stockTakeAmount: stockTakeAmountsHash[key].stockBatches}
            containerWithStockDataArray.push(containerWithStockData)
            // Key was deleted to check if there was amounts that we had without having a container for it. 
            delete stockTakeAmountsHash[key]
        }

        const insertNullValueForStocktakeAmount = () => {
            containerWithStockDataArray.push({...containersHash[key], stockTakeAmount: null, stockTakeWeight: null});
        }

        // The use of this check is because you do not want there to be amounts available, without a container to put it in. But this might be problamatic due to the fact that if you de-activate a container (it is no longer in use), you will still have its last stocktake amount without having the container, which is a perfectly legitimate situation
        const checkThatAllAmountsHasAContainer = () => {
            if (Object.keys(stockTakeAmountsHash).length > 0) {
                let orphaneContainers: string = '';
                for (var key in stockTakeAmountsHash) {
                    orphaneContainers += key.toString() + ', '
                } 
                throw new Error('There was no container id that matched the amountid: ' + orphaneContainers);
            }
        }

        for (var key in containersHash) {
            if (containersHash.hasOwnProperty(key)) {
                if (containerHasAStocktakeAmountAvailable()) {
                    insertStocktakeAmountsForContainer()
                } else {
                    insertNullValueForStocktakeAmount()
                }
            }
        }
        // checkThatAllAmountsHasAContainer()

        return containerWithStockDataArray
        // return ProductionStockList_GroupsMockFunc()
    }

    private getStocktakeDataAsGroupedContainers(stockTakeInstance: IStockTakeInstance): Observable<IProductionStockByFactoryArea[]> {
        return combineLatest([
            this.productionService.getContainersFromLocalStorageOrDatabase(),
            this.getCurrentStockTakeAmounts(stockTakeInstance),
            this.createBatchService.getTodaysBatch()
        ]).pipe(
            map(([containers, stockTakeAmounts]) => this.insertStocktakeAmountsIntoContainers(containers, stockTakeAmounts)),
            map(containersWithAmounts => this.groupProductionStockByFactoryArea(containersWithAmounts))
        )
    }

    private continueWithGettingStocktakeData(stockTakeInstance: IStockTakeInstance): Observable<IStockTake> {
        return this.getStocktakeDataAsGroupedContainers(stockTakeInstance).pipe(
            map(groupedContainers => factory_createStockTake_fromInstanceAndContainers(stockTakeInstance, groupedContainers))
        )

    }

    getStockTakeDataAPI(): Observable<IStockTake> {
        const stockTakeInstanceIsAvailable: IStockTakeInstance = this.stockCreateData$Service.stockInstanceValue
        return iif(() => 
            stockTakeInstanceIsAvailable !== null,
            this.continueWithGettingStocktakeData(stockTakeInstanceIsAvailable),
            throwError(new Error('getStockTakeData - No stock take selection was found'))
        )
    }

    // private getAllProducts(): Observable<IProductionStockByFactoryArea[]> {

    //     return this.productStockGraphqlApiService.getAllProducts().pipe(
    //         map(productionStock => this.groupProductionStockByFactoryArea(productionStock)),
    //     )
    // }

    private groupProductionStockByFactoryArea(productionStock: IContainerWithStockTakeAmount[]): IProductionStockByFactoryArea[] {

        if (!productionStock) return null

        const groupData: {key: string, values: IContainerWithStockTakeAmount[]}[] = this.toolbox.groupByArray(productionStock, 'factoryAreaName');
        const productionStockByFactoryAreaData: IProductionStockByFactoryArea[] = []
        groupData.forEach(element => {
            productionStockByFactoryAreaData.push({
                factoryAreaName: element.key,
                factoryAreaProducts: element.values,
                factoryAreaRanking: element.values[0].factoryAreaRanking
            })
        });
        this.toolbox.sorting(productionStockByFactoryAreaData, 'factoryAreaRanking')
        productionStockByFactoryAreaData.forEach(element => this.toolbox.sorting(element.factoryAreaProducts, 'factoryAreaProductRanking'))
        return productionStockByFactoryAreaData
    }

    private filterOnlyAmountsThatWereChangedAndIsNotEmpty(stockTakeForm: FormArray<IProductionStockByFactoryArea>): IContainerWithStockTakeAmount[] {
        const changedAmountsArray: IContainerWithStockTakeAmount[] = []
        stockTakeForm.controls.forEach(area => {

            area.get('factoryAreaProducts').controls.forEach(container => {

                const changedBatches: IStockTakeAmountPerBatch[] = []
                container.get('stockTakeAmount').controls.forEach(batch => {

                    if (batch.get('amountString').dirty && batch.get('amountString').value !== '') {
                        changedBatches.push(batch.value)
                    }
                })
                if (changedBatches.length > 0) {
                    const changedContainer: IContainerWithStockTakeAmount = container.value
                    changedContainer.stockTakeAmount = changedBatches
                    changedAmountsArray.push(changedContainer)
                }

            });
            
        });
        
        return changedAmountsArray
    }

    submitStockTakeAPI(stockTakeForm: FormGroup<IStockTake>): Observable<any> {
        const changedAmountsArray = this.filterOnlyAmountsThatWereChangedAndIsNotEmpty(stockTakeForm.get('containers'))
        return this.productionStockRestApiService.insertStockTake(factory_stocktakeFrontEndToBackend(stockTakeForm.value, changedAmountsArray)).pipe()
    }

}
