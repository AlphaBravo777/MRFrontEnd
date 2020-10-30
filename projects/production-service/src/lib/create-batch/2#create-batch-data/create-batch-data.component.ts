import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray } from '@ng-stack/forms';
import { IStockTakeAmountPerBatch } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { IBatchInfo } from '../../#shared-services/production.interface';
import { CreateBatchData$Service } from '../1#create-batch-services/create-batch-data$.service';
import { CreateBatchFormService } from '../1#create-batch-services/create-batch-form.service';
import { CreateBatchService } from '../1#create-batch-services/create-batch.service';

@Component({
    selector: 'lib-create-batch-data',
    templateUrl: './create-batch-data.component.html',
    styleUrls: ['./create-batch-data.component.scss']
})
export class CreateBatchDataComponent implements OnInit, OnDestroy {

    /*
    Create form where you can add many batches, then when you insert them, then you try and insert all of them
    Also, then you get the return data, with the ids (if there was already such a batch then you just return its data with the id)
    Then add the return data to a data store
    Then you check if there is a formArray that was passed in with the component
    If there is, then you add all the batches in the data store to the control
    After pressing the submit button, you have to insert the batches as well as check if there was a formControl that came with the batches, and if there was, then you have to add them (with there ids, to the formcontrol as well)
    */
    batchFormArray: FormArray<IBatchInfo>;
    subscription: Subscription;
    stockBatchesFormArray: FormArray<IBatchInfo>;

    constructor(
        private createBatchFormService: CreateBatchFormService,
        private createBatchService: CreateBatchService,
        private createBatchData$Service: CreateBatchData$Service) { }

    ngOnInit(): void {
        this.createBatchFormArray();
    }

    createBatchFormArray() {
        this.batchFormArray = this.createBatchFormService.createBatchFormArray()
    }

    addBatchToArray() {
        this.createBatchFormService.addBatchToArray()
    }

    onSubmit() {
        this.createBatchService.insertBatches(this.batchFormArray.value).pipe(
            take(1),
            tap(data => console.log('Return batch data = ', data)),
            tap(data => this.createBatchData$Service.setStockBatchesFormArray(data))
        ).subscribe()
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}
