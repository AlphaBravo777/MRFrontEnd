import { Component, OnInit, Input } from '@angular/core';

import {IProductDetails,
        IProcessedStockProducts,
        IProductGroup} from './../../stock-services/Stock';
import { StockAPIService } from '../../stock-services/stock-api.service';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import { ProductContainerService } from '../../stock-services/product-container.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-get-products',
    templateUrl: './get-products.component.html',
    styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {

    constructor(
        private stockAPI: StockAPIService,
        private route: ActivatedRoute,
        private productContainerService: ProductContainerService
    ) {}

    workingProcessedStock: IProcessedStockProducts[];   // Main data with all the products, containers, and the amounts
    processedGroup: IProductGroup[];

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        const products$ = this.stockAPI.getProducts();
        const containers$ = this.stockAPI.getProductContainers();
        // const processedStock$ = this.stockAPI.getTimedStock(this.stocktime);
        forkJoin([products$, containers$]).subscribe(results => {
            const emptyProductContainers: IProcessedStockProducts[] = this.productContainerService.createPlaceForContainers(results[0]);
            // tslint:disable-next-line
            const prodWithContainers: IProcessedStockProducts[] = this.productContainerService.insertContainers(emptyProductContainers, results[1]);
            localStorage.setItem(this.stockAPI.emptyStockAndContainers, JSON.stringify(prodWithContainers));
            if (localStorage[this.stockAPI.workingProcStock]) {
                this.workingProcessedStock = JSON.parse(localStorage.getItem(this.stockAPI.workingProcStock));
            } else {
                localStorage.setItem(this.stockAPI.workingProcStock, JSON.stringify(prodWithContainers));
                this.workingProcessedStock = prodWithContainers;
            }
            // tslint:disable-next-line
            // this.productsWithContainersAndAmounts = this.productContainerService.insertTotalsIntoContainers(results[2], prodWithContainers);
            // tslint:disable-next-line
            // localStorage.setItem('stock', JSON.stringify(this.productsWithContainersAndAmounts)); // This line resets the stock to DB data
            this.processedGroup = this.productContainerService.groupByCategory(results[0]);
          });
    }

}
