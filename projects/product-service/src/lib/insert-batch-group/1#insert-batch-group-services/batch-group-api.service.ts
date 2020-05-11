import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BatchGroupApiService {

    constructor(private urlService: UrlsService, private http: HttpClient) { }

    // private stockUrl = this.urlService.backendUrl + 'office/';
    // private orderServiceUrl = this.urlService.mrOrderService;


}
