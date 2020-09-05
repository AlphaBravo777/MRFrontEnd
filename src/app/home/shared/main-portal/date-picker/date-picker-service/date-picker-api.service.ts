import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlsService } from 'src/app/home/core/urls.service';
import { IDate, IDateTime, IDateShift, ITimeStampBackend, returnTimeStampBackendFromDatePackage_factory } from './date-interface';

@Injectable({
  providedIn: 'root'
})
export class DatePickerApiService {

    constructor(
        private http: HttpClient,
        private urlService: UrlsService,
    ) { }

    createTimeStampID(timePackage: IDate): Observable<any> {
        return this.http.post<any>(this.urlService.getTimeStampIDUrl, timePackage);
    }

    getStockTimes(): Observable<IDateTime[]> {
        return this.http.get<IDateTime[]>(this.urlService.getStockTimes);
    }

    getOrCreateTimeStampid(datePackage: IDate): Observable<ITimeStampBackend> {
        return this.http.post<ITimeStampBackend>(this.urlService.getTimeStampidOrCreateNew, returnTimeStampBackendFromDatePackage_factory(datePackage));
    }









}
