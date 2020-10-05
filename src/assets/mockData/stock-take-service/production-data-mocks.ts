import * as Factory from "factory.ts";
import * as faker from "faker";

import { IProductionStockByFactoryArea, IProductionStock } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';

const createStringList = (strFunc: Function): string[] => {
    const stringList: string[] = []
    for (let index = 0; index < faker.random.number({ min: 1, max: 15 }); index++) {
        stringList.push(strFunc())
    }
    return stringList
}

export const ProductionStockList_GroupsMockFunc = (): IProductionStock[] => {

    const batchGroupList: string[] = createStringList(faker.address.city)
    const factoryAreaList: string[] = createStringList(faker.address.streetName)

    const ProductionStockMock2 = Factory.Sync.makeFactory<IProductionStock>({

        factoryAreaProductRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        batchGroup: Factory.each(i => faker.random.arrayElement(batchGroupList)),
        factoryAreaName: Factory.each(i => faker.random.arrayElement(factoryAreaList)),
        productid: Factory.each(i => faker.random.number({ min: 1, max: 1000 })),
        productMRid: Factory.each(i => faker.internet.password(Math.floor((Math.random() * 20) + 1), false, /[0-9A-Za-z]/)),
        proddescription: Factory.each(i => faker.commerce.productDescription()),
        batchRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        brand: Factory.each(i => faker.company.companyName()),
        packageWeight: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        packaging: Factory.each(i => faker.lorem.word()),
        productonhold: Factory.each(i => faker.random.boolean()),
        rankingInGroup: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        unitWeight: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
        factoryAreaRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),

    });

    const list: IProductionStock[] = []
    const num = faker.random.number({ min: 1, max: 60 })
    for (let index = 0; index < num; index++) {
        list.push(ProductionStockMock2.build())
    }

    return list
}


export const ProductionStockMock = Factory.Sync.makeFactory<IProductionStock>({

    productid: Factory.each(i => faker.random.number({ min: 1, max: 1000 })),
    productMRid: Factory.each(i => faker.internet.password(Math.floor((Math.random() * 20) + 1), false, /[0-9A-Za-z]/)),
    proddescription: Factory.each(i => faker.commerce.productDescription()),
    batchRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
    batchGroup: Factory.each(i => faker.address.city()),
    brand: Factory.each(i => faker.company.companyName()),
    packageWeight: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
    packaging: Factory.each(i => faker.lorem.word()),
    productonhold: Factory.each(i => faker.random.boolean()),
    rankingInGroup: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
    unitWeight: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
    factoryAreaName: Factory.each(i => faker.address.streetName()),
    factoryAreaRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),
    factoryAreaProductRanking: Factory.each(i => faker.random.number({ min: 1, max: 100 })),

});


const groupProductionStockByFactoryArea = (productionStock: IProductionStock[]): IProductionStockByFactoryArea[] => {
    const toolbox: ToolboxGroupService = new ToolboxGroupService
    const groupData: { key: string, values: IProductionStock[] }[] = toolbox.groupByArray(productionStock, 'factoryAreaName');
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
    
    const productionStockList: IProductionStock[] = ProductionStockList_GroupsMockFunc();
    const prductionStockByFactoryAreaData: IProductionStockByFactoryArea[] = groupProductionStockByFactoryArea(productionStockList)
    // console.log('Groups: ', prductionStockByFactoryAreaData)
    return prductionStockByFactoryAreaData;
}