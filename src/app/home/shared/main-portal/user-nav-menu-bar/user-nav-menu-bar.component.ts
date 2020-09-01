import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserNavService } from '../user-nav.service';

@Component({
    selector: 'app-user-nav-menu-bar',
    templateUrl: './user-nav-menu-bar.component.html',
    styleUrls: ['./user-nav-menu-bar.component.scss']
})
export class UserNavMenuBarComponent implements OnInit {

    private permissions = [];

    constructor(private permissionsService: NgxPermissionsService, private userNav: UserNavService) { }

    ngOnInit() {
        this.userNav.getPermissions().subscribe(groups => {
            for (const key of Object.keys(groups.groups)) {
                this.permissions.push(groups.groups[key].name);
            }
            this.permissionsService.loadPermissions(this.permissions);
            // console.log(this.permissions);
        });
    }

}
