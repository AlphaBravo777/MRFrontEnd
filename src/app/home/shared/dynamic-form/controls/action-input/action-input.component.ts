import { Component, OnInit } from '@angular/core';
import { IFormControl } from '../../dynamic-form-services/form-control-interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-action-input',
  templateUrl: './action-input.component.html',
  styleUrls: ['./action-input.component.scss']
})
export class ActionInputComponent implements OnInit {

    // This control is an input that triggers and action everytime the value changes, or a user presses a key
    // The value is given back to the parent component, that changes the "options" input to the form with a new value

    config: IFormControl;
    group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
