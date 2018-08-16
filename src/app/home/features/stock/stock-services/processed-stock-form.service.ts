import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IProcessedStockContainer, IProcessedStockProducts } from './Stock';

@Injectable({
    providedIn: 'root'
})
export class ProcessedStockFormService {

    constructor(private fb: FormBuilder) { }

    turnIntoProductUnit(productName, containerAmounts, stocktime) {
        // console.log('I am hit');
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
            // console.log('-------- ', containerAmounts.mainContainer[a]);
        }
        // console.log('-------- ', containerAmounts.mainContainer);
        this.checkToSeeIfProductThere(productUnit, stocktime);
    }

    checkToSeeIfProductThere(productName: IProcessedStockProducts, stocktime) {
        const stock: IProcessedStockProducts[] = JSON.parse(localStorage.getItem('stock'));
        for (let prodnum = 0; prodnum < stock.length; ++prodnum) {
            if (stock[prodnum].product === productName.product) {
                stock[prodnum].mainContainer = productName.mainContainer;
                localStorage.removeItem('stock');
                localStorage.setItem('stock', JSON.stringify(stock));
                localStorage.setItem(stocktime, JSON.stringify(stock));
                return;
            }
        }
        console.log('------ STOCK DOES NOT EXIST !!!!! ------ ');
    }
}
