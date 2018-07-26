import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ProductDetails, ProductGroup, ProcessedStockProducts } from './../../../stock-services/Stock';
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

    private _productNames = new BehaviorSubject<ProductDetails[]>([]);
    processedGroup: ProductGroup[];
    batch: String;
    productName = 'Select a product';
    productNameWithContainer = {};
    productContainerOptions;
    processedStock = {};
    amounts = [];

    @Input() processedStockMain: ProcessedStockProducts[];  // This can just load with *ngIF cause it only comes in once
    @Input() productContainers: any[];

    @Input()   // This can just load with *ngIF cause it only comes in once
    set productNames(value) {
        this._productNames.next(value);
    }
    get productNames() {
        return this._productNames.getValue();
    }

    ngOnInit() {
        // this can probably all be done in parent component and just the group inserted here without any change detection
        this._productNames.subscribe(x => {
            this.processedGroup = this.processedStockService.groupByCategory(this.productNames);
        });
    }

    BatchGroup(batch) {
        this.batch = batch;
        console.log(this.batch);
    }


    changeProduct2(productName) {
        for (let i = 0; i < this.processedStockMain.length; ++i) {
            if (this.processedStockMain[i].product === productName) {
                this.productNameWithContainer = this.processedStockMain[i];
                this.getContainers(productName);
                return;
            }
        }
        console.log('There was no stock');
        this.productNameWithContainer = {};
    }

    getContainers(productName) {
        for (let i = 0; i < this.productContainers.length; ++i) {
            if (this.productContainers[i].name === productName) {
                this.productContainerOptions = this.productContainers[i];
                return;
            }
        }
    }

    changeProduct(productName) { // This is the function that starts the invividual product component
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
