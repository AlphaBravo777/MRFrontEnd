import * as Factory from "factory.ts";
import * as faker from "faker";
import { IBatchGroupFrontEnd } from 'projects/product-service/src/lib/insert-batch-group/1#insert-batch-group-services/batch-group-interface';

import { IProductionStockByFactoryArea, IContainerWithStockTakeAmount, IStockTakeAmountPerBatch, IStockTakeInstance } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';

export const createSingleBatch = (): IStockTakeAmountPerBatch => {
    return {
        id: 1,
        amount: Math.floor((Math.random() * 200) + 1),
        amountString: null,
        dayNumber: Math.floor((Math.random() * 6) + 1),
        weekNumber: Math.floor((Math.random() * 52) + 1),
        year: 2020,
    }
}

export const createBatchArray = (): IStockTakeAmountPerBatch[] => {
    const batchArray: IStockTakeAmountPerBatch[] = []
    const num = Math.floor((Math.random() * 6) + 1)
    for (let index = 0; index < num; index++) {
        batchArray.push(createSingleBatch())
    }
    return batchArray
}

export const stockTakeInstance_mockFunc = (): IStockTakeInstance => {
    const stockTakeInstance = Factory.Sync.makeFactory<IStockTakeInstance>({
        id: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        timeStampid: Factory.each(i => faker.random.number({ min: 1, max: 2000 })),
        isFullStockTake: Factory.each(i => faker.random.boolean()),
        stockTakeLocked: Factory.each(i => faker.random.boolean()),
        ID: Factory.each(i => faker.company.companyName()),
        dayNumber: Factory.each(i => faker.random.number({ min: 1, max: 7 })),
        shortDate: Factory.each(i => faker.company.companyName()),
        stockTakeTime: Factory.each(i => faker.company.companyName()),
        weekNumber: Factory.each(i => faker.random.number({ min: 1, max: 52 })),
        year: Factory.each(i => faker.random.number({ min: 1990, max: 2025 })),
        parentStockTake: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        stockTakerName: Factory.each(i => faker.company.companyName()),
        userid: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        username: Factory.each(i => faker.random.firstName())
    })
    return stockTakeInstance.build()
}

export const containerList_mock = (): string[] => {
    return ['Box', 'Bag', 'PnP half-lug', 'PnP shallow-lug', 'Red crate', 'Blue crate', 'Vacuum', 'Trolley', 'Buggie']
}

export const ProductionStockList_GroupsMockFunc = (): IContainerWithStockTakeAmount[] => {

    // const batchGroupList: string[] = createStringList(faker.address.city)
    // const factoryAreaList: string[] = createStringList(faker.address.streetName)
    const containerNameIDs = [2,15,48,61,45,68,23,6,98]
    const batchGroupList: string[] = ['Smoke Vienna', 'Russian', 'Red Vienna', 'Smokies', 'OBC SV', 'PnP CCV', 'PnP CV', 'Beef Grillers', 'Smoke Grillers', 'Chilly Grillers', 'Hampers', 'Combos', 'Chicken Vienna', 'French Polony', 'Chicken Polony']
    const factoryAreaList: string[] = ['L-Shape front', 'L-Shape middle', 'L-Shape back', 'L-Shape PnP', 'Polony Pulldowns', 'Pulldown - Hot', 'Pulldown - Cold', 'Buggies', 'Polony Boxes']
    // const containerList: string[] = ['box', 'bag', 'pnp half-lug', 'pnp shallow-lug', 'red crate', 'blue crate', 'vacuum', 'trolley', 'buggie']
    const productMRidList: string[] = ['SV1', 'SV500', 'SV2', 'SVV2', 'SV5','RV1', 'RV500', 'RV2', 'RVV2', 'RV5','SS1', 'SS500', 'SS2', 'SSV2', 'SS5','ER1', 'ER500', 'ER2', 'ERV2', 'ER5', 'FP1', 'FP500', 'FP2', 'FPV2', 'FP5']

    const ProductionStockMock2 = Factory.Sync.makeFactory<IContainerWithStockTakeAmount>({
        factoryAreaProductRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        containerRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        batchName: Factory.each(i => faker.random.arrayElement(batchGroupList)),
        batchGroupid: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        factoryAreaName: Factory.each(i => faker.random.arrayElement(factoryAreaList)),
        productid: Factory.each(i => faker.random.number({ min: 1, max: 1000 })),
        productContainerWeight: Factory.each(i => faker.random.number({ min: 1, max: 1000 })),
        productMRid: Factory.each(i => faker.random.arrayElement(productMRidList)),
        // productMRid: Factory.each(i => faker.internet.password(Math.floor((Math.random() * 10) + 1), false, /[0-9A-Za-z]/)),
        proddescription: Factory.each(i => faker.lorem.words(faker.random.number({ min: 1, max: 10 }))),
        batchRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        brand: Factory.each(i => faker.company.companyName()),
        packageWeight: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        packaging: Factory.each(i => faker.lorem.word()),
        productonhold: Factory.each(i => faker.random.boolean()),
        productRankingInBatch: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        unitWeight: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        factoryAreaRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        containerName: Factory.each(i => faker.random.arrayElement(containerList_mock())),
        showBatches: Factory.each(i => faker.random.arrayElement([false, true, false, false, false])),
        stockTakeAmount: null,
        fullStockTake: Factory.each(i => faker.random.boolean()),
        containerid: Factory.each(i => faker.random.number({ min: 1, max: 1000 })),
        containerNameid: Factory.each(i => faker.random.arrayElement(containerNameIDs)),
        stockTakeWeight: null
    });

    const buildRecord = () => {
        const record = ProductionStockMock2.build()
        if (record.showBatches) {
            record.stockTakeAmount = createBatchArray()
        } else {
            record.stockTakeAmount = [createSingleBatch()]
        }
        return record
    }

    const list: IContainerWithStockTakeAmount[] = []
    const num = faker.random.number({ min: 1, max: 60 })
    for (let index = 0; index < 200; index++) {
        list.push(buildRecord())
    }

    return list
}


