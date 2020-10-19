import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@ng-stack/forms';
import { IBatchInfo } from '../../#shared-services/production.interface';

@Component({
    selector: 'lib-create-batch-view',
    templateUrl: './create-batch-view.component.html',
    styleUrls: ['./create-batch-view.component.scss']
})
export class CreateBatchViewComponent implements OnInit {

    @Input() batchFormArray: FormArray<IBatchInfo>

    constructor() { }

    ngOnInit(): void {

    }

}
