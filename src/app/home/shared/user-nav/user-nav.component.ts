import { Component, OnInit } from '@angular/core';

import { UserNavService } from './user-nav.service';
import { NgxPermissionsService } from 'ngx-permissions';


@Component({
    selector: 'app-user-nav',
    templateUrl: './user-nav.component.html',
    styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

    constructor(private permissionsService: NgxPermissionsService, private _userNav: UserNavService) { }

    private permissions = [];

    ngOnInit() {
        this._userNav.getPermissions().subscribe(groups => {
            for (const key of Object.keys(groups.groups)) {
                this.permissions.push(groups.groups[key].name);
            }
            this.permissionsService.loadPermissions(this.permissions);
            console.log(this.permissions);
        });
    }

}
