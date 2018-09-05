import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StockAPIService } from '../../../features/stock/stock-services/stock-api.service';

@Injectable({
    providedIn: 'root'
})
export class ProcessedStockData$Service {

    private processedStock = new BehaviorSubject<any>([]);
    currentProcessedStock$ = this.processedStock.asObservable();

    constructor(private processedStockApi: StockAPIService) {
        this.getDBProcessedStock();

     }

    getDBProcessedStock(): void {
        this.processedStockApi.getTimedStock('12:00').subscribe(data => {
            this.processedStock.next(data);
        });
    }

    changeStock() {
        this.processedStock.next([{name: 'Lets try this again'}, {name: 'And Again'}]);
    }

}
