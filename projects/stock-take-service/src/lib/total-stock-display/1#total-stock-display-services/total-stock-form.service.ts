import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@ng-stack/forms';
import { IContainerInfoHash } from 'projects/production-service/src/lib/#shared-services/production.interface';
import { ITotalStockGroupedByBatches } from '../../#shared-services/total-stock.interface';

@Injectable({
    providedIn: 'root'
})
export class TotalStockFormService {

    private totalStockForm: FormArray<ITotalStockGroupedByBatches>

    constructor() { }

    createTotalStockFormAPI(totalStockBatchGroupData: ITotalStockGroupedByBatches[], containersHash: IContainerInfoHash): FormArray<ITotalStockGroupedByBatches> {

        if (!totalStockBatchGroupData || !containersHash) return null

        this.createTotalStockForm(totalStockBatchGroupData, containersHash)
        return this.totalStockForm
    }

    createTotalStockForm(totalStockBatchGroupData: ITotalStockGroupedByBatches[], containersHash: IContainerInfoHash) {
        this.totalStockForm = new FormArray<ITotalStockGroupedByBatches>([])
    }

}
