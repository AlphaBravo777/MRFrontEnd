import { Component, OnInit, OnDestroy } from '@angular/core';

import {IProductDetails,
        IProcessedStockProducts,
        IProductContainers,
        IProcessedStockContainer,
        IContainerGroups,
        IRawProcessedStock} from './../../stock-services/Stock';
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

    productNames: IProductDetails[];
    processedStockTime = JSON.parse(localStorage.getItem('stocktime'));
    processedStockMain: IProcessedStockProducts[];   // Main data with all the products, containers, and the amounts
    grantTotal: IProcessedStockProducts[];
    testdata;

    ngOnInit() {
        this.getProcessedStockMain();
        // this.processedStockService.getTestdata().subscribe(x => this.testdata = x);
        // console.log(this.testdata);
    }

    getProcessedStockMain() {
        this.stockAPI.getProductContainers()
            .subscribe(prodContainers => {
                this.getProductsAndContainers(prodContainers);
            }
        );
    }

    getProductsAndContainers(prodContainers: IProductContainers[]) {
        let emptyProdConGroup: IProcessedStockProducts[] = [];
        this.stockAPI.getProducts()
            .subscribe(products => {
                this.productNames = products;
                emptyProdConGroup = this.createGroupWithProducts(products);
                this.processedStockMain = this.insertContainers(emptyProdConGroup, prodContainers);
                this.addAmountsToStockMain(this.processedStockMain);
            });
    }

    createGroupWithProducts(products: IProductDetails[]): IProcessedStockProducts[] {
        const emptyProdConGroup: IProcessedStockProducts[] = [];
        for (let prodnum = 0; prodnum < products.length; ++prodnum) {
            const emptyProdCon: IProcessedStockProducts = {product: products[prodnum].productid, mainContainer: []};
            emptyProdConGroup.push(emptyProdCon);
        }
        return emptyProdConGroup;
    }

    insertContainers(fullProdConGroup: IProcessedStockProducts[], containers: IProductContainers[]): IProcessedStockProducts[] {
        for (let connum = 0; connum < containers.length; ++connum) {
            for (let prodgroup = 0; prodgroup < fullProdConGroup.length; ++prodgroup) {
                if (fullProdConGroup[prodgroup].product === containers[connum].productid) {
                    const con: IProcessedStockContainer = {container: containers[connum].container, amount: []};
                    fullProdConGroup[prodgroup].mainContainer.push(con);
                }
            }
        }
        return fullProdConGroup;
    }

    addAmountsToStockMain(processedStockMain: IProcessedStockProducts[]) {
    this.stockAPI.getTimedStock(this.processedStockTime)
        .subscribe(stock => {
            this.grantTotal = this.getGrandTotal(stock, processedStockMain);
            // console.log(this.grantTotal);
            this.processedStockMain = this.grantTotal;
            localStorage.setItem('stock', JSON.stringify(processedStockMain));
        });
    }

    getGrandTotal(stock: IRawProcessedStock[], processedStockMain: IProcessedStockProducts[]): IProcessedStockProducts[] {
        for (let stk = 0; stk < stock.length; ++stk) {
            for (let main = 0; main < processedStockMain.length; ++main) {
                if (stock[stk].name === processedStockMain[main].product ) {
                    for (let con = 0; con < processedStockMain[main].mainContainer.length; ++con) {
                        if (stock[stk].container === processedStockMain[main].mainContainer[con].container ) {
                            processedStockMain[main].mainContainer[con].amount.push(stock[stk].amount);
                        }
                    }
                }
            }
        }

        return processedStockMain;
    }
    ngOnDestroy(): void {
        // this.dialogBoxService.openConfirmationDialog();
    }
}
