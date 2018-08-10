import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router
  ) { }

  registerUserData = {username: '', password: '', password2: '', email: ''};

  ngOnInit() {
  }

//   registerUser() {
//     this.auth.registerUser(this.registerUserData)
//       .subscribe(
//         res =>  {
//           console.log(res);
//           localStorage.setItem('token', res.token);
//           this.router.navigate(['contact/']);
//         },
//         err => console.log(err)
//       );
//     console.log(this.registerUserData);
//   }

}
