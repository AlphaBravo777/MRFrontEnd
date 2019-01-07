import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControl } from '../../dynamic-form-services/form-control-interface';

@Component({
    selector: 'app-form-button',
    templateUrl: './form-button.component.html',
    styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit {

    config: IFormControl;
    group: FormGroup;

    constructor() { }

    ngOnInit() {
    }

}
