import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControl } from '../../dynamic-form-services/form-control-interface';

@Component({
    selector: 'app-form-input',
    templateUrl: './form-input.component.html',
    styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

    config: IFormControl;
    group: FormGroup;

    constructor() { }

    ngOnInit() {
    }

}