// export const ProductionStockMock = Factory.Sync.makeFactory<IContainerWithStockTakeAmount>({

//     productid: Factory.each(i => faker.random.number({ min: 1, max: 1000 })),
//     productMRid: Factory.each(i => faker.internet.password(Math.floor((Math.random() * 20) + 1), false, /[0-9A-Za-z]/)),
//     proddescription: Factory.each(i => faker.commerce.productDescription()),
//     containerRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
//     batchRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
//     batchGroupid: Factory.each(i => faker.random.number({ min: 1, max: 1000 })),
//     batchName: Factory.each(i => faker.company.companyName()),
//     brand: Factory.each(i => faker.company.companyName()),
//     packageWeight: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
//     packaging: Factory.each(i => faker.lorem.word()),
//     productonhold: Factory.each(i => faker.random.boolean()),
//     productRankingInBatch: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
//     unitWeight: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
//     factoryAreaName: Factory.each(i => faker.address.streetName()),
//     factoryAreaRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
//     factoryAreaProductRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
//     containerName: Factory.each(i => faker.lorem.word()),
//     showBatches: Factory.each(i => faker.random.arrayElement([false, true, false, false, false])),
//     stockTakeAmount: createBatchArray(),
//     // amountString: Factory.each(i => faker.random.number({ min: 1, max: 100 }).toString() + '+' + faker.random.number({ min: 1, max: 100 }).toString() + '+' + faker.random.number({ min: 1, max: 100 }).toString()),
//     fullStockTake: Factory.each(i => faker.random.boolean()),
//     containerid: Factory.each(i => faker.random.number({ min: 1, max: 1000 })),
//     containerNameid: Factory.each(i => faker.random.arrayElement(containerNameIDs)),
//     stockTakeWeight: null
// });


const groupProductionStockByFactoryArea = (productionStock: IContainerWithStockTakeAmount[]): IProductionStockByFactoryArea[] => {
    const toolbox: ToolboxGroupService = new ToolboxGroupService
    const groupData: { key: string, values: IContainerWithStockTakeAmount[] }[] = toolbox.groupByArray(productionStock, 'factoryAreaName');
    const productionStockByFactoryAreaData: IProductionStockByFactoryArea[] = []
    groupData.forEach(element => {
        productionStockByFactoryAreaData.push({
            factoryAreaName: element.key,
            factoryAreaProducts: element.values,
            factoryAreaRanking: element.values[0].factoryAreaRanking
        })
    });
    toolbox.sorting(productionStockByFactoryAreaData, 'factoryAreaRanking')
    productionStockByFactoryAreaData.forEach(element => toolbox.sorting(element.factoryAreaProducts, 'factoryAreaProductRanking'))
    return productionStockByFactoryAreaData
}

export const ProductionStockByFactoryArea_MockFunction = (): IProductionStockByFactoryArea[] => {
    
    const productionStockList: IContainerWithStockTakeAmount[] = ProductionStockList_GroupsMockFunc();
    const prductionStockByFactoryAreaData: IProductionStockByFactoryArea[] = groupProductionStockByFactoryArea(productionStockList)
    // console.log('Groups: ', prductionStockByFactoryAreaData)
    return prductionStockByFactoryAreaData;
}