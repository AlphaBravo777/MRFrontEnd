import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ProcessedStock, ProcessedGroup } from './../../../stock-services/Stock';
import { BehaviorSubject } from 'rxjs';
import { StockTakingService } from '../../../stock-services/stock-taking.service';
import { ProcessedStockService } from '../../../stock-services/processed-stock.service';

@Component({
    selector: 'app-stock-products',
    templateUrl: './stock-products.component.html',
    styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit, OnDestroy {

    constructor(private stockTakingService: StockTakingService, private processedStockService: ProcessedStockService) { }

    private _productNames = new BehaviorSubject<ProcessedStock[]>([]);
    processedGroup: ProcessedGroup[];
    batch: String;
    productName = 'Select a product';
    processedStock = {};
    amounts = [];

    @Input()
    set productNames(value) {
        this._productNames.next(value);
    }
    get productNames() {
        return this._productNames.getValue();
    }

    ngOnInit() {
        this._productNames.subscribe(x => {
            this.processedGroup = this.processedStockService.groupByCategory(this.productNames);
        });
    }

    BatchGroup(batch) {
        this.batch = batch;
        console.log(this.batch);
    }

    changeProduct(productName) {
        const stock =  localStorage.getItem('stock');
        this.processedStock = JSON.parse(stock);
            if (this.processedStock.hasOwnProperty(productName)) {
                this.amounts = this.processedStock[productName].split(',');
            } else {this.amounts = []; }
        this.productName = productName;
    }

    uploadProcessedStock() {
        this.stockTakingService.sendProcessedProducts().subscribe();
    }

    startStocktaking() {
        const item = {};
        localStorage.setItem('stock', JSON.stringify(item));
    }

    ngOnDestroy(): void {
        this._productNames.unsubscribe();
    }
}

// TODO: Make Colored LED's that shows if there is a connection, and also if there is data that needs to be saved.
