import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductionStockList_GroupsMockFunc } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IProductionStock } from '../../#shared-services/production-stock.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductStockGraphqlApiService {

    constructor() { }

    getAllProducts(): Observable<IProductionStock[]> {
        return of(ProductionStockList_GroupsMockFunc());
    }
}
