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
    private stockTakeLocked: boolean

    createMainStockFormGroup(stockData: IStockTake): FormGroup<IStockTake> {

        if (!stockData) return null
        
        this.stockTakeLocked = stockData.stockTakeLocked
        this.todaysBatch = null // Make sure we reset for incase the days change, then we do not want to previous days data still
        this.mainStockForm = this.createMainStockForm(stockData)
        if (stockData.stockTakeLocked) {
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
            const areaProduct: FormGroup<IContainerWithStockTakeAmount> = new FormGroup<IContainerWithStockTakeAmount>({
                batchGroupid: new FormControl(element.batchGroupid),
                batchName: new FormControl(element.batchName),
                batchRanking: new FormControl(element.batchRanking),
                brand: new FormControl(element.brand),
                containerName: new FormControl(element.containerName),
                factoryAreaName: new FormControl(element.factoryAreaName),
                factoryAreaProductRanking: new FormControl(element.factoryAreaProductRanking),
                factoryAreaRanking: new FormControl(element.factoryAreaRanking),
                packageWeight: new FormControl(element.packageWeight),
                packaging: new FormControl(element.packaging),
                proddescription: new FormControl(element.proddescription),
                productMRid: new FormControl(element.productMRid),
                productid: new FormControl(element.productid),
                productonhold: new FormControl(element.productonhold),
                productRankingInBatch: new FormControl(element.productRankingInBatch),
                unitWeight: new FormControl(element.unitWeight),
                showBatches: new FormControl(element.showBatches),
                stockTakeAmount: this.createBatchesThatHasIncomingAmountsData(element.stockTakeAmount),
                containerid: new FormControl(element.containerid),
                fullStockTake: new FormControl(element.fullStockTake),
            })
            areaProducts.push(areaProduct)
        }
        return areaProducts
    }

    private getCurrentDaysBatch(): IBatchInfo[] {
        // Maybe we should rather get this info from the stockTakeInstance, so that the batch is always the same as the instance, cause what if we pick the previous days instance, then we will give the previous days instance todays batches
        if (this.todaysBatch) {
            return [this.todaysBatch]
        }
        else {
            this.todaysBatch = this.createBatchData$Service.todaysBatchValue
            return [this.todaysBatch]
        }
    }

    createBatchesWithoutIncomingAmountsData(stockBatches: IBatchInfo[]): FormArray<IStockTakeAmountPerBatch> {

        if (!stockBatches) {
            stockBatches =  this.getCurrentDaysBatch()
        }

        const batches = new FormArray<IStockTakeAmountPerBatch>([])
        const mnt: string = '0'
        for (let index = 0; index < stockBatches.length; index++) {
            const element = stockBatches[index];
            const batch: FormGroup<IStockTakeAmountPerBatch> = new FormGroup<IStockTakeAmountPerBatch>({
                amount: new FormControl(null),
                dayNumber: new FormControl(element.dayNumber),
                weekNumber: new FormControl(element.weekNumber),
                id: new FormControl(element.id),
                amountString: this.stockTakeLocked ? new FormControl(mnt) : new FormControl(null),
                year: new FormControl(element.year),
            })
            batches.push(batch)
        }
        return batches
    }

    createBatchesThatHasIncomingAmountsData(stockBatches: IStockTakeAmountPerBatch[]): FormArray<IStockTakeAmountPerBatch> {
        if (!stockBatches) {
            return this.createBatchesWithoutIncomingAmountsData(this.getCurrentDaysBatch())
        }

        const batches = new FormArray<IStockTakeAmountPerBatch>([])
        for (let index = 0; index < stockBatches.length; index++) {
            const element = stockBatches[index];
            const batch: FormGroup<IStockTakeAmountPerBatch> = new FormGroup<IStockTakeAmountPerBatch>({
                amount: new FormControl(element.amount),
                dayNumber: new FormControl(element.dayNumber),
                weekNumber: new FormControl(element.weekNumber),
                id: new FormControl(element.id),
                amountString: new FormControl(element.amountString),
                year: new FormControl(element.year),
            })
            batches.push(batch)
        }
        return batches
    }

}
