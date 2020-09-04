import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

@Injectable({
    providedIn: 'root'
})
export class ViewSpecificOrderApiService {

    constructor(private urlService: UrlsService, private http: HttpClient) { }

    refreshWeeklyOrdersCache(datePackage: IDate): Observable<any> {
        return this.http.post<any>(this.urlService.refreshWeeklyOrdersCacheUrl, datePackage).pipe(
        );
    }

}
