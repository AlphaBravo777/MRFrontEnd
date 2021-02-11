import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@ng-stack/forms';
import { IContainerInfoHash } from 'projects/production-service/src/lib/#shared-services/production.interface';
import { ITotalStockGroupedByBatches } from '../../#shared-services/total-stock.interface';

@Component({
    selector: 'stock-total-stock-display-view',
    templateUrl: './total-stock-display-view.component.html',
    styleUrls: ['./total-stock-display-view.component.scss']
})
export class TotalStockDisplayViewComponent implements OnInit {

    @Input() totalStockForm: FormArray<ITotalStockGroupedByBatches>
    @Input() containerHash: IContainerInfoHash
    containersAmount: number;

    constructor() { }

    ngOnInit(): void {
        this.containersAmount = Object.keys(this.containerHash).length
    }

    onSubmit() {
        
    }

}
