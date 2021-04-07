import * as Factory from "factory.ts";
import * as faker from "faker";
import { IContainerInfo } from 'projects/production-service/src/lib/#shared-services/interfaces/production.interface';
import { IContainerWithStockTakeAmount, IStockTakeAmountHash, IStockTakeAmountPerContainer, IStockTakeContainerHash } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { ProductionStockList_GroupsMockFunc, createBatchArray, containerList_mock } from './production-data-mocks';

export const TotalStockInContainers_MockFunction = (): IContainerWithStockTakeAmount[] => {
    const totalStockListAsIfComingFromDatabase: IContainerWithStockTakeAmount[] = ProductionStockList_GroupsMockFunc();
    return totalStockListAsIfComingFromDatabase
}

export const totalStockContainerAmounts_MockFunction = (): IStockTakeAmountHash => {

    const containerAmountHash: IStockTakeAmountHash = {}
    const containerHash: IStockTakeContainerHash = JSON.parse(localStorage.getItem('stockTakeContainers'))

    for (var key in containerHash) {
        if (containerHash.hasOwnProperty(key)) {
            const containerAmount: IStockTakeAmountPerContainer = {
                containerid: parseInt(key, 10),
                stockBatches: createBatchArray()
            }
            containerAmountHash[key] = containerAmount
        }
    }
    console.log('The amount data = ', containerAmountHash)
    return containerAmountHash

}




export const containerDetailList_mockFunction = (): IContainerInfo[] => {
    const containerIDs = [2,15,48,61,45,68,23,6,98]
    const contianerList: IContainerInfo[] = []
    containerList_mock().forEach((element, index) => {
        const containerInfo: IContainerInfo = {
            containerName: element,
            containerRanking: Math.floor((Math.random() * 50) + 1),
            containerid: containerIDs[index],
            containerIndex: null,
            showContainer: false
        }
        contianerList.push(containerInfo)
    });
    return contianerList
}