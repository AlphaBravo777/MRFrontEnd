import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormField, IFormControlBuilder } from '../../dynamic-form-services/dynamic-form.interface';

@Component({
  selector: 'lib-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements IFormField {

    config: IFormControlBuilder;
    group: FormGroup;

}
