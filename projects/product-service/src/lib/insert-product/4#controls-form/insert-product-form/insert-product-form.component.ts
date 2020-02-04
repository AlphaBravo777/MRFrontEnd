import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';
import { IItem, IItemBasic } from '../../../#shared-services/interfaces/item';
import { IMeasuringUnit, IPackaging, IItemVendor } from '../../../#shared-services/interfaces/auxiliary';

@Component({
  selector: 'mr-product-insert-product-form',
  templateUrl: './insert-product-form.component.html',
  styleUrls: ['./insert-product-form.component.scss']
})
export class InsertProductFormComponent implements OnInit {

    @Input() itemsBasic: IItemBasic[];
    @Input() measureUnits: IMeasuringUnit[];
    @Input() packagings: IPackaging[];
    @Input() itemVendors: IItemVendor[];

    public mainItemForm: FormGroup<IItem> = new FormGroup<IItem>({
        identification: new FormControl(''),
        pricing: new FormControl(''),
        singleInfo: new FormControl(''),
        size: new FormControl(null),
        buildingBlocks: new FormControl(''),
        vendor: new FormControl(''),
        packaging: new FormControl(''),
    });

    constructor() { }

    ngOnInit() {
    }

    onSubmit() {
        console.log('Val: ', this.mainItemForm.value);
    }

}
