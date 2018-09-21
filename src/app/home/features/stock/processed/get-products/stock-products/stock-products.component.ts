import { Component, OnInit, Input, ViewChild, Renderer2 } from '@angular/core';

import { IProductDetails, IProductGroup, IProcessedStockProducts, IContainerGroups } from '../../../stock-services/Stock';
import { BehaviorSubject } from 'rxjs';
import { ProcessedStockService } from '../../../stock-services/processed-stock.service';
import { StockAPIService } from '../../../stock-services/stock-api.service';
import { AuthService } from '../../../../admin/auth.service';
import { AuthGuard } from '../../../../admin/auth.guard';

@Component({
    selector: 'app-stock-products',
    templateUrl: './stock-products.component.html',
    styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit {

    constructor(
        private processedStockService: ProcessedStockService,
        private renderer: Renderer2,
        private apiService: StockAPIService,
        private authGuard: AuthGuard
    ) { }

    @ViewChild('submitToDBButton') submitToDBButton;

    batch: String;
    // productName = 'Select a product';
    productNameWithContainer = {};
    productContainerOptions: IContainerGroups;  // This is the containers that are given through to show.
    productDescription;
    connection: boolean;
    testClass = 'goldButton';

    // (This is the main data, we will try and change it to localStorage)
    @Input() workingProcessedStock: IProcessedStockProducts[];
    @Input() stocktime;
    @Input() processedGroup: IProductGroup[]; // This is all the product group names
    productsOfWorkingSession: IProcessedStockProducts[] = JSON.parse(localStorage.getItem(this.apiService.workingProcStock));

    ngOnInit() {
    }

    BatchGroup(batch) {
        this.batch = batch;
        // console.log(this.batch);
        this.productContainerOptions = undefined;
    }

    changeProduct(product) {
        if (localStorage[this.apiService.workingProcStock]) {
            this.workingProcessedStock = JSON.parse(localStorage.getItem(this.apiService.workingProcStock));
        } else {
            this.workingProcessedStock = JSON.parse(localStorage.getItem(this.apiService.emptyStockAndContainers));
        }
        for (let i = 0; i < this.workingProcessedStock.length; ++i) {
            if (this.workingProcessedStock[i].product === product.name) {
                this.productNameWithContainer = this.workingProcessedStock[i];
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
        for (let i = 0; i < this.workingProcessedStock.length; ++i) {
            if (this.workingProcessedStock[i].product === productName) {
                holder.name = this.workingProcessedStock[i].product;
                for (let j = 0; j < this.workingProcessedStock[i].mainContainer.length; ++j) {
                    holder.containers.push(this.workingProcessedStock[i].mainContainer[j].container);
                }
                this.productContainerOptions = holder;
            }
        }
    }

    submitToDataBase(time) {
        this.authGuard.canActivate().subscribe(x => {
            console.log(x);
        });
        this.apiService.checkConnectionWithDelete().subscribe(
            (response) => {
                console.log(response.ok);
                if (response.ok) {
                    console.log('Things will be send now');
                    this.processedStockService.insertProcStockIntoDB(time);
                } else {
                }
            }
        );
    }

    confirmClearAllProducts() {
        this.processedStockService.confirmClearAllProducts();
    }

    loadOldStock() {
        const recoveredStock = JSON.parse(localStorage.getItem(this.stocktime));
        localStorage.setItem('stock', JSON.stringify(recoveredStock));
    }
}

