import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserNavService } from 'src/app/home/shared/main-portal/user-nav.service';

@Component({
    selector: 'app-admin-office-menu',
    templateUrl: './admin-office-menu.component.html',
    styleUrls: ['./admin-office-menu.component.scss']
})
export class AdminOfficeMenuComponent implements OnInit {

    private permissions: string[] = [];

    constructor(private permissionsService: NgxPermissionsService, private userNav: UserNavService) { }

    ngOnInit() {
        this.userNav.getPermissions().subscribe(groups => {
            for (const key of Object.keys(groups.groups)) {
                this.permissions.push(groups.groups[key].name);
            }
            this.permissionsService.loadPermissions(this.permissions);
        });
    }

}
