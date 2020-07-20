import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicFormService } from '../dynamic-form-services/dynamic-form.service';
import { tap } from 'rxjs/operators';
import { IFormControlBuilder } from '../dynamic-form-services/dynamic-form.interface';

@Component({
    selector: 'lib-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {

    @Input() formName: string;

    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;
    config: IFormControlBuilder[] = [];

    get controls() { return this.config.filter(({ control }) => control !== 'button'); }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }

    constructor(private fb: FormBuilder, private dynamicFormService: DynamicFormService) { }

    ngOnInit() {
        this.dynamicFormService.getForm(this.formName).pipe(
            tap(formData => this.config = formData.formBuilder),
            tap(() => console.log('Form created with', this.config)),
            tap(() => this.form = this.createGroup()),

        ).subscribe();
    }

    ngOnChanges() {
        if (this.form) {
            const controls = Object.keys(this.form.controls);
            const configControls = this.controls.map((item) => item.formControlName);

            controls
                .filter((control) => !configControls.includes(control))
                .forEach((control) => this.form.removeControl(control));

            configControls
                .filter((control) => !controls.includes(control))
                .forEach((formControlName) => {
                    const config = this.config.find((control) => control.formControlName === formControlName);
                    this.form.addControl(formControlName, this.createControl(config));
                });

        }
    }

    createGroup() {
        const group = this.fb.group({});
        this.controls.forEach(control => group.addControl(control.formControlName, this.createControl(control)));
        return group;
    }

    createControl(config: IFormControlBuilder) {
        const { disabled, validation, value } = config;
        return this.fb.control({ disabled, value }, validation);
    }

    handleSubmit(event: Event) {
        console.log('Submitting inside the form');
        event.preventDefault();
        event.stopPropagation();
        this.submitForm.emit(this.value);
    }

    setDisabled(formControlName: string, disable: boolean) {
        if (this.form.controls[formControlName]) {
            const method = disable ? 'disable' : 'enable';
            this.form.controls[formControlName][method]();
            return;
        }

        this.config = this.config.map((item) => {
            if (item.formControlName === formControlName) {
                item.disabled = disable;
            }
            return item;
        });
    }

    setValue(formControlName: string, value: any) {
        this.form.controls[formControlName].setValue(value, { emitEvent: true });
    }

}
