import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControl } from '../../containers/form-control-interface';

@Component({
    selector: 'app-form-select',
    templateUrl: './form-select.component.html',
    styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {

    config: IFormControl;
    group: FormGroup;

    constructor() { }

    ngOnInit() {
    }

}
