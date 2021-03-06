import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IProcessedStockContainer, IProcessedStockProducts } from './Stock';
import { StockAPIService } from './stock-api.service';

@Injectable({
    providedIn: 'root'
})
export class ProcessedStockFormService {

    constructor(private fb: FormBuilder, private stockAPIService: StockAPIService) { }

    turnIntoProductUnit(productName, containerAmounts) {
        const productUnit: IProcessedStockProducts = { product: productName, mainContainer: [] };
        for (let a = 0; a < containerAmounts.mainContainer.length; ++a) {
            const amount: string[] = [];
            for (let b = 0; b < containerAmounts.mainContainer[a].amount.length; ++b) {
                if (containerAmounts.mainContainer[a].amount[b].amount !== '') {
                    amount.push(containerAmounts.mainContainer[a].amount[b].amount);
                }
            }
            const container = { container: containerAmounts.mainContainer[a].container, amount: amount };
            productUnit.mainContainer.push(container);
        }
        this.checkToSeeIfProductThere(productUnit);
    }

    checkToSeeIfProductThere(productName: IProcessedStockProducts) {
        const stock: IProcessedStockProducts[] = JSON.parse(localStorage.getItem(this.stockAPIService.workingProcStock));
        // console.log(stock);
        for (let prodnum = 0; prodnum < stock.length; ++prodnum) {
            if (stock[prodnum].product === productName.product) {
                stock[prodnum].mainContainer = productName.mainContainer;
                // localStorage.removeItem('stock');
                // localStorage.setItem('stock', JSON.stringify(stock));
                // localStorage.setItem(stocktime, JSON.stringify(stock));
                localStorage.setItem(this.stockAPIService.workingProcStock, JSON.stringify(stock));
                // console.log(JSON.parse(localStorage.getItem(this.stockAPIService.workingProcStock)));
                return;
            }
        }
        console.log('------ STOCK DOES NOT EXIST !!!!! ------ ');
    }
}
