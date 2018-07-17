import { Injectable } from '@angular/core';
import { StockAPIService } from './stock-api.service';
import { first } from 'rxjs/operators';

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

}
