import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
    Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl } from '@ng-stack/forms';
import { IPackaging } from '../../../#shared-services/interfaces/auxiliary';

@Component({
  selector: 'mr-product-product-form-packaging',
  templateUrl: './product-form-packaging.component.html',
  styleUrls: ['./product-form-packaging.component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => ProductFormPackagingComponent),
          multi: true
      },
      {
          provide: NG_VALIDATORS,
          useExisting: forwardRef(() => ProductFormPackagingComponent),
          multi: true
      }
  ]
})

export class ProductFormPackagingComponent implements OnInit, ControlValueAccessor, Validator {

    @Input() packagings: IPackaging[];

    public packaging: FormGroup<IPackaging> = new FormGroup<IPackaging>({
        packaging: new FormControl(null),
        packagingid: new FormControl(null),
        weight: new FormControl(null),
    });

    constructor() { }

    ngOnInit() {
    }

    public onTouched: () => void = () => { };

    writeValue(val: any): void {
        return val && this.packaging.setValue(val, { emitEvent: false });
    }

    registerOnChange(fn: any): void {
        this.packaging.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.packaging.disable() : this.packaging.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this.packaging.valid ? null : { invalidForm: { valid: false, message: 'packaging fields are invalid' } };
    }

    selection(name: string) {
        this.packaging.get('packaging').setValue(name);
    }

}
