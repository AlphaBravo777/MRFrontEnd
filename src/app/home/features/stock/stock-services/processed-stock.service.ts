import { Injectable } from '@angular/core';
import { StockAPIService } from './stock-api.service';

import { IProcessedStockProducts } from './Stock';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { DialogBoxService } from '../../../core/dialog-box/dialog-box.service';

@Injectable({
    providedIn: 'root'
})
export class ProcessedStockService {

    constructor(
        private stockAPI: StockAPIService,
        private router: Router,
        private dialogBoxService: DialogBoxService) { }

    personStream: ReplaySubject<any> = new ReplaySubject();


    insertProcStockIntoDB(stocktime) {
        const databaseArray = this.getStockReadyForDatabase(stocktime);
        this.deleteOldStock(stocktime);
        this.insertStockIntoDB(databaseArray);

    }

    getStockReadyForDatabase(stocktime) {
        const finalArray = [];
        const stockArray: IProcessedStockProducts[] = JSON.parse(localStorage.getItem(this.stockAPI.workingProcStock));
        for (let array = 0; array < stockArray.length; ++array) {
            if (stockArray[array].mainContainer.length > 0) {
                for (let mainCon = 0; mainCon < stockArray[array].mainContainer.length; ++mainCon) {
                    if (stockArray[array].mainContainer[mainCon].amount.length > 0) {
                        for (let amt = 0; amt < stockArray[array].mainContainer[mainCon].amount.length; ++amt) {
                            const name = stockArray[array].product;
                            const amount = stockArray[array].mainContainer[mainCon].amount[amt];
                            const container = stockArray[array].mainContainer[mainCon].container;
                            const indProduct = { prodName: name, amount: amount, container: container, time: stocktime };
                            finalArray.push(indProduct);
                        }
                    }
                }
            }
        }
        return finalArray;
    }

    deleteOldStock(stocktime) {
        this.stockAPI.deleteAllTimeProcessedStock(stocktime).subscribe(x => {
            if (!x) {
                console.log('Orders deleted', x);
            } else {
                console.log('Orders NOT deleted', x);
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

    confirmClearAllProducts() {
        this.dialogBoxService.openStockClearedDialog();
    }

    confirmClearHalfProducts() {
        localStorage.setItem('tempStock', localStorage.getItem(this.stockAPI.emptyStockAndContainers));
        this.dialogBoxService.openStockClearedHalfDialog().subscribe(x => {
            if (x) {
                this.stockAPI.getProcessedStockContainersToDelete().subscribe(value => {
                    console.log(value);
                    const workingStock: IProcessedStockProducts[] = JSON.parse(localStorage.getItem(this.stockAPI.workingProcStock));
                    for (let noDel = 0; noDel < value.length; ++noDel) {
                        for (let ws = 0; ws < workingStock.length; ++ws) {
                            if (value[noDel].productid === workingStock[ws].product) {
                                for (let cont = 0; cont < workingStock[ws].mainContainer.length; ++cont) {
                                    if (value[noDel].container === workingStock[ws].mainContainer[cont].container) {
                                        const amounts = [];
                                        for (let amt = 0; amt < workingStock[ws].mainContainer[cont].amount.length; ++amt) {
                                            amounts.push(workingStock[ws].mainContainer[cont].amount[amt]);
                                            // console.log(workingStock[ws].mainContainer[cont].amount[amt]);
                                        }
                                        this.saveStockDataToEmpty(value[noDel].productid, value[noDel].container, amounts);
                                    }
                                }
                            }
                        }
                    }
                    localStorage.setItem(this.stockAPI.workingProcStock, localStorage.getItem('tempStock'));
                    localStorage.removeItem('tempStock');
                });
            }
        });
    }

    saveStockDataToEmpty(stockName, containerName, amounts) {
        const emptyStock: IProcessedStockProducts[] = JSON.parse(localStorage.getItem('tempStock'));
        for (let es = 0; es < emptyStock.length; ++es) {
            if (emptyStock[es].product === stockName) {
                for (let cont = 0; cont < emptyStock[es].mainContainer.length; ++cont) {
                    if (emptyStock[es].mainContainer[cont].container === containerName) {
                        for (let amt = 0; amt < amounts.length; ++amt) {
                            emptyStock[es].mainContainer[cont].amount.push(amounts[amt]);
                        }
                    }
                }
            }
        }
        localStorage.setItem('tempStock', JSON.stringify(emptyStock));
    }

    clearAllProducts(stocktime) {
        this.stockAPI.deleteAllTimeProcessedStock(stocktime)
            .subscribe(x => {
                console.log(x);
                this.router.navigate(['user/user-nav/']);
            });
    }


}
