import { Injectable } from '@angular/core';
import { IAccountBackend } from './interfaces/account-interface';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/app/home/core/urls.service';
import { Observable } from 'apollo-link';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountApiService {

    constructor(private http: HttpClient, private urlService: UrlsService) { }


    submitAccountForm(accountBackend: IAccountBackend) {
        console.log('Backend data is: ', accountBackend);
        return this.http.put<any>(this.urlService.insertOrUpdateAccount, accountBackend).pipe(
            tap(acount => console.log('Returned data = ', acount))
        );
    }

    deleteAccount(accountid: number) {
        console.log('deleting account: ', accountid);
        return this.http.delete<any>(this.urlService.deleteAccount + accountid);
        // return of([]);
    }

}
