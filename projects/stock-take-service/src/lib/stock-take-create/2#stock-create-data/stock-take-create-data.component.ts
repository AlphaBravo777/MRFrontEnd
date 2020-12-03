import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { IStockTakeInstance } from '../../#shared-services/production-stock.interface';
import { StockCreateService } from '../1#stock-create-services/stock-create.service';

@Component({
    selector: 'stock-stock-take-create-data',
    templateUrl: './stock-take-create-data.component.html',
    styleUrls: ['./stock-take-create-data.component.scss']
})
export class StockTakeCreateDataComponent implements OnInit {

    stockTakeInstances: IStockTakeInstance[]

    constructor(
        private stockTakeCreateService: StockCreateService
    ) { }

    ngOnInit(): void {
        this.getStockTakes()
    }

    getStockTakes() {
        this.stockTakeCreateService.getLastFewStockTakes().pipe(
            take(1),
            tap(instances => this.stockTakeInstances = instances)
        ).subscribe()
    }

}
