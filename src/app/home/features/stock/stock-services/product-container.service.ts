import { Injectable } from '@angular/core';
import { StockAPIService } from './stock-api.service';
import {    IProductContainers,
            IProductDetails,
            IProcessedStockProducts,
            IProcessedStockContainer,
            IRawProcessedStock,
            IProductGroup } from './Stock';

@Injectable({
  providedIn: 'root'
})
export class ProductContainerService {

    createPlaceForContainers(products: IProductDetails[]): IProcessedStockProducts[] {
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

    insertTotalsIntoContainers(stock: IRawProcessedStock[], processedStockMain: IProcessedStockProducts[]): IProcessedStockProducts[] {
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

    groupByCategory(products: IProductDetails[]): IProductGroup[] {
        if (!products) { return; } // This helps also to avoid an "undefined" error
        const categories = new Set(products.map(x => x.batchgroup).sort());
        const result = Array.from(categories).map(x => ({
            group: x,
            stock: products.filter(stocks => stocks.batchgroup === x)
        }));
        return result;
    }

}
