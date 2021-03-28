import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';
import { IBatchInfo } from 'projects/production-service/src/lib/#shared-services/production.interface';
import { CreateBatchData$Service } from 'projects/production-service/src/lib/create-batch/1#create-batch-services/create-batch-data$.service';
import { IContainerWithStockTakeAmount, IProductionStockByFactoryArea, IStockTake, IStockTakeAmountPerBatch } from '../../#shared-services/production-stock.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductStockFormService {

    constructor(
        private createBatchData$Service: CreateBatchData$Service

    ) { }

    private mainStockForm: FormGroup<IStockTake>
    private todaysBatch: IBatchInfo
    private isStockTakeLocked: boolean
    private showBatches: boolean

    createMainStockFormGroup(stockData: IStockTake): FormGroup<IStockTake> {

        if (!stockData) return null
        
        this.isStockTakeLocked = stockData.stockTakeLocked
        this.todaysBatch = null // Make sure we reset for incase the days change, then we do not want to previous days data still
        this.mainStockForm = this.createMainStockForm(stockData)

        if (this.isStockTakeLocked) {
            this.mainStockForm.disable()
        }

        return this.mainStockForm
    }

    private createMainStockForm(stockData: IStockTake): FormGroup<IStockTake> {
        const stockFormGroup:FormGroup<IStockTake> = new FormGroup<IStockTake>({
            ID: new FormControl(stockData.ID),
            dayNumber: new FormControl(stockData.dayNumber),
            isFullStockTake: new FormControl(stockData.isFullStockTake),
            stockTakeLocked: new FormControl(stockData.stockTakeLocked),
            id: new FormControl(stockData.id),
            parentStockTake: new FormControl(stockData.parentStockTake),
            shortDate: new FormControl(stockData.shortDate),
            stockTakeTime: new FormControl(stockData.stockTakeTime),
            stockTakerName: new FormControl(stockData.stockTakerName),
            timeStampid: new FormControl(stockData.timeStampid),
            userid: new FormControl(stockData.userid),
            username: new FormControl(stockData.username),
            weekNumber: new FormControl(stockData.weekNumber),
            year: new FormControl(stockData.year),
            containers: this.createFactoryAreas(stockData.containers)
        })
        return stockFormGroup
    }

    private createFactoryAreas(stockData: IProductionStockByFactoryArea[]): FormArray<IProductionStockByFactoryArea>{
        const formArray: FormArray<IProductionStockByFactoryArea> = new FormArray<IProductionStockByFactoryArea>([])
        for (let index = 0; index < stockData.length; index++) {
            const element = stockData[index];
            const stockGroup: FormGroup<IProductionStockByFactoryArea> = new FormGroup<IProductionStockByFactoryArea>({
                factoryAreaName: new FormControl(element.factoryAreaName),
                factoryAreaProducts: this.createFactoryAreaProductsArray(element.factoryAreaProducts),
                factoryAreaRanking: new FormControl(element.factoryAreaRanking),
            })
            formArray.push(stockGroup)
        }
        return formArray
    }

    private createFactoryAreaProductsArray(factoryAreaProducts: IContainerWithStockTakeAmount[]): FormArray<IContainerWithStockTakeAmount> {
        const areaProducts = new FormArray<IContainerWithStockTakeAmount>([])
        for (let index = 0; index < factoryAreaProducts.length; index++) {

            const element = factoryAreaProducts[index];
            this.showBatches = element.showBatches

            const areaProduct: FormGroup<IContainerWithStockTakeAmount> = new FormGroup<IContainerWithStockTakeAmount>({
                batchGroupid: new FormControl(element.batchGroupid),
                batchName: new FormControl(element.batchName),
                batchRanking: new FormControl(element.batchRanking),
                brand: new FormControl(element.brand),
                containerName: new FormControl(element.containerName),
                containerNameid: new FormControl(element.containerNameid),
                containerRanking: new FormControl(element.containerRanking),
                factoryAreaName: new FormControl(element.factoryAreaName),
                factoryAreaProductRanking: new FormControl(element.factoryAreaProductRanking),
                factoryAreaRanking: new FormControl(element.factoryAreaRanking),
                packageWeight: new FormControl(element.packageWeight),
                packaging: new FormControl(element.packaging),
                proddescription: new FormControl(element.proddescription),
                productMRid: new FormControl(element.productMRid),
                productid: new FormControl(element.productid),
                productonhold: new FormControl(element.productonhold),
                productContainerWeight: new FormControl(element.productContainerWeight),
                productRankingInBatch: new FormControl(element.productRankingInBatch),
                unitWeight: new FormControl(element.unitWeight),
                showBatches: new FormControl(element.showBatches),
                stockTakeAmount: this.createBatches(element.stockTakeAmount),
                containerid: new FormControl(element.containerid),
                fullStockTake: new FormControl(element.fullStockTake),
                stockTakeWeight: new FormControl(element.stockTakeWeight),
            })
            areaProducts.push(areaProduct)
        }
        return areaProducts
    }

    private getCurrentDaysBatch(): IBatchInfo {
        if (this.todaysBatch) {
            return this.todaysBatch
        }
        else {
            this.todaysBatch = this.createBatchData$Service.todaysBatchValue
            return this.todaysBatch
        }
    }

    createSingleBatch(batch: IStockTakeAmountPerBatch): FormGroup<IStockTakeAmountPerBatch> {
        const formBatch: FormGroup<IStockTakeAmountPerBatch> = new FormGroup<IStockTakeAmountPerBatch>({
            amount: new FormControl(batch.amount),
            dayNumber: new FormControl(batch.dayNumber),
            weekNumber: new FormControl(batch.weekNumber),
            id: new FormControl(batch.id),
            amountString: new FormControl(batch.amountString),
            year: new FormControl(batch.year),
        })
        return formBatch
    }

    createBatches(stockBatches: IStockTakeAmountPerBatch[]): FormArray<IStockTakeAmountPerBatch> {

        const todaysBatch: IBatchInfo =  this.getCurrentDaysBatch()

        // What we want to do is to add todays batch to stocktake data to make sure that todays batch is always an option.
            // If there are no other data we can just add the batch, if there are other data, then we have to check if the batch does not already exist
                // If it does exist, then do nothing, else add it


        const thereAreNoStocktakeBatches = () => { // Checks if there are other stocktake batches
            return stockBatches === null
        }

        const weMustShowBatches = () => {
            return this.showBatches
        }

        const insertTodaysBatchData = () => {
            if (this.isStockTakeLocked) { // Is the stock being entered (values should be null), or is an old stocktake just being viewed (value should be 0)
                stockBatches.push(Object.assign({amount:0, amountString: '0'}, todaysBatch))
            } else {
                stockBatches.push(Object.assign({amount: null, amountString: null}, todaysBatch))
            }
        }

        const todaysBatchIsNotOneOfTheBatches = () => { // Check if todays batch is in the list of othe batches that the productContainer has
            for (let index = 0; index < stockBatches.length; index++) {
                const element: IStockTakeAmountPerBatch = stockBatches[index];
                if (element.id === todaysBatch.id) {
                    return false
                }
            }
            return true
        }

        const checkIfTodaysBatchIsAvailableElseAddIt = () => {
            if (thereAreNoStocktakeBatches()) {
                stockBatches = []
                insertTodaysBatchData()
            } else {
                if (todaysBatchIsNotOneOfTheBatches() && !this.isStockTakeLocked && weMustShowBatches()) {
                    insertTodaysBatchData()
                }
            }
        }

        checkIfTodaysBatchIsAvailableElseAddIt()

        const batches = new FormArray<IStockTakeAmountPerBatch>([])
        for (let index = 0; index < stockBatches.length; index++) {
            const element = stockBatches[index];
            batches.push(this.createSingleBatch(element))
        }
        return batches

    }

}
