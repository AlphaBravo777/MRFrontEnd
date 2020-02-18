import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@ng-stack/forms';
import { IItemForm, IItemBasic, IItemFormString } from '../../../#shared-services/interfaces/item';
import { IMeasuringUnit, IPackaging, IItemVendor, IDepartment } from '../../../#shared-services/interfaces/auxiliary';
import { InsertProductService } from '../../1#insert-product-services/insert-product.service';
import { take } from 'rxjs/operators';

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
    @Input() departmentGroupings: IDepartment[];

    public mainItemForm: FormGroup<IItemFormString> = new FormGroup<IItemFormString>({
        identification: new FormControl(''),
        pricing: new FormControl(''),
        singleInfo: new FormControl(''),
        size: new FormControl(''),
        buildingBlocks: new FormControl(''),
        vendor: new FormControl(''),
        packaging: new FormControl(''),
    });

    constructor(private insertProductService: InsertProductService) { }

    ngOnInit() {
    }

    onSubmit() {
        console.log('Val: ', this.mainItemForm.value);
        const mainItemFormValue: unknown = this.mainItemForm.value;
        this.insertProductService.insertOrUpdateItem(<IItemForm>mainItemFormValue).pipe(
            take(1),
        ).subscribe();
    }

}
