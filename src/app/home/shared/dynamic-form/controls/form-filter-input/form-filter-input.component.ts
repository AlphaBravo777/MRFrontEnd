import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControl, IFormSelectControl } from '../../dynamic-form-services/form-control-interface';

@Component({
    selector: 'app-form-filter-input',
    templateUrl: './form-filter-input.component.html',
    styleUrls: ['./form-filter-input.component.scss']
})
export class FormFilterInputComponent implements OnInit {

    config: IFormControl;
    group: FormGroup;
    filteredFields = [];
    selection: IFormSelectControl = {name: null, optionID: null, optionid: null};

    constructor() { }

    ngOnInit() {
    }

    keyPressed(val) {
        if (val === '') {
            this.filteredFields = [];
            this.group.get(this.config.name).setValue(null);
        } else {
            this.filteredFields = [... this.config.options.filter(item => item.name.toLowerCase().includes(val.toLowerCase()))];
        }
    }

    itemSelected(value: IFormSelectControl) {
        const newValue = Object.assign({}, value);
        this.selection = newValue;
        this.group.get(this.config.name).setValue(value.optionid);
        this.filteredFields = [];
    }
}
