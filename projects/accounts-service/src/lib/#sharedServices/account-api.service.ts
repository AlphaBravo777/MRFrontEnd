import { Injectable } from '@angular/core';
import { IAccountBackend } from './interfaces/account-interface';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/app/home/core/urls.service';
import { Observable } from 'apollo-link';

@Injectable({
    providedIn: 'root'
})
export class AccountApiService {

    constructor(private http: HttpClient, private urlService: UrlsService) { }

    private accountServiceUrl = this.urlService.mrAccountService;

    submitAccountForm(accountBackend: IAccountBackend) {
        console.log('Backend data is: ', accountBackend);
        return this.http.post<any>(this.accountServiceUrl + 'orders/insertNewOrderDetails/', accountBackend).pipe();
    }

}
