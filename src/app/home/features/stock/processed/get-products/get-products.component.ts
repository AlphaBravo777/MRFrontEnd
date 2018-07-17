import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProcessedStock } from './../../stock-services/Stock';
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

    productNames: ProcessedStock[];
    processedStockTime = JSON.parse(localStorage.getItem('stocktime'));

    ngOnInit() {
        this.getProductNames();
        this.getStocklist(this.processedStockTime);
    }

    getProductNames(): void {
        this.stockAPI.getProducts()
            .subscribe(response => {
                this.productNames = response;
            },
                err => console.log(err)
            );
    }

    getStocklist(time): void {
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
