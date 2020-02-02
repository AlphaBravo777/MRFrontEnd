import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';
import { IItem } from '../../../#shared-services/interfaces/item';

@Component({
  selector: 'mr-product-insert-product-form',
  templateUrl: './insert-product-form.component.html',
  styleUrls: ['./insert-product-form.component.scss']
})
export class InsertProductFormComponent implements OnInit {

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
