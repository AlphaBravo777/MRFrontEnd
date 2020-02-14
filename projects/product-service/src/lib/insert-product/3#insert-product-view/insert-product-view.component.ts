import { Component, OnInit, Input } from '@angular/core';
import { IItemBasic } from '../../#shared-services/interfaces/item';
import { IMeasuringUnit, IPackaging, IItemVendor, IDepartment } from '../../#shared-services/interfaces/auxiliary';

@Component({
    selector: 'mr-product-insert-product-view',
    templateUrl: './insert-product-view.component.html',
    styleUrls: ['./insert-product-view.component.scss']
})
export class InsertProductViewComponent implements OnInit {

    @Input() itemsBasic: IItemBasic[];
    @Input() measureUnits: IMeasuringUnit[];
    @Input() packagings: IPackaging[];
    @Input() itemVendors: IItemVendor[];
    @Input() departmentGroupings: IDepartment[];

    constructor() { }

    ngOnInit() {
    }

}
