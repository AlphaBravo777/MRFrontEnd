import { Injectable } from '@angular/core';
import { IStockTakeContainerHash } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductionGraphqlApiService } from './production-graphql-api.service';

@Injectable({
    providedIn: 'root'
})
export class ProductionService {

    constructor(
        private productionGraphqlApiService: ProductionGraphqlApiService
    ) { }

    getContainersFromLocalStorageOrDatabase(): Observable<IStockTakeContainerHash> {
        const stockTakeContainers: IStockTakeContainerHash = JSON.parse(localStorage.getItem('stockTakeContainers'))
        if (stockTakeContainers) {
            return of(stockTakeContainers)
        } else {
            return this.productionGraphqlApiService.getContainersData().pipe(
                tap(containerData => localStorage.setItem('stockTakeContainers', JSON.stringify(containerData)))
            )
        }
    }
}
