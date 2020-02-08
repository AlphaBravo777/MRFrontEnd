import { Injectable } from '@angular/core';
import { IItemBackend } from './interfaces/backend-item.interface';
import { Observable, of } from 'rxjs';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductApiService {

    constructor(private urlService: UrlsService, private http: HttpClient) { }

    insertOrUpdateItem(item: IItemBackend): Observable<any> {
        return this.http.post<any>( this.urlService.mrProductService + 'productModule/insertOrUpdateItem/', item).pipe(
            tap(response => console.log('The kafka response = ', response)),
            map(() => item),
            catchError(error => {
                console.error('The error = ', error);
                return of(item);
            })
        );
    }
}
