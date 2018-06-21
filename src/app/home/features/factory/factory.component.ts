import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';

import { UrlsService } from '../../core/urls.service';



@Component({
    selector: 'app-factory',
    templateUrl: './factory.component.html',
    styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {

    constructor(private permissionsService: NgxPermissionsService,
        private http: HttpClient,
        private _urlService: UrlsService) { }

    private test = this._urlService.rootUrl + 'api/test/';
    private data = [];

    ngOnInit(): void {
        // const perm = ['EDITOR'];

        // this.permissionsService.loadPermissions(perm);

        this.http.get<any>(this.test).subscribe((groups) => {
             for (const key of Object.keys(groups.groups)) {
                 // console.log(this.data[0][key].name);
                 this.data.push(groups.groups[key].name);
               }
            this.permissionsService.loadPermissions(this.data);
            console.log(this.data);
        });


        // this.http.get('url').subscribe((permissions) => {
        //    // const perm = ["ADMIN", "EDITOR"]; example of permissions
        //    this.permissionsService.loadPermissions(permissions);
        // });
    }

}
