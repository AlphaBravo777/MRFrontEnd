import { Component, OnInit, forwardRef } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
    Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';
import { IItemName, IItemBasic } from '../../../#shared-services/interfaces/item';

@Component({
    selector: 'mr-product-product-form-name',
    templateUrl: './product-form-name.component.html',
    styleUrls: ['./product-form-name.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProductFormNameComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ProductFormNameComponent),
            multi: true
        }
    ]
})

export class ProductFormNameComponent implements OnInit, ControlValueAccessor, Validator {

    private items: IItemBasic[] = [
        {
            itemid: 123,
            itemName: 'Chicken Vienna Alpha'
        },
        {
            itemid: 124,
            itemName: 'Skaap Bout Alpha'
        },
        {
            itemid: 125,
            itemName: 'SV Emultion Alpha'
        }
    ];

    public identification: FormGroup<IItemName> = new FormGroup<IItemName>(
        {
            itemid: new FormControl(null),
            name: new FormControl('', [Validators.required]),
            itemGroupWithID: new FormControl('', [Validators.required]),
        });

        constructor() { }

        ngOnInit() {
        }

        public onTouched: () => void = () => { };

        writeValue(val: any): void {
            return val && this.identification.setValue(val, { emitEvent: false });
        }

        registerOnChange(fn: any): void {
            this.identification.valueChanges.subscribe(fn);
        }

        registerOnTouched(fn: any): void {
            this.onTouched = fn;
        }

        setDisabledState?(isDisabled: boolean): void {
            isDisabled ? this.identification.disable() : this.identification.enable();
        }

        validate(c: AbstractControl): ValidationErrors | null {
            return this.identification.valid ? null : { invalidForm: { valid: false, message: 'identification fields are invalid' } };
        }

        insertSelectedItem(value: IItemBasic) {
            console.log('Triggered');
            this.identification.get('name').setValue(value.itemName);
            this.identification.get('itemid').setValue(value.itemid);
        }

        valueChanged(value) {
            console.log('Triggered 2');
            this.identification.get('name').setValue(value);
            this.identification.get('itemid').setValue(null);
        }
    }
