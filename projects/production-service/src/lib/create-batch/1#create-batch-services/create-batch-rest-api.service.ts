import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SnackBarAlertService } from 'src/app/home/core/alerts/snack-bar-alert-service/snack-bar-alert.service';
import { UrlsService } from 'src/app/home/core/urls.service';
import { IBatchInfoBackend } from '../../#shared-services/interfaces/production.interface';

@Injectable({
    providedIn: 'root'
})
export class CreateBatchRestApiService {

    constructor(
        private urlService: UrlsService,
        private http: HttpClient,
        private snackBarAlertService: SnackBarAlertService) { }

    getBatchesIfExistElseInsert(batchArray: IBatchInfoBackend[]): Observable<IBatchInfoBackend[]> {
        console.log('Backend is running here')
        return this.http.post<any>(this.urlService.getBatchesIfExistElseInsert, batchArray).pipe(
            catchError(error => {
                this.snackBarAlertService.alert(error)
                return of(error)
            })
        );
    }

}
