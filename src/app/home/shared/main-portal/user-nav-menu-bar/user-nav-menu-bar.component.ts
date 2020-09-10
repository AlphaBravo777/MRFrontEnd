import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserNavService } from '../user-nav.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-user-nav-menu-bar',
    templateUrl: './user-nav-menu-bar.component.html',
    styleUrls: ['./user-nav-menu-bar.component.scss']
})
export class UserNavMenuBarComponent implements OnInit, OnDestroy {

    private permissions = [];
    subscription: Subscription;

    constructor(private permissionsService: NgxPermissionsService, private userNav: UserNavService) { }

    ngOnInit() {
        this.subscription = this.userNav.getPermissions().subscribe(groups => {
            for (const key of Object.keys(groups.groups)) {
                this.permissions.push(groups.groups[key].name);
            }
            this.permissionsService.loadPermissions(this.permissions);
            // console.log(this.permissions);
        });
    }

    redirectToAdminBackendPortal() {
        // TODO Here we would need to use httpIntercept to add the Authentication header so that we can set the backend to authenticate
        // At the moment the backend allows anyone
        (window as any).open(environment.root + environment.mrGatewayService + environment.adminUrl, "_blank");
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }


}
