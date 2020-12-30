import { Injectable } from '@angular/core';
import { IContainerInfo } from 'projects/production-service/src/lib/#shared-services/production.interface';
import { Observable, of } from 'rxjs';
import { totalStockContainerAmounts_MockFunction, containerDetailList_mockFunction } from 'src/assets/mockData/stock-take-service/total-stock-data.mocks';
import { IStockTakeAmountHash } from '../../#shared-services/production-stock.interface';

@Injectable({
    providedIn: 'root'
})
export class TotalStockGraphqlApiService {

    constructor() { }

    getTotalStockTakeAmountsMock(): Observable<IStockTakeAmountHash> {
        return of(totalStockContainerAmounts_MockFunction())
    }

    getContainersMock(): Observable<IContainerInfo[]> {
        return of(containerDetailList_mockFunction())
    }

}
