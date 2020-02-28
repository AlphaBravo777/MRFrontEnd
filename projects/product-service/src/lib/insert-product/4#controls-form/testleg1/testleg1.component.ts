import { Component, OnInit, forwardRef } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
     Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';

export interface Test1 {
    fname: string;
    email: string;
    num: number;
}

@Component({
    selector: 'mr-product-testleg1',
    templateUrl: './testleg1.component.html',
    styleUrls: ['./testleg1.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Testleg1Component),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => Testleg1Component),
            multi: true
        }
    ]
})
export class Testleg1Component implements OnInit, ControlValueAccessor, Validator {

    public basicInfoForm: FormGroup<Test1> = new FormGroup<Test1> (
        {
            fname: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
        });


    constructor() { }

    ngOnInit() {
    }

    public onTouched: () => void = () => { };

    writeValue(val: any): void {
        return val && this.basicInfoForm.setValue(val, { emitEvent: false });
        // this.basicInfoForm.setValue(val, { emitEvent: false });
    }

    registerOnChange(fn: any): void {
        console.log('on change');
        this.basicInfoForm.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        console.log('on blur');
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.basicInfoForm.disable() : this.basicInfoForm.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        console.log('Basic Info validation', c);
        return this.basicInfoForm.valid ? null : { invalidForm: { valid: false, message: 'basicInfoForm fields are invalid' } };
    }
}
