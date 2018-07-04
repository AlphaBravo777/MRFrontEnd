import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlsService } from '../../../core/urls.service';

@Injectable({
  providedIn: 'root'
})
export class StockTakingService {

  constructor(private http: HttpClient, private _urlService: UrlsService) { }

   private products = this._urlService.rootUrl + 'api/products/';

  getProducts() {
    return this.http.get<any>(this.products);
  }

  getTimedStock(time: String) {
    this.products = this.products + time;
    console.log(this.products);
    return this.http.get<any>(this.products);
  }
}
