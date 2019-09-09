import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/admin/admin-services/auth.service';
import { DialogBoxService } from '../../core/dialog-box/dialog-box.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginUserData = {username: '', password: ''};

    constructor(
        private _auth: AuthService,
        private _router: Router,
        private dialogBoxService: DialogBoxService
    ) { }

    ngOnInit() {
        this._auth.logout();
    }

    loginUser() {
        this._auth.loginUser(this.loginUserData)
            .subscribe(
                res => {
                    console.log(res);
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('userID', res.user.pk);
                    console.log(' ************** Here is the user ID: ', res.user.pk);
                    // this._router.navigate(['main/admin-office/daily-report/report-read']);
                    this._router.navigate(['main/landing-page/entry/menu']);
                    // this._router.navigate(['user/user-nav/']);
                },
                err => {
                    console.log(err);
                    this.dialogBoxService.passwordNotCorrect();
                }
            );
        // console.log(this.loginUserData);
    }
}
