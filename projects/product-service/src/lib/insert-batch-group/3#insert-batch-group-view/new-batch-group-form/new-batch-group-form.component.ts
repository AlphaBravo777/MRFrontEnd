import { Component, OnInit } from '@angular/core';
import { BatchGroupFormService } from '../../1#insert-batch-group-services/batch-group-form.service';
import { IBatchGroupFrontEnd, IBatchColor } from '../../1#insert-batch-group-services/batch-group-interface';
import { FormGroup } from '@ng-stack/forms';
import { BatchGroupService } from '../../1#insert-batch-group-services/batch-group.service';
import { take, tap } from 'rxjs/operators';

@Component({
    selector: 'mr-product-new-batch-group-form',
    templateUrl: './new-batch-group-form.component.html',
    styleUrls: ['./new-batch-group-form.component.scss']
})
export class NewBatchGroupFormComponent implements OnInit {

    batchGroupForm: FormGroup<IBatchGroupFrontEnd>;
    batchColors: IBatchColor[];

    constructor(
        private batchGroupFormService: BatchGroupFormService,
        private batchGroupService: BatchGroupService) {}

    ngOnInit() {
        this.batchGroupService.getAllBatchColors().pipe(
            take(1),
            tap(batchColors => this.batchColors = batchColors)
        ).subscribe();
        this.batchGroupForm = this.batchGroupFormService.createBatchGroupForm();
    }

    submitForm() {
        console.log('Form will be submitted');
    }

    colorSelection() {

    }

}
