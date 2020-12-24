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
        private router: Router
        ) { }


    getContainersFromLocalStorageOrDatabase(): Observable<IStockTakeContainerHash> {
        const stockTakeContainers: IStockTakeContainerHash = JSON.parse(localStorage.getItem('stockTakeContainers'))
        if (stockTakeContainers) {
            return of(stockTakeContainers)
        } else {
            return this.productStockGraphqlApiService.getContainersData().pipe(
                tap(containerData => localStorage.setItem('stockTakeContainers', JSON.stringify(containerData)))
            )
        }
    }

    private getCurrentStockTakeAmounts(stockTakeInstance: IStockTakeInstance): Observable<IStockTakeAmountHash>  {
        if (!stockTakeInstance) {
            this.snackBarAlertService.alert('getCurrentStockTakeAmounts - No stock take selection was found', 'X')
            this.router.navigate(['main/stock-take/entry/create-stock-take']);
            throw new Error('getCurrentStockTakeAmounts - No stock take selection was found')
        }
        return this.productStockGraphqlApiService.getStockTakeAmountsForStockTakeInstance(stockTakeInstance).pipe()
    }

    private insertStocktakeAmountsIntoContainers(containers: IStockTakeContainerHash, stockTakeAmounts: IStockTakeAmountHash): IContainerWithStockTakeAmount[] {
        
        const containerWithStockDataArray: IContainerWithStockTakeAmount[] = []

        const containerHasPreviouslyInsertedData = () => {
            const containerWithStockData: IContainerWithStockTakeAmount = {...containers[key], stockTakeAmount: stockTakeAmounts[key].stockBatches}
            containerWithStockDataArray.push(containerWithStockData)
            delete stockTakeAmounts[key]
        }

        for (var key in containers) {
            if (containers.hasOwnProperty(key)) {
                if (stockTakeAmounts[key] !== undefined) {
                    containerHasPreviouslyInsertedData()
                } else {
                    containerWithStockDataArray.push({...containers[key], stockTakeAmount: null});
                }
            }
        }

        const checkThatAllAmountsHasAContainer = () => {
            if (Object.keys(stockTakeAmounts).length > 0) {
                let orphaneContainers: string = '';
                for (var key in stockTakeAmounts) {
                    orphaneContainers += key.toString() + ', '
                } 
                throw new Error('There was no container id that matched the amountid: ' + orphaneContainers);
            }
        }

        checkThatAllAmountsHasAContainer()

        return containerWithStockDataArray
        // return ProductionStockList_GroupsMockFunc()
    }

    private getStocktakeDataAsGroupedContainers(stockTakeInstance: IStockTakeInstance): Observable<IProductionStockByFactoryArea[]> {
        return combineLatest([
            this.getContainersFromLocalStorageOrDatabase(),
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

    getStockTakeData(): Observable<IStockTake> {
        const stockTakeInstanceIsAvailable: IStockTakeInstance = this.stockCreateData$Service.stockInstanceValue
        return iif(() => 
            stockTakeInstanceIsAvailable !== null,
            this.continueWithGettingStocktakeData(stockTakeInstanceIsAvailable),
            throwError(new Error('getStockTakeData - No stock take selection was found'))
        )
    }

    getAllProducts(): Observable<IProductionStockByFactoryArea[]> {

        return this.productStockGraphqlApiService.getAllProducts().pipe(
            map(productionStock => this.groupProductionStockByFactoryArea(productionStock)),
        )
    }

    groupProductionStockByFactoryArea(productionStock: IContainerWithStockTakeAmount[]): IProductionStockByFactoryArea[] {

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

    filterOnlyAmountsThatWereChanged(stockTakeForm: FormArray<IProductionStockByFactoryArea>): IContainerWithStockTakeAmount[] {
        const changedAmountsArray: IContainerWithStockTakeAmount[] = []
        stockTakeForm.controls.forEach(area => {

            area.get('factoryAreaProducts').controls.forEach(container => {

                const changedBatches: IStockTakeAmountPerBatch[] = []
                container.get('stockTakeAmount').controls.forEach(batch => {

                    if (batch.get('amountString').dirty) {
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

    submitStockTake(stockTakeForm: FormGroup<IStockTake>): Observable<any> {
        const changedAmountsArray = this.filterOnlyAmountsThatWereChanged(stockTakeForm.get('containers'))
        return this.productionStockRestApiService.insertStockTake(factory_stocktakeFrontEndToBackend(stockTakeForm.value, changedAmountsArray)).pipe()
    }

}
