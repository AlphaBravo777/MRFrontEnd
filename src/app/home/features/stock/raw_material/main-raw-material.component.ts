import { Component, OnInit } from '@angular/core';
import { ProcessedStockData$Service } from '../../../shared/services/stockServices/processed-stock-data.service';

@Component({
    selector: 'app-main-raw-material',
    templateUrl: './main-raw-material.component.html',
    styleUrls: ['./main-raw-material.component.css']
})
export class MainRawMaterialComponent implements OnInit {

    constructor(public processedStockService: ProcessedStockData$Service) { }

    stock;

    // How to create database design for stock
    // https://stackoverflow.com/questions/4380091/best-structure-for-inventory-database
    // https://softwareengineering.stackexchange.com/questions/278982/database-design-for-inventory
    // Look at how I did the product database with its containers

    ngOnInit() {
        // this.processedStockService.currentProcessedStock$.subscribe(data => {
        //     this.stock = data;
        //     console.log(this.stock);

        // });
    }

    getData() {
        this.processedStockService.changeStock();
    }

}
