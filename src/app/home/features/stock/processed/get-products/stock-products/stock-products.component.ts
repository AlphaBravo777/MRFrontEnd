import { Component, OnInit, Input } from '@angular/core';

import { ProcessedStock, ProcessedGroup } from './../../../stock-services/Stock';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-stock-products',
    templateUrl: './stock-products.component.html',
    styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit {

    private _products = new BehaviorSubject<ProcessedStock[]>([]);
    processedGroup: ProcessedGroup[];
    batch: String;

    @Input()
    set products(value) {
        this._products.next(value);
    }
    get products() {
        return this._products.getValue();
    }

    constructor() { }

    ngOnInit() {
        this._products.subscribe(x => {
            this.processedGroup = this.groupByCategory(this.products);
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
}
