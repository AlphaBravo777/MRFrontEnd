import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormField, IFormControlBuilder } from '../../dynamic-form-services/dynamic-form.interface';

@Component({
  selector: 'lib-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements IFormField {

    config: IFormControlBuilder;
    group: FormGroup;

}
