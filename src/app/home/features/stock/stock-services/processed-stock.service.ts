import { Injectable } from '@angular/core';
import { StockAPIService } from './stock-api.service';

import {
    IProductGroup,
    IProductDetails,
    IProcessedStockProducts,
    IRawProcessedStock,
    IProductContainers,
    IProcessedStockContainer
} from './Stock';
import { Router } from '@angular/router';
import { ReplaySubject } from '../../../../../../node_modules/rxjs';
import { DialogBoxService } from '../../../core/dialog-box/dialog-box.service';

@Injectable({
    providedIn: 'root'
})
export class ProcessedStockService {

    personStream: ReplaySubject<any> = new ReplaySubject();
    constructor(private stockAPI: StockAPIService, private router: Router, private dialogBoxService: DialogBoxService) { }

    insertProcStockIntoDB() {
        const time = JSON.parse(localStorage.getItem('stocktime'));
        const databaseArray = this.getStockReadyForDatabase(time);
        this.deleteOldStock(time);
        this.insertStockIntoDB(databaseArray);

    }

    getStockReadyForDatabase(time) {
        const finalArray = [];
        const stockArray: IProcessedStockProducts[] = JSON.parse(localStorage.getItem('stock'));
        for (let array = 0; array < stockArray.length; ++array) {
            if (stockArray[array].mainContainer.length > 0) {
                for (let mainCon = 0; mainCon < stockArray[array].mainContainer.length; ++mainCon) {
                    if (stockArray[array].mainContainer[mainCon].amount.length > 0) {
                        for (let amt = 0; amt < stockArray[array].mainContainer[mainCon].amount.length; ++amt) {
                            const name = stockArray[array].product;
                            const amount = stockArray[array].mainContainer[mainCon].amount[amt];
                            const container = stockArray[array].mainContainer[mainCon].container;
                            const indProduct = { prodName: name, amount: amount, container: container, time: time };
                            finalArray.push(indProduct);
                        }
                    }
                }
            }
        }
        return finalArray;
    }

    deleteOldStock(time) {
        this.stockAPI.deleteAllTimeProcessedStock(time).subscribe(x => {
            if (!x) {
                console.log('Orders deleted');
            } else {
                this.dialogBoxService.openConfirmationDialog();
            }
        });
    }

    insertStockIntoDB(databaseArray) {
        this.stockAPI.enterAllProcessedProductsIntoDB(databaseArray).subscribe(x => {
            console.log('Number of orders:', databaseArray.length, ', Number of orders inserted:', x.length);
            if (databaseArray.length === x.length) {
                this.router.navigate(['user/user-nav/']);
            } else {
            this.dialogBoxService.openConfirmationDialog();
            }
        });
    }

    groupByCategory(products: IProductDetails[]): IProductGroup[] {
        if (!products) { return; } // This helps also to avoid an "undefined" error
        const categories = new Set(products.map(x => x.batchgroup).sort());
        const result = Array.from(categories).map(x => ({
            group: x,
            stock: products.filter(stocks => stocks.batchgroup === x)
        }));
        return result;
    }

    submitResult(amount, productName) {
        amount = this.removeZeros(amount);
        const key = productName;
        if (localStorage['stock']) {
            const JSObject = JSON.parse(localStorage.getItem('stock'));
            const b = amount.toString();
            JSObject[key] = b;
            localStorage.setItem('stock', JSON.stringify(JSObject));
        }
        //    this.changeProduct('Select next product');
    }

    removeZeros(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] === '0' || array[i] === '') {
                array.splice(i, 1);
            }
        }
        return array;
    }

    calculateTotal(amountArray) {
        let val;
        let total = 0;
        for (val of amountArray) {
            console.log(Function('"use strict"; return (' + val + ')')());
            total = total + Function('"use strict"; return (' + val + ')')();
        }
        return total;
    }

    getTestdata(): any {
        this.stockAPI.getProducts().subscribe(response => {
                this.personStream.next(response);
            });
    }


}
