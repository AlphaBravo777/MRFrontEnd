import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
    Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';
import { IItemFormBuildingBlocks, IItemForm, IItemBasic, IItemSize } from '../../../#shared-services/interfaces/item.interface';
import { IMeasuringUnit } from '../../../#shared-services/interfaces/auxiliary';

@Component({
  selector: 'mr-product-product-form-size',
  templateUrl: './product-form-size.component.html',
  styleUrls: ['./product-form-size.component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => ProductFormSizeComponent),
          multi: true
      },
      {
          provide: NG_VALIDATORS,
          useExisting: forwardRef(() => ProductFormSizeComponent),
          multi: true
      }
  ]
})

export class ProductFormSizeComponent implements OnInit, ControlValueAccessor, Validator {

    @Input() measureUnits: IMeasuringUnit[];

    private units: IItemBasic[] = [
        {
            itemid: 1,
            itemName: 'kg'
        },
        {
            itemid: 2,
            itemName: 'roll'
        },
        {
            itemid: 3,
            itemName: 'barrel'
        }
    ];

    public size: FormGroup<IItemSize> = new FormGroup<IItemSize>({
        convertionToMainUnitAmount: new FormControl(null),
        size: new FormControl(null),
        unit:  new FormControl(''),
        unitid:  new FormControl(null),

    });

    constructor() { }

    ngOnInit() {
    }

    public onTouched: () => void = () => { };

    writeValue(val: any): void {
        return val && this.size.setValue(val, { emitEvent: false });
    }

    registerOnChange(fn: any): void {
        this.size.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.size.disable() : this.size.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this.size.valid ? null : { invalidForm: { valid: false, message: 'size fields are invalid' } };
    }

    selection(name: string) {
        this.size.get('unit').setValue(name);
    }

}
