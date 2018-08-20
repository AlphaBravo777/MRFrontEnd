import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockAPIService } from './stock-services/stock-api.service';
import { ProcessedStockService } from './stock-services/processed-stock.service';

@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

    constructor(private processedStockService: ProcessedStockService) { }

    ngOnInit() {
    }

    confirmClearAllProducts() {
        this.processedStockService.confirmClearAllProducts();
    }

}
