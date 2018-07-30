import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { IProductDetails, IProductGroup, IProcessedStockProducts, IContainerGroups } from './../../../stock-services/Stock';
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

    private _productNames = new BehaviorSubject<IProductDetails[]>([]);
    processedGroup: IProductGroup[];
    batch: String;
    productName = 'Select a product';
    productNameWithContainer = {};
    productContainerOptions: IContainerGroups;  // This is the containers that are given through to show.
    processedStock = {};
    amounts = [];

    @Input() processedStockMain: IProcessedStockProducts[];  // (This is the main data)
    @Input() productContainers: IContainerGroups[];

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

    getContainers(productName) {  // This function is giving problems (Go through main data and get container data)
        const holder: IContainerGroups = { name: '', containers: [] };
        for (let i = 0; i < this.processedStockMain.length; ++i) {
            if (this.processedStockMain[i].product === productName) {
                holder.name = this.processedStockMain[i].product;
                for (let j = 0; j < this.processedStockMain[i].mainContainer.length; ++j) {
                    holder.containers.push(this.processedStockMain[i].mainContainer[j].container);
                }
            this.productContainerOptions =  holder;
            }
        }
    }

    changeProduct(productName) { // This is the function that starts the invividual product component
        const stock = localStorage.getItem('stock');
        this.processedStock = JSON.parse(stock);
        if (this.processedStock.hasOwnProperty(productName)) {
            this.amounts = this.processedStock[productName].split(',');
        } else { this.amounts = []; }
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
