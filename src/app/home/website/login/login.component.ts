import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/admin/admin-services/auth.service';
import { DialogBoxService } from '../../core/dialog-box/dialog-box.service';
import { Subscription } from 'rxjs';
import { IUser, userBackendFactory } from '../../features/admin/admin-services/user.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginUserData: IUser = {username: '', password: '', email: '', firstName: '', id: null, lastName: ''};
    subscription: Subscription;

    constructor(
        private auth: AuthService,
        private router: Router,
        private dialogBoxService: DialogBoxService,
    ) { }

    ngOnInit() {
        this.auth.logout();
    }

    loginUser() {
        this.subscription = this.auth.loginUser(this.loginUserData)
            .subscribe(
                res => {
                    console.log('The return information = ', res);
                    localStorage.setItem('token', res.token);
                    if (res.user.id) { // Depends on which authentication backend you are using
                        localStorage.setItem('userID', res.user.id);
                    } else {
                        localStorage.setItem('userID', res.user.pk);
                    }
                    this.router.navigate(['main/landing-page/entry/menu']);
                },
                err => {
                    console.log(err);
                    this.dialogBoxService.passwordNotCorrect();
                }
            );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
