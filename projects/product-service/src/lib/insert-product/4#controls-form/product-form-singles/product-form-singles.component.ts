import { Component, OnInit, forwardRef, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
    Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl } from '@ng-stack/forms';
import { IItemSingleInfo } from '../../../#shared-services/interfaces/item';

@Component({
    selector: 'mr-product-product-form-singles',
    templateUrl: './product-form-singles.component.html',
    styleUrls: ['./product-form-singles.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProductFormSinglesComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ProductFormSinglesComponent),
            multi: true
        }
    ]
})

export class ProductFormSinglesComponent implements OnInit, ControlValueAccessor, Validator, AfterViewInit {

    @Input() runComponent;

    public singleInfo: FormGroup<IItemSingleInfo> = new FormGroup<IItemSingleInfo>(
        {
            active: new FormControl(true),
        });

    constructor(private ref: ChangeDetectorRef) { }

    ngOnInit() {
    }

    public onTouched: () => void = () => { };

    writeValue(val: any): void {
        return val && this.singleInfo.setValue(val, { emitEvent: true });
    }

    registerOnChange(fn: any): void {
        this.singleInfo.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.singleInfo.disable() : this.singleInfo.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        console.log('Basic Info validation', c);
        return this.singleInfo.valid ? null : { invalidForm: { valid: false, message: 'singleInfo fields are invalid' } };
    }

    ngAfterViewInit() {
        // this.ref.detectChanges();
        this.singleInfo.get('active').setValue(true);
    }

}
