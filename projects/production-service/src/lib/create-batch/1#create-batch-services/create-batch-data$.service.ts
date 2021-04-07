import { Injectable } from '@angular/core';
import { FormArray } from '@ng-stack/forms';
import { IStockTakeAmountPerBatch } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { BehaviorSubject } from 'rxjs';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { IBatchInfo } from '../../#shared-services/interfaces/production.interface';

@Injectable({
    providedIn: 'root'
})
export class CreateBatchData$Service {

    private stockBatchesFormArray = new BehaviorSubject<IBatchInfo[]>([]);
    currentStockBatchesFormArray$ = this.stockBatchesFormArray.asObservable();

    private todaysBatch = new BehaviorSubject<IBatchInfo>(null);
    todaysBatch$ = this.todaysBatch.asObservable();

    constructor(private toolbox: ToolboxGroupService) { }
    
    public get stockBatchesFormArrayValue() {
      return this.stockBatchesFormArray.value;
    }

    public get todaysBatchValue() {
      return this.todaysBatch.value;
    }
    
    setStockBatchesFormArray(stockBatchesFormArray: IBatchInfo[]) {
        this.toolbox.multiFieldSorting(stockBatchesFormArray, ['year', 'weekNumber', 'dayNumber'])
        this.stockBatchesFormArray.next(stockBatchesFormArray)
    }

    setTodayBatch(batch: IBatchInfo) {
        this.todaysBatch.next(batch)
    }
}

