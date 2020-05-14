import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@ng-stack/forms';
import { IBatchGroupFrontEnd } from './batch-group-interface';

@Injectable({
    providedIn: 'root'
})
export class BatchGroupFormService {

    batchGroupForm: FormGroup<IBatchGroupFrontEnd>;

    constructor() { }

    createBatchGroupForm(): FormGroup<IBatchGroupFrontEnd> {
        this.batchGroupForm = new FormGroup<IBatchGroupFrontEnd>({
            batchGroupid: new FormControl(null),
            batchName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            ranking: new FormControl(null, [Validators.required]),
            packingListRanking: new FormControl(null),
            batchColorid: new FormControl(null),
            colorCode: new FormControl(null),
            colorItemDescription: new FormControl(null),
        });
        return this.batchGroupForm;
    }
}
