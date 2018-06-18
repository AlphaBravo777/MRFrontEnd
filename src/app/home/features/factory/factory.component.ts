import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-factory',
    templateUrl: './factory.component.html',
    styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {

    title = 'app';

    constructor(private permissionsService: NgxPermissionsService,
        private http: HttpClient) { }

    ngOnInit(): void {
        const perm = ['EDITOR'];

        this.permissionsService.loadPermissions(perm);

        // this.http.get('url').subscribe((permissions) => {
        //    // const perm = ["ADMIN", "EDITOR"]; example of permissions
        //    this.permissionsService.loadPermissions(permissions);
        // });
    }

}
