export class IStockTakeInstanceBackend {
    id: number
    timeStampid: number
    userid: number
    stockTakerName: string
    isFullStockTake: boolean
    parentStockTake: number
}

export class IStockBatchBackend {
    batchid: number
    amountString: string
}

export class IStockTakeContainerBackend {
    containerid: number
    amountString: string
    batches: IStockBatchBackend[]
}

export class IStockTakeBackend {
    stockTakeInstance: IStockTakeInstanceBackend
    containers: IStockTakeContainerBackend[]
}
