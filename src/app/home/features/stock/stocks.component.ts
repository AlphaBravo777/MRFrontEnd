import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockAPIService } from './stock-services/stock-api.service';

@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
