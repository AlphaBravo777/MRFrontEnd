import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../admin-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router ) { }

  registerUserData = {username: '', password1: '', password2: '', email: ''};
  registered = false;
  buttonTitle = 'Create User';
  errorMessage;

  ngOnInit() {
  }

  registerUser() {
    this.auth.registerUser(this.registerUserData)
      .subscribe(
        res =>  {
          console.log(res);
          this.registered = true;
          this.buttonTitle = 'User Created';
        //   localStorage.setItem('token', res.token);
        //   this.router.navigate(['contact/']);
        },
        err => {
            console.log(err);
            this.buttonTitle = 'User not created';
            this.errorMessage = err.error;
        }
      );
    console.log(this.registerUserData);
  }

}
