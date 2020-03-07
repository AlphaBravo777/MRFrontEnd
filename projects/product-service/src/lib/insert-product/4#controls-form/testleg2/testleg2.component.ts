import { Component, OnInit, forwardRef } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
    Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';

export interface Test1 {
    addressLine: string;
    areacode: number;
}

@Component({
    selector: 'mr-product-testleg2',
    templateUrl: './testleg2.component.html',
    styleUrls: ['./testleg2.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Testleg2Component),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => Testleg2Component),
            multi: true
        }
    ]
})

export class Testleg2Component implements OnInit, ControlValueAccessor, Validator {

    public addressForm: FormGroup<Test1> = new FormGroup<Test1> ({
        addressLine: new FormControl('', [Validators.required]),
        areacode: new FormControl(null, [Validators.required, Validators.maxLength(5)])
    });
    constructor() { }

    ngOnInit() {
    }

    public onTouched: () => void = () => { };

    writeValue(val: any): void {
        return val && this.addressForm.setValue(val, { emitEvent: false });
    }
    registerOnChange(fn: any): void {
        console.log('on change');
        this.addressForm.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn: any): void {
        console.log('on blur');
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.addressForm.disable() : this.addressForm.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        console.log('Address validation');
        return this.addressForm.valid ? null : { invalidForm: { valid: false, message: 'Address fields are invalid' } };
    }
}
