import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormField, IFormControlBuilder } from '../../dynamic-form-services/dynamic-form.interface';

@Component({
  selector: 'lib-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements IFormField {

    config: IFormControlBuilder;
    group: FormGroup;

}
