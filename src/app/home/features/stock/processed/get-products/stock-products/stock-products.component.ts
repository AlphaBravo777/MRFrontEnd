import { Component, OnInit, Input, ViewChild, Renderer2 } from '@angular/core';

import { IProductDetails, IProductGroup, IProcessedStockProducts, IContainerGroups } from './../../../stock-services/Stock';
import { BehaviorSubject } from 'rxjs';
import { ProcessedStockService } from '../../../stock-services/processed-stock.service';
import { StockAPIService } from '../../../stock-services/stock-api.service';

@Component({
    selector: 'app-stock-products',
    templateUrl: './stock-products.component.html',
    styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit {

    constructor(
        private processedStockService: ProcessedStockService,
        private renderer: Renderer2,
        private apiService: StockAPIService
    ) { }

    @ViewChild('submitToDBButton') submitToDBButton;

    batch: String;
    // productName = 'Select a product';
    productNameWithContainer = {};
    productContainerOptions: IContainerGroups;  // This is the containers that are given through to show.
    productDescription;
    connection: boolean;
    testClass = 'meatriteButton';

    // (This is the main data, we will try and change it to localStorage)
    @Input() productsWithContainersAndAmounts: IProcessedStockProducts[];
    @Input() stocktime;
    @Input() processedGroup: IProductGroup[]; // This is all the product group names

    ngOnInit() {

    }

    checkConnection() {
        this.apiService.checkConnectionWithDelete().subscribe(
            (response) => {
                console.log(response.ok);
                if (response.ok) {
                    console.log('Things will be send now');
                    this.renderer.setProperty(this.submitToDBButton.nativeElement, 'disabled', 'true');
                    this.testClass = 'paleGreenButton';
                    this.processedStockService.insertProcStockIntoDB(this.stocktime);
                } else {
                    this.testClass = 'meatriteButton';
                }
            }
        );
        this.testClass = 'meatriteButton';
    }

    BatchGroup(batch) {
        this.batch = batch;
        // console.log(this.batch);
        this.productContainerOptions = undefined;
    }

    changeProduct(product) {
        this.productsWithContainersAndAmounts = JSON.parse(localStorage.getItem('stock'));
        for (let i = 0; i < this.productsWithContainersAndAmounts.length; ++i) {
            if (this.productsWithContainersAndAmounts[i].product === product.name) {
                this.productNameWithContainer = this.productsWithContainersAndAmounts[i];
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
        for (let i = 0; i < this.productsWithContainersAndAmounts.length; ++i) {
            if (this.productsWithContainersAndAmounts[i].product === productName) {
                holder.name = this.productsWithContainersAndAmounts[i].product;
                for (let j = 0; j < this.productsWithContainersAndAmounts[i].mainContainer.length; ++j) {
                    holder.containers.push(this.productsWithContainersAndAmounts[i].mainContainer[j].container);
                }
                this.productContainerOptions = holder;
            }
        }
    }

    submitToDataBase() {
        this.checkConnection();
    }

    confirmClearAllProducts() {
        this.processedStockService.confirmClearAllProducts(this.stocktime);
    }

    loadOldStock() {
        const recoveredStock = JSON.parse(localStorage.getItem(this.stocktime));
        localStorage.setItem('stock', JSON.stringify(recoveredStock));
    }
}

// TODO: Make Colored LED's that shows if there is a connection, and also if there is data that needs to be saved.
