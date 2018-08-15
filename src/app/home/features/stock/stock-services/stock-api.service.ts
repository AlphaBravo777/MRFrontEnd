import { Injectable } from '@angular/core';

import { UrlsService } from '../../../core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IProcessedStockProducts, IRawProcessedStock, IProductContainers, IProductDetails, IContainerGroups } from './Stock';
import { Observable } from '../../../../../../node_modules/rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockAPIService {

    constructor(private http: HttpClient, private urlService: UrlsService) { }

    // http://192.168.45.2:8000/api/products/containers
    private productsUrl = this.urlService.rootUrl + 'api/products/';

    getProducts(): Observable<IProductDetails[]> {
        return this.http.get<IProductDetails[]>(this.productsUrl);
    }

    getTimedStock(time: String): Observable<IRawProcessedStock[]> {
        const timeUrl = this.productsUrl + time + '/';
        // console.log(timeUrl);
        return this.http.get<IRawProcessedStock[]>(timeUrl);
    }

    getProductContainers(): Observable<IProductContainers[]> {
        const timeUrl = this.productsUrl + 'containers/';
        // console.log(timeUrl);
        return this.http.get<IProductContainers[]>(timeUrl);
    }

    deleteAllTimeProcessedStock(time: String) {
        const timeUrl = this.productsUrl + 'delete/' + time;
        return this.http.delete<any>(timeUrl);
    }

    enterAllProcessedProductsIntoDB(finalArray) {
        return this.http.post<any>(this.productsUrl + 'input/', finalArray);
    }
}
