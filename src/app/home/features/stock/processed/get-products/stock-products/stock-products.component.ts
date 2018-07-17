import { Component, OnInit, Input } from '@angular/core';

import { ProcessedStock, ProcessedGroup } from './../../../stock-services/Stock';
import { BehaviorSubject } from 'rxjs';
import { StockTakingService } from '../../../stock-services/stock-taking.service';

@Component({
    selector: 'app-stock-products',
    templateUrl: './stock-products.component.html',
    styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit {

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

    constructor(private _stockTakingService: StockTakingService) { }

    ngOnInit() {
        this._productNames.subscribe(x => {
            this.processedGroup = this.groupByCategory(this.productNames);
        });
    }

    groupByCategory(products: ProcessedStock[]): ProcessedGroup[] {
        if (!products) {return; } // This helps also to avoid an "undefined" error
        const categories = new Set(products.map(x => x.batchgroup).sort());
        const result = Array.from(categories).map(x => ({
            group: x,
            stock: products.filter(stocks => stocks.batchgroup === x)
        }));
        return result;
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

    stockFinished() {
        this._stockTakingService.sendProcessedProducts().subscribe();
    }

    startStocktaking() {
        const item = {};
        localStorage.setItem('stock', JSON.stringify(item));
        // const time = JSON.parse(localStorage.getItem('stocktime'));
        // this._stockTakingService.deleteAllTimeProcessedStock(time).subscribe(x => console.log(x));
    }
}

// ++++++++ [10,20,30,8*10] {SV1: "[10,20,30,8*10]", RV1: "[3*4,5,20,10*7,10]"}
// ++++++++ (4) [40, 50, 60, "8*10"] {time: "16:00", RV1: [10, 20, 30], SV1: [40, 50, 60, "8*10"]}

// TODO: Make Colored LED's that shows if there is a connection, and also if there is data that needs to be saved.
