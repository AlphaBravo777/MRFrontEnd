import { Component, OnInit, Input, OnDestroy, ViewChild, Renderer2 } from '@angular/core';

import { IProductDetails, IProductGroup, IProcessedStockProducts, IContainerGroups } from './../../../stock-services/Stock';
import { BehaviorSubject } from 'rxjs';
import { ProcessedStockService } from '../../../stock-services/processed-stock.service';
import { StockAPIService } from '../../../stock-services/stock-api.service';

@Component({
    selector: 'app-stock-products',
    templateUrl: './stock-products.component.html',
    styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit, OnDestroy {

    constructor(
        private processedStockService: ProcessedStockService,
        private renderer: Renderer2
    ) { }

    @ViewChild('submitToDBButton') submitToDBButton;

    private _productNames = new BehaviorSubject<IProductDetails[]>([]);
    processedGroup: IProductGroup[];
    batch: String;
    productName = 'Select a product';
    productNameWithContainer = {};
    productContainerOptions: IContainerGroups;  // This is the containers that are given through to show.
    processedStock = {};
    amounts = [];
    productDescription;
    // stocktime = JSON.parse(localStorage.getItem('stocktime'));

    @Input() processedStockMain: IProcessedStockProducts[];  // (This is the main data, we will try and change it to localStorage)
    @Input() stocktime;
    @Input()   // This can just load with *ngIF cause it only comes in once (Just normal list of productnames)
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
        this.productContainerOptions = undefined;
    }

    changeProduct(product) {
        this.processedStockMain = JSON.parse(localStorage.getItem('stock'));
        // this.processedStockMain = [];
        for (let i = 0; i < this.processedStockMain.length; ++i) {
            if (this.processedStockMain[i].product === product.name) {
                this.productNameWithContainer = this.processedStockMain[i];
                this.productDescription = product.description;
                this.getContainers(product.name);
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

    submitToDataBase() {
        this.renderer.setProperty(this.submitToDBButton.nativeElement, 'disabled', 'true');
        this.renderer.setStyle(this.submitToDBButton.nativeElement, 'background', 'gray');
        this.processedStockService.insertProcStockIntoDB(this.stocktime);
    }

    clearAllProducts() {
        this.processedStockService.clearAllProducts(this.stocktime);
    }

    ngOnDestroy(): void {
        this._productNames.unsubscribe();
    }
}

// TODO: Make Colored LED's that shows if there is a connection, and also if there is data that needs to be saved.
