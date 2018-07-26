import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductDetails, ProcessedStockProducts } from './../../stock-services/Stock';
import { DialogBoxService } from '../../../../core/dialog-box/dialog-box.service';
import { ProcessedStockService } from '../../stock-services/processed-stock.service';
import { StockAPIService } from '../../stock-services/stock-api.service';


@Component({
    selector: 'app-get-products',
    templateUrl: './get-products.component.html',
    styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit, OnDestroy {

    constructor(
        private dialogBoxService: DialogBoxService,
        private processedStockService: ProcessedStockService,
        private stockAPI: StockAPIService
    ) { }

    productNames: ProductDetails[];
    processedStockTime = JSON.parse(localStorage.getItem('stocktime'));
    processedStockMain: ProcessedStockProducts[];
    productContainers: any[];
    THISISATEST: String | String[];  // Here we are saying that this can be a string, or a string array (When re-using)

    ngOnInit() {
        this.getProductNames();
        this.getStocklist(this.processedStockTime);
        this.processedStockMain = this.stockAPI.getHardcodedStock();
        this.productContainers = this.stockAPI.getProductContainers();
    }

    getProductNames(): void {
        this.stockAPI.getProducts()
            .subscribe(response => {
                this.productNames = response;
            },
                err => console.log(err)
            );
    }

    getStocklist(time): void {  // Gets the stock-list and puts it into the localstorage after grouping
        let processedStock;
        this.stockAPI.getTimedStock(time)
            .subscribe(stock => {
                processedStock = this.processedStockService.groupStockData(stock);
                localStorage.setItem('stock', JSON.stringify(processedStock));
            },
                err => console.log(err)
            );
    }

    ngOnDestroy(): void {
        this.dialogBoxService.openConfirmationDialog();
    }
}
