import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../../../../core/urls.service';

@Injectable({
    providedIn: 'root'
})
export class HighRiskApiService {

    constructor(private http: HttpClient, private urlService: UrlsService) { }

    private productsUrl = this.urlService.rootUrl + 'api/products/';

    updateSingleProductAmount(updateValue) {
        const containerUrl = this.productsUrl + 'product/updateSingleAmount/';
        return this.http.post<any>(containerUrl, updateValue);
    }


}
