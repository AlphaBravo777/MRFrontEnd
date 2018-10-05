import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HighRiskPackinglistApiService } from './high-risk-packinglist-api.service';
import { IPackingListStock } from './high-risk-interfaces';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class HighRiskData$Service {

    private processedStock = new BehaviorSubject<IPackingListStock[]>([]);
    currentProcessedStock$ = this.processedStock.asObservable();
    subscription;

    constructor(private processedStockApi: HighRiskPackinglistApiService) {
        this.getDBProcessedStock();

     }

    getDBProcessedStock(): void {
        this.processedStockApi.getGraphQLdata().subscribe(data => {
            this.processedStock.next(data);
        });
    }

    // changeStock() {
    //     this.processedStock.next([{name: 'Lets try this again'}, {name: 'And Again'}]);
    // }

}
