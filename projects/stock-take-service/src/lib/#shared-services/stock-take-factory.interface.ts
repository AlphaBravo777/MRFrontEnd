import { IContainerWithStockTakeAmount, IProductionStockByFactoryArea, IStockTake, IStockTakeAmountPerBatch, IStockTakeInstance } from './production-stock.interface'
import { IStockTakeBackend, IStockBatchBackend, IStockTakeInstanceBackend, IStockTakeContainerBackend } from './stock-take-backend.interface'

export function factory_stockTakeInstance_FrontendToBackend(stockTakeForm: IStockTake | IStockTakeInstance): IStockTakeInstanceBackend {
    return {
        id: stockTakeForm.id,
        timeStampid: stockTakeForm.timeStampid,
        stockTakerName: stockTakeForm.stockTakerName,
        userid: stockTakeForm.userid,
        isFullStockTake: stockTakeForm.isFullStockTake,
        stockTakeLocked: stockTakeForm.stockTakeLocked,
        parentStockTake: stockTakeForm.parentStockTake,
    }
}

export function factory_stockTakeInstance_BackendToFrontend(backendData: IStockTakeInstanceBackend): IStockTakeInstance {
    return {
        id: backendData.id,
        timeStampid: backendData.timeStampid,
        stockTakerName: backendData.stockTakerName,
        userid: backendData.userid,
        isFullStockTake: backendData.isFullStockTake,
        stockTakeLocked: backendData.stockTakeLocked,
        parentStockTake: backendData.parentStockTake,
        username: null,
        ID: null,
        dayNumber: null,
        shortDate: null,
        stockTakeTime: null,
        weekNumber: null,
        year: null,
    }
}

function factory_createStockTakeBatchesData(stockBatches: IStockTakeAmountPerBatch[]): IStockBatchBackend[] {
    const batchesArray: IStockBatchBackend[] = []
    stockBatches.forEach(batch => {
        const backendBatch: IStockBatchBackend = {
            amountString: batch.amountString,
            batchid: batch.id
        }
        batchesArray.push(backendBatch)
    })
    return batchesArray
}

function factory_createStockTakeContainerData(containerData: IContainerWithStockTakeAmount[]): IStockTakeContainerBackend[] {
    const containerArray: IStockTakeContainerBackend[] = []
    containerData.forEach(container => {
            const backEndContainer: IStockTakeContainerBackend = {
                containerid: container.containerid,
                batches: factory_createStockTakeBatchesData(container.stockTakeAmount),
                amountString: null
            }
            containerArray.push(backEndContainer)
    })
    return containerArray
}


export function factory_stocktakeFrontEndToBackend(stockTakeForm: IStockTake, containerData: IContainerWithStockTakeAmount[]): IStockTakeBackend  {
    return {
        stockTakeInstance: factory_stockTakeInstance_FrontendToBackend(stockTakeForm),
        containers: factory_createStockTakeContainerData(containerData)
    };
}

export function factory_createStockTake_fromInstanceAndContainers(stockTakeInstance: IStockTakeInstance, containers: IProductionStockByFactoryArea[]): IStockTake  {
    return {
        ID: stockTakeInstance.ID,
        dayNumber: stockTakeInstance.dayNumber,
        isFullStockTake: stockTakeInstance.isFullStockTake,
        stockTakeLocked: stockTakeInstance.stockTakeLocked,
        id: stockTakeInstance.id,
        parentStockTake: stockTakeInstance.parentStockTake,
        shortDate: stockTakeInstance.shortDate,
        stockTakeTime: stockTakeInstance.stockTakeTime,
        stockTakerName: stockTakeInstance.stockTakerName,
        timeStampid: stockTakeInstance.timeStampid,
        userid: stockTakeInstance.userid,
        weekNumber: stockTakeInstance.weekNumber,
        year: stockTakeInstance.year,
        containers: containers,
        username: stockTakeInstance.username
    };
}
