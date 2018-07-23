import { Injectable } from '@angular/core';

import { UrlsService } from '../../../core/urls.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockAPIService {

    constructor(private http: HttpClient, private urlService: UrlsService) { }

    private productsUrl = this.urlService.rootUrl + 'api/products/';

    getProducts() {
        return this.http.get<any>(this.productsUrl);
    }

    getTimedStock(time: String) {
        const timeUrl = this.productsUrl + time;
        return this.http.get<any>(timeUrl);
    }

    getAlternativeStock(time: String) {
        const timeUrl = this.productsUrl + 'stock/' + time;
        return this.http.get<any>(timeUrl);
    }

}
