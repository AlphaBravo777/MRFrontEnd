import { Injectable } from '@angular/core';

import { UrlsService } from '../../../core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IRawProcessedStock, IProductContainers, IProductDetailsStockDepricated } from './Stock';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockAPIService {

    constructor(private http: HttpClient, private urlService: UrlsService) { }

    workingProcStock = 'workingProcStock';
    emptyStockAndContainers = 'emptyStockAndContainers';

    getProducts(): Observable<IProductDetailsStockDepricated[]> {     // Gets all the meatrite products that are active
        // return this.http.get<IProductDetailsStockDepricated[]>(this.urlService.allActiveProducts);
        return of([])
    }

    getTimedStock(time: String): Observable<IRawProcessedStock[]> { // Gets all the stock values for a specific time
        return of([])
        // return this.http.get<IRawProcessedStock[]>(this.urlService.getAllStockForSpecificTime + time + '/');
    }

    getProductContainers(): Observable<IProductContainers[]> {  // Gets all the containers that a product can come in
        // return this.http.get<IProductContainers[]>(this.urlService.getProductContainersUrl);
        return of([])
    }

    deleteAllTimeProcessedStock(time: String) {
        // return this.http.delete<any>(this.urlService.deleteProcessedStock + time);
        return of([])
    }

    getProcessedStockContainersToDelete(): Observable<IProductContainers[]> {
        // return this.http.get<any>(this.urlService.getProcessedStockContainersToDeleteUrl);
        return of([])
    }

    updateProcessedStockContainerDelete(id, updateValue) {
        // return this.http.put<any>(this.urlService.updateProcessedStockContainerDeleteUrl + id, updateValue);
        return of([])
    }

    checkConnectionWithDelete() {   // Does a small delete just to see if the connection is available
        // return this.http.delete<any>(this.urlService.checkConnectionWithDelete,  { observe: 'response' });
        return of([])
    }

    enterAllProcessedProductsIntoDB(finalArray) {
        // return this.http.post<any>(this.urlService.enterAllProcessedProducts, finalArray);
        return of([])
    }

    getStockTimes() {
        return this.http.get<any>(this.urlService.getStockTimes);
    }

}
