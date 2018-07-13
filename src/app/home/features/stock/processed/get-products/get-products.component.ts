import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

import { ProcessedStock } from './../../stock-services/Stock';
import { StockTakingService } from './../../stock-services/stock-taking.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../../core/alerts/alert.service';

@Component({
    selector: 'app-get-products',
    templateUrl: './get-products.component.html',
    styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit, OnDestroy {

    constructor(private _stockTakingService: StockTakingService, private alertService: AlertService) { }

    products: ProcessedStock[];
    processedStock = {};
    processedTime = localStorage.getItem('stocktime');

    ngOnInit() {
        this.getProducts();
        this.getStocklist(JSON.parse(this.processedTime));
    }

    getProducts() {
        this._stockTakingService.getProducts()
        .subscribe(response => {
            this.products = response;
            // this.alertService.success('Stock data recieved');
        },
            err => console.log(err)
        );
    }

    getStocklist(time) {
        this._stockTakingService.getTimedStock(time).pipe(first())
        .subscribe(response => {
            const stock = this.gatherData(response);
            localStorage.setItem('stock', JSON.stringify(stock));
        },
            err => console.log(err)
        );
    }

    gatherData(response) {
        const final = {};
        for (let i = 0; i < response.length; ++i) {
            if (Object.keys(response[i])[0] in final) {
                final[Object.keys(response[i])[0]] = final[Object.keys(response[i])[0]] + ',' + response[i][Object.keys(response[i])[0]];
            } else {
                final[Object.keys(response[i])[0]] = response[i][Object.keys(response[i])[0]];
            }
        }
        return final;
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


    ngOnDestroy(): void {
        window.alert('You are about to navigate away');
        if (confirm('Are you sure you want to save this thing into the database?')) {
            // Save it!
        } else {
            // Do nothing!
        }
    }

}

// TODO: Sort different products into batches
// this.processedStock = {time: '16:00', RV1: [10, 20, 30], SV1: [40, 50, 60, '8*10']};
