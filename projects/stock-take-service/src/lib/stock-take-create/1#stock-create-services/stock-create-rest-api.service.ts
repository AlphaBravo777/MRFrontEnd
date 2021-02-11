import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlsService } from 'src/app/home/core/urls.service';
import { IStockTakeInstanceBackend } from '../../#shared-services/stock-take-backend.interface';

@Injectable({
    providedIn: 'root'
})
export class StockCreateRestApiService {

    constructor(
        private urlService: UrlsService,
        private http: HttpClient) { }

    insertStockTakeInstance(stockTakeInstance: IStockTakeInstanceBackend): Observable<IStockTakeInstanceBackend> {
        console.log('The stockTakeInstance that will be inserted = ', stockTakeInstance);
        return this.http.post<any>(this.urlService.insertStockTakeInstance, stockTakeInstance).pipe();
    }

    deleteStockTakeInstance(stockTakeInstance: IStockTakeInstanceBackend): Observable<any> {
        console.log('The stockTakeInstance that will be deleted = ', stockTakeInstance);
        return this.http.delete<any>(this.urlService.deleteStockTakeInstance + stockTakeInstance.id).pipe();
    }
}
