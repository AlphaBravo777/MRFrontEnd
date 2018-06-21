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

    ngOnInit() {
        this._stockTakingService.getProducts()
            .subscribe(response => {
                this.products = response;
                console.log(this.products[1]);
            },
                err => console.log(err)
            );
    }
}

// TODO: Sort different products into batches
