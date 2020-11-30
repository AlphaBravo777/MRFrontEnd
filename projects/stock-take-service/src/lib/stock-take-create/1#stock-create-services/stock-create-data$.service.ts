import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStockTakeInstance } from '../../#shared-services/production-stock.interface';

@Injectable({
    providedIn: 'root'
})
export class StockCreateData$Service {

    private stockInstance = new BehaviorSubject<IStockTakeInstance>(null);
    currentStockInstance$ = this.stockInstance.asObservable();
    private stockInstancesList = new BehaviorSubject<IStockTakeInstance[]>(null);
    currentStockInstancesList$ = this.stockInstancesList.asObservable();

    constructor() { }
    
    public get stockInstanceValue() {
      return this.stockInstance.value;
    }

    public get stockInstancesListValue() {
      return this.stockInstancesList.value;
    }
    
    setStockInstance(stockInstance: IStockTakeInstance) {
        this.stockInstance.next(stockInstance)
    }
    
    setStockInstancesList(stockInstances: IStockTakeInstance[]) {
        this.stockInstancesList.next(stockInstances)
    }

    addStockInstanceToList(stockInstance: IStockTakeInstance) {
        const currentList: IStockTakeInstance[] = this.stockInstancesListValue
        currentList.unshift(stockInstance)
        this.setStockInstancesList(currentList)
    }

}
