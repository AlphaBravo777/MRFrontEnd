import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlsService } from '../../../core/urls.service';

@Injectable({
    providedIn: 'root'
})
export class StockTakingService {

    constructor(private http: HttpClient, private _urlService: UrlsService) { }

    private productsUrl = this._urlService.rootUrl + 'api/products/';

    getProducts() {
        return this.http.get<any>(this.productsUrl);
    }

    getTimedStock(time: String) {
        const timeUrl = this.productsUrl + time;
        return this.http.get<any>(timeUrl);
    }

    sendProcessedProducts() {
        console.log(JSON.parse(localStorage.getItem('stock')));
        // const products = JSON.parse(localStorage.getItem('stock'));
        const products = {'SV': '[1, 3, 5, 7]'};
        // const products = {'RV1': '4', 'SV1': '5'};
        return this.http.post<any>(this.productsUrl + 'input', products);
    }
}


