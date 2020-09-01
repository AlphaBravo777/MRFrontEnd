import { Injectable } from '@angular/core';

import { UrlsService } from '../../../core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IRawProcessedStock, IProductContainers, IProductDetailsStockDepricated } from './Stock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockAPIService {

    constructor(private http: HttpClient, private urlService: UrlsService) { }

    workingProcStock = 'workingProcStock';
    emptyStockAndContainers = 'emptyStockAndContainers';

    getProducts(): Observable<IProductDetailsStockDepricated[]> {     // Gets all the meatrite products that are active
        return this.http.get<IProductDetailsStockDepricated[]>(this.urlService.productsUrl);
    }

    getTimedStock(time: String): Observable<IRawProcessedStock[]> { // Gets all the stock values for a specific time
        return this.http.get<IRawProcessedStock[]>(this.urlService.productsUrl + time + '/');
    }

    getProductContainers(): Observable<IProductContainers[]> {  // Gets all the containers that a product can come in
        return this.http.get<IProductContainers[]>(this.urlService.getProductContainersUrl);
    }

    deleteAllTimeProcessedStock(time: String) {
        return this.http.delete<any>(this.urlService.deleteProcessedStock + time);
    }

    getProcessedStockContainersToDelete(): Observable<IProductContainers[]> {
        return this.http.get<any>(this.urlService.getProcessedStockContainersToDeleteUrl);
    }

    updateProcessedStockContainerDelete(id, updateValue) {
        return this.http.put<any>(this.urlService.updateProcessedStockContainerDeleteUrl + id, updateValue);
    }

    checkConnectionWithDelete() {   // Does a small delete just to see if the connection is available
        return this.http.delete<any>(this.urlService.checkConnectionWithDelete,  { observe: 'response' });
    }

    enterAllProcessedProductsIntoDB(finalArray) {
        return this.http.post<any>(this.urlService.enterAllProcessedProducts, finalArray);
    }

    getStockTimes() {
        return this.http.get<any>(this.urlService.getStockTimes);
    }

}
