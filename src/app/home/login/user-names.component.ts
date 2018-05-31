import { Component, OnInit } from '@angular/core';
import { UserdataService } from './userdata.service';

@Component({
  selector: 'app-user-names',
  templateUrl: './user-names.component.html',
  styleUrls: ['./user-names.component.css']
})
export class UserNamesComponent implements OnInit {

  constructor(private _userData: UserdataService) { }

  user = [];

  ngOnInit() {
    this._userData.getUsers()
      .subscribe(
        res =>  this.user = res,
        err => console.log(err)
      );
  }

}
