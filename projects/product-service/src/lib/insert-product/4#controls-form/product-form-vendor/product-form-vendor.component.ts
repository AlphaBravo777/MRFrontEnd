import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
    Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';
import { IItemBasic } from '../../../#shared-services/interfaces/item';
import { IItemVendor } from '../../../#shared-services/interfaces/auxiliary';

@Component({
  selector: 'mr-product-product-form-vendor',
  templateUrl: './product-form-vendor.component.html',
  styleUrls: ['./product-form-vendor.component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => ProductFormVendorComponent),
          multi: true
      },
      {
          provide: NG_VALIDATORS,
          useExisting: forwardRef(() => ProductFormVendorComponent),
          multi: true
      }
  ]
})
export class ProductFormVendorComponent implements OnInit, ControlValueAccessor, Validator {

    @Input() itemVendors: IItemVendor[];

    // private vendors: IItemBasic[] = [
    //     {
    //         itemid: 1,
    //         itemName: 'Meatrite'
    //     },
    //     {
    //         itemid: 2,
    //         itemName: 'Vendor'
    //     },
    //     {
    //         itemid: 3,
    //         itemName: 'PnP'
    //     }
    // ];

    public vendor: FormGroup<IItemVendor> = new FormGroup<IItemVendor>({
        vendor: new FormControl(null),
        vendorid: new FormControl(null),
    });

    constructor() { }

    ngOnInit() {
    }

    public onTouched: () => void = () => { };

    writeValue(val: any): void {
        return val && this.vendor.setValue(val, { emitEvent: false });
    }

    registerOnChange(fn: any): void {
        this.vendor.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.vendor.disable() : this.vendor.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this.vendor.valid ? null : { invalidForm: { valid: false, message: 'packaging fields are invalid' } };
    }

    selection(name: string) {
        this.vendor.get('vendor').setValue(name);
    }

}
