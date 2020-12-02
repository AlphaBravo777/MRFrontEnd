import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { IStockTakeInstance } from '../../#shared-services/production-stock.interface';
import { factory_stockTakeInstance_FrontendToBackend } from '../../#shared-services/stock-take-factory.interface';
import { StockCreateData$Service } from './stock-create-data$.service';
import { StockCreateGraphqlApiService } from './stock-create-graphql-api.service';
import { StockCreateRestApiService } from './stock-create-rest-api.service';

@Injectable({
    providedIn: 'root'
})
export class StockCreateService {

    constructor(
        private stockCreateGraphqlApiService: StockCreateGraphqlApiService,
        private stockCreateRestApiService: StockCreateRestApiService,
        private stockCreateData$Service: StockCreateData$Service
    ) { }

    getLastFewStockTakes(): Observable<IStockTakeInstance[]> {
        return this.getStockInstancesAndAddToDataServices().pipe(
            concatMap(() => this.stockCreateData$Service.currentStockInstancesList$)
        )
    }

    getStockInstancesAndAddToDataServices(): Observable<IStockTakeInstance[]> {
        return this.stockCreateGraphqlApiService.getLastFewStockTakes(10).pipe(
            tap(stockInstances => this.stockCreateData$Service.setStockInstancesList(stockInstances.reverse()))
        )
    }

    insertNewStockTakeInstance(stockInstance: IStockTakeInstance): Observable<IStockTakeInstance> {
        return this.stockCreateRestApiService.insertStockTakeInstance(factory_stockTakeInstance_FrontendToBackend(stockInstance)).pipe(
            tap(data => console.log('Insert stocktaked instance: ', data)),
            tap(data => stockInstance.id = data.id),
            map(() => stockInstance),
            tap(() => this.stockCreateData$Service.addStockInstanceToList(stockInstance))
        )
    }
}
