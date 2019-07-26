import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IFormControl, IFormControlData } from '../../dynamic-form-services/form-control-interface';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
    @Input() formControls: IFormControl[] = [];
    @Input() options: IFormControlData[] = [];
    @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.createGroup();
        this.insertFormControlOptions();
    }

    createGroup() {
        const group = this.fb.group({});
        this.formControls.forEach(control =>
            group.addControl(control.name, this.createControl(control))
        );
        return group;
    }

    createControl(config: IFormControl) {
        const { disabled, validation, value } = config;
        return this.fb.control({ disabled, value }, validation);
    }

    insertFormControlOptions() {
        this.options.forEach(option => {
            this.formControls.forEach(control => {
                if (option.controlName === control.name) {
                    control.options = option.data;
                }
            });
        });
    }
}
