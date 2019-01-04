import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IFormControl } from '../form-control-interface';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

    @Input() formControls: IFormControl[] = [];
    @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
    form: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.createGroup();
    }

    createGroup() {
        const group = this.fb.group({});
        this.formControls.forEach(control => group.addControl(control.name, this.createControl(control)));
        return group;
    }

    createControl(config: IFormControl) {
        const { disabled, validation, value } = config;
        return this.fb.control({ disabled, value }, validation);
      }

}
