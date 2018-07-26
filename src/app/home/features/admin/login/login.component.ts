import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginUserData = {};

    constructor(private _auth: AuthService,
        private _router: Router
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
                    this._router.navigate(['user/user-nav/']);
                },
                err => console.log(err)
            );
        console.log(this.loginUserData);
    }
}
