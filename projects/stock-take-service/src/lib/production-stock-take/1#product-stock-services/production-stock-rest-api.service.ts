import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UrlsService } from 'src/app/home/core/urls.service';
import { IStockTake } from '../../#shared-services/production-stock.interface';
import { IStockTakeBackend } from '../../#shared-services/stock-take-backend.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductionStockRestApiService {

    constructor(
        private urlService: UrlsService,
        private http: HttpClient) { }

    insertStockTake(stockTake: IStockTakeBackend): Observable<IStockTakeBackend> {
        console.log('This is the stock that will be entered: ', stockTake)
        // return this.http.post<any>(this.urlService.insertStockTake, stockTake).pipe();
        return of()
    }

    
}
