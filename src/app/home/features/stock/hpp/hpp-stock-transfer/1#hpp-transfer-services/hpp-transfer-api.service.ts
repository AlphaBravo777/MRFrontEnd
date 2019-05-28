import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HppTransferApiService {
    constructor(
        private urlService: UrlsService, private http: HttpClient) {}

    private stockUrl = this.urlService.backendUrl + 'stock/';
    private meatriteStockUrl = this.urlService.backendUrl + 'api/products/';

    hppUpdateStock(hppStock) {
        return this.http.post<any>(this.stockUrl + 'hppStock/update/', hppStock);
    }

    hppDeleteStock(groupStatusNumber) {
        return this.http.delete<any>(this.stockUrl + 'hppStock/deleteGroup/' + groupStatusNumber);
    }

    submitPnPStock(mrPnPStock) {
        // console.log('Here is the meatrite stock:', mrPnPStock);
        return this.http.post<any>(this.meatriteStockUrl + 'stock/meatriteStock/insert/', mrPnPStock);
    }
}
