import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@ng-stack/forms';
import { IContainerInfoHash } from 'projects/production-service/src/lib/#shared-services/production.interface';
import { IContainerWithStockTakeAmount, IProductionContainer, IStockTakeAmountPerBatch } from '../../#shared-services/production-stock.interface';
import { ITotalStockGroupedByBatches, ITotalStockGroupedByProducts } from '../../#shared-services/total-stock.interface';

@Injectable({
    providedIn: 'root'
})
export class TotalStockFormService {

    private totalStockForm: FormArray<ITotalStockGroupedByBatches>
    private containersHash: IContainerInfoHash

    constructor() { }

    createTotalStockFormAPI(totalStockBatchGroupData: ITotalStockGroupedByBatches[], containersHash: IContainerInfoHash): FormArray<ITotalStockGroupedByBatches> {

        if (!totalStockBatchGroupData || !containersHash) return null

        this.containersHash = containersHash
        this.createTotalStockForm(totalStockBatchGroupData, containersHash)
        return this.totalStockForm
    }

    private createTotalStockForm(totalStockBatchGroupData: ITotalStockGroupedByBatches[], containersHash: IContainerInfoHash) {

        this.totalStockForm = new FormArray<ITotalStockGroupedByBatches>([])

        for (let index = 0; index < totalStockBatchGroupData.length; index++) {
            const element = totalStockBatchGroupData[index];
            const batch = new FormGroup<ITotalStockGroupedByBatches>({
                batchName: new FormControl(element.batchName),
                batchRanking: new FormControl(element.batchRanking),
                batchid: new FormControl(element.batchid),
                productData: this.createProductData(element.productData),
            })
            this.totalStockForm.push(batch)
        }
    }

    private createProductData(productData: ITotalStockGroupedByProducts[]): FormArray<ITotalStockGroupedByProducts> {

        const productDataForm: FormArray<ITotalStockGroupedByProducts> = new FormArray<ITotalStockGroupedByProducts>([])

        for (let index = 0; index < productData.length; index++) {
            const element = productData[index];
            const prodData = new FormGroup<ITotalStockGroupedByProducts>({
                productMRid: new FormControl(element.productMRid),
                productRanking: new FormControl(element.productRanking),
                productid: new FormControl(element.productid),
                productContainerData: this.createContainerData(element.productContainerData),
                productWeight: new FormControl(element.productWeight),
            })
            productDataForm.push(prodData)
        }
        return productDataForm
    }

    private createContainerData(containerData: IContainerWithStockTakeAmount[]): FormArray<IContainerWithStockTakeAmount> {

        const containerDataFormArray: FormArray<IContainerWithStockTakeAmount> = new FormArray<IContainerWithStockTakeAmount>([])

        for (let index = 0; index < containerData.length; index++) {

            const element = containerData[index];

            const conData = new FormGroup<IContainerWithStockTakeAmount>({
                batchGroupid: new FormControl(element.batchGroupid),
                batchName: new FormControl(element.batchName),
                batchRanking: new FormControl(element.batchRanking),
                brand: new FormControl(element.brand),
                containerName: new FormControl(element.containerName),
                containerNameid: new FormControl(element.containerNameid),
                containerRanking: new FormControl(element.containerRanking),
                containerid: new FormControl(element.containerid),
                factoryAreaName: new FormControl(element.factoryAreaName),
                factoryAreaProductRanking: new FormControl(element.factoryAreaProductRanking),
                factoryAreaRanking: new FormControl(element.factoryAreaRanking),
                fullStockTake: new FormControl(element.fullStockTake),
                packageWeight: new FormControl(element.packageWeight), 
                packaging: new FormControl(element.packaging),
                proddescription: new FormControl(element.proddescription),
                productMRid: new FormControl(element.productMRid),
                productRankingInBatch: new FormControl(element.productRankingInBatch),
                productContainerWeight: new FormControl(element.productContainerWeight),
                productid: new FormControl(element.productid),
                productonhold: new FormControl(element.productonhold),
                showBatches: new FormControl(element.showBatches),
                unitWeight: new FormControl(element.unitWeight),
                stockTakeAmount: this.createStockAmountData(element.stockTakeAmount),
                stockTakeWeight: new FormControl(element.stockTakeWeight),
            })

            containerDataFormArray.push(conData)

        }
        return containerDataFormArray
    }

    
    private createStockAmountData(stockAmountData: IStockTakeAmountPerBatch[]): FormArray<IStockTakeAmountPerBatch> {

        if (stockAmountData === null) {
            return new FormArray<IStockTakeAmountPerBatch>([])
        }



        const stockAmountDataForm: FormArray<IStockTakeAmountPerBatch> = new FormArray<IStockTakeAmountPerBatch>([])

        for (let index = 0; index < stockAmountData.length; index++) {
            const element = stockAmountData[index];
            const stockData = new FormGroup<IStockTakeAmountPerBatch>({
                id: new FormControl(element.id),
                amount: new FormControl(element.amount),
                amountString: new FormControl(element.amountString),
                dayNumber: new FormControl(element.dayNumber),
                weekNumber: new FormControl(element.weekNumber),
                year: new FormControl(element.year),
            })
            // console.log('* Stocktake data is not null *', stockData)
            stockAmountDataForm.push(stockData)
        }
        return stockAmountDataForm
    }

}
