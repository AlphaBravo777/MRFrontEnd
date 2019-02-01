import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../../core/urls.service';

@Injectable({
    providedIn: 'root'
})
export class UserNavService {

    constructor(private http: HttpClient, private _urlService: UrlsService) { }

    private permissions = this._urlService.backendUrl + 'api/test/';

    getPermissions() {
        return this.http.get<any>(this.permissions);
    }

}
