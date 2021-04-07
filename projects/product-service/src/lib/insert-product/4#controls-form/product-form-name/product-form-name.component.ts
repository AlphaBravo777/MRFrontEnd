import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
    Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';
import { IItemName, IItemBasic, IItemGroup } from '../../../#shared-services/interfaces/item.interface';
import { IDepartment } from '../../../#shared-services/interfaces/auxiliary';

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

    @Input() itemsBasic: IItemBasic[];
    @Input() departmentGroupings: IDepartment[];

    public identification: FormGroup<IItemName> = new FormGroup<IItemName>(
        {
            itemid: new FormControl(null),
            name: new FormControl('', [Validators.required]),
            itemGroupWithID: new FormArray([]),
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
            this.identification.get('name').setValue(value.itemName);
            this.identification.get('itemid').setValue(value.itemid);
        }

        valueChanged(value) {
            this.identification.get('name').setValue(value.itemName);
            this.identification.get('itemid').setValue(null);
        }
        changeItemName(value) {
            this.identification.get('name').setValue(value);
        }
    }
