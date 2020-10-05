import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { IProductionStockByFactoryArea, IProductionStock } from '../../#shared-services/production-stock.interface';
import { ProductStockGraphqlApiService } from './product-stock-graphql-api.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductionStockService {

    constructor(private toolbox: ToolboxGroupService, private productStockGraphqlApiService: ProductStockGraphqlApiService) { }

    getAllProducts(): Observable<IProductionStockByFactoryArea[]> {
        return this.productStockGraphqlApiService.getAllProducts().pipe(
            map(productionStock => this.groupProductionStockByFactoryArea(productionStock))
        )
    }

    groupProductionStockByFactoryArea(productionStock: IProductionStock[]): IProductionStockByFactoryArea[] {
        const groupData: {key: string, values: IProductionStock[]}[] = this.toolbox.groupByArray(productionStock, 'factoryAreaName');
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

}
