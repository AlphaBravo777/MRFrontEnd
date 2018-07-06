import { Component, OnInit } from '@angular/core';

import { ProcessedStock } from './../../stock-services/Stock';
import { StockTakingService } from './../../stock-services/stock-taking.service';

@Component({
    selector: 'app-get-products',
    templateUrl: './get-products.component.html',
    styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {

    constructor(private _stockTakingService: StockTakingService) { }

    products: ProcessedStock[];
    processedStock = {};

    ngOnInit() {
        this.getProducts();
        this.getStocklist();
    }

    getProducts() {
        this._stockTakingService.getProducts()
        .subscribe(response => {
            this.products = response;
        },
            err => console.log(err)
        );
    }

    getStocklist() {
        this._stockTakingService.getTimedStock('06:00')
        .subscribe(response => {
            console.log('+++++++', response);
            localStorage.setItem('stock', JSON.stringify(this.turnIntoObject(response)));
        },
            err => console.log(err)
        );
    }

    turnIntoObject(arr) {
        const rv = {};
        const rb = {};
        for (let i = 0; i < arr.length; ++i) {
            Object.assign(rv, arr[i]);
            }
        for (const key in rv) {
            if (rv.hasOwnProperty(key)) {
                rv[key].replace(/"/g, '');
                rb[key] = rv[key].replace(/[\[\]'"]+/g, '');
            }
        }
        return rb;
    }
}

// TODO: Sort different products into batches
// this.processedStock = {time: '16:00', RV1: [10, 20, 30], SV1: [40, 50, 60, '8*10']};
