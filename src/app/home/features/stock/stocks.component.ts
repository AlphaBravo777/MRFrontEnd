import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockAPIService } from './stock-services/stock-api.service';

@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

    constructor(private router: Router, private stockAPI: StockAPIService) { }

    ngOnInit() {
    }

    setTime(time) {
        localStorage.setItem('stocktime', JSON.stringify(time));
    }

}
