import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
    Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';
import { IItemName, IItemGroup, IItemPrice, IItemBasic } from '../../../#shared-services/interfaces/item.interface';
import { IDepartment } from '../../../#shared-services/interfaces/auxiliary';

@Component({
    selector: 'mr-product-product-form-price',
    templateUrl: './product-form-price.component.html',
    styleUrls: ['./product-form-price.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProductFormPriceComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ProductFormPriceComponent),
            multi: true
        }
    ]
})

export class ProductFormPriceComponent implements OnInit, ControlValueAccessor, Validator {

    @Input() itemsBasic: IItemBasic[];

    public pricing: FormGroup<IItemPrice> = new FormGroup<IItemPrice>(
        {
            price: new FormControl(null),
            calculatedPriceItemName: new FormControl(null),
            calculatedPriceItemid: new FormControl(null),
            calculatedPriceModifier: new FormControl(null),
        });

    constructor() { }

    ngOnInit() {
    }

    public onTouched: () => void = () => { };

    writeValue(val: any): void {
        return val && this.pricing.setValue(val, { emitEvent: false });
    }

    registerOnChange(fn: any): void {
        this.pricing.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.pricing.disable() : this.pricing.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this.pricing.valid ? null : { invalidForm: { valid: false, message: 'pricing fields are invalid' } };
    }

    calculatedPriceItemValue(value) {
        this.pricing.get('calculatedPriceItemName').setValue(value.name);
        this.pricing.get('calculatedPriceItemid').setValue(value.itemid);
    }

}
