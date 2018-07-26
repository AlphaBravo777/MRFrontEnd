import { Injectable } from '@angular/core';
import { StockAPIService } from './stock-api.service';
import { ProductGroup, ProductDetails } from './Stock';

@Injectable({
    providedIn: 'root'
})
export class ProcessedStockService {

    constructor(private stockAPI: StockAPIService) { }

    groupStockData(stock) {
        const groupedStock = {};
        for (let a = 0; a < stock.length; ++a) {
            if (Object.keys(stock[a])[0] in groupedStock) {
                groupedStock[Object.keys(stock[a])[0]] = groupedStock[Object.keys(stock[a])[0]] + ',' + stock[a][Object.keys(stock[a])[0]];
            } else {
                groupedStock[Object.keys(stock[a])[0]] = stock[a][Object.keys(stock[a])[0]];
            }
        }
        return groupedStock;
    }

    groupByCategory(products: ProductDetails[]): ProductGroup[] {
        if (!products) {return; } // This helps also to avoid an "undefined" error
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
            if (array[i] === '0' || array[i] === '' ) {
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



}
