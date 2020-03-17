import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
    Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';
import { IItemFormBuildingBlocks, IItemForm, IItemBasic } from '../../../#shared-services/interfaces/item';

@Component({
  selector: 'mr-product-product-form-building-blocks',
  templateUrl: './product-form-building-blocks.component.html',
  styleUrls: ['./product-form-building-blocks.component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => ProductFormBuildingBlocksComponent),
          multi: true
      },
      {
          provide: NG_VALIDATORS,
          useExisting: forwardRef(() => ProductFormBuildingBlocksComponent),
          multi: true
      }
  ]
})

export class ProductFormBuildingBlocksComponent implements OnInit, ControlValueAccessor, Validator {

    @Input() itemsBasic: IItemBasic[];

    public buildingBlocks: FormArray<IItemFormBuildingBlocks> = new FormArray<IItemFormBuildingBlocks>([]);

    constructor() { }

    ngOnInit() {
    }

    private createBuildingBlock(): FormGroup<IItemFormBuildingBlocks> {
        return new FormGroup<IItemFormBuildingBlocks>({
            buildingblockName: new FormControl(''),
            buildingblockid: new FormControl(null),
            quantity: new FormControl(null)
        });
    }

    public onTouched: () => void = () => { };

    writeValue(val: any): void {
        return val && this.buildingBlocks.setValue(val, { emitEvent: false });
    }

    registerOnChange(fn: any): void {
        this.buildingBlocks.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.buildingBlocks.disable() : this.buildingBlocks.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this.buildingBlocks.valid ? null : { invalidForm: { valid: false, message: 'buildingBlocks fields are invalid' } };
    }

    insertSelectedItem(value: IItemBasic, index: number) {
        const buildingBlocks = <FormArray>this.buildingBlocks;
        buildingBlocks.controls[index].get('buildingblockName').setValue(value.itemName);
        buildingBlocks.controls[index].get('buildingblockid').setValue(value.itemid);
    }

    addItemToBuildingBlocks() {
        this.buildingBlocks.push(this.createBuildingBlock());
    }

    deleteBuildingBlock(index: number) {
        const groups = <FormArray>this.buildingBlocks;
        groups.removeAt(index);
    }

}
