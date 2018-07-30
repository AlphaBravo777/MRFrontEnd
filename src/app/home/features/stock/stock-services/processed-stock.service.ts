import { Injectable } from '@angular/core';
import { StockAPIService } from './stock-api.service';
import {    IProductGroup,
            IProductDetails,
            IProcessedStockProducts,
            IRawProcessedStock,
            IProductContainers,
            IProcessedStockContainer } from './Stock';

@Injectable({
    providedIn: 'root'
})
export class ProcessedStockService {

    constructor(private stockAPI: StockAPIService) { }

    getProcessedStockMain(): IProcessedStockProducts[] {
        let ProdConGroup: IProcessedStockProducts[] = [];
        this.stockAPI.getProductContainers()
            .subscribe(prodContainers => {
                ProdConGroup = this.getProductsAndContainers(prodContainers);
                console.log('1', ProdConGroup);
                return ProdConGroup;
            }
        );
        return ProdConGroup;
    }

    getProductsAndContainers(prodContainers: IProductContainers[]): IProcessedStockProducts[] {
        let emptyProdConGroup: IProcessedStockProducts[] = [];
        let fullprodConGroup: IProcessedStockProducts[] = [];
        this.stockAPI.getProducts()
            .subscribe(products => {
                emptyProdConGroup = this.createGroupWithProducts(products);
                fullprodConGroup = this.insertContainers(emptyProdConGroup, prodContainers);
                return fullprodConGroup;
            });
        return fullprodConGroup;
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

    groupStockData(stock: IRawProcessedStock[]): IProcessedStockProducts[] {
        const groupedStock: IProcessedStockProducts[] = [];
        const init = { product: stock[0].name, mainContainer: [{ container: stock[0].container, amount: [stock[0].amount] }] };
        groupedStock.push(init);
        for (let b = 0; b < groupedStock.length; ++b) {
            for (let a = 1; a < stock.length; ++a) {
                if (stock[a].name === groupedStock[b].product) {
                    const holder = { container: stock[a].container, amount: [stock[a].amount] };
                    groupedStock[b].mainContainer.push(holder);
                    break;
                }
            }
            // tslint:disable-next-line:max-line-length
            // const holder2 = { product: stock[a].name, mainContainer: [{ container: stock[a].container, amount: [stock[a].amount] }] };
            // groupedStock.push(holder2);
        }
        // if (Object.keys(stock[a])[0] in groupedStock) {
        // tslint:disable-next-line:max-line-length
        //     groupedStock[Object.keys(stock[a])[0]] = groupedStock[Object.keys(stock[a])[0]] + ',' + stock[a][Object.keys(stock[a])[0]];
        // } else {
        //     groupedStock[Object.keys(stock[a])[0]] = stock[a][Object.keys(stock[a])[0]];
        // }
        console.log('---- ', groupedStock);
        return groupedStock;
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



}
