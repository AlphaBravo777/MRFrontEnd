import { Injectable } from '@angular/core';
import { FormArray } from '@ng-stack/forms';
import { IStockTakeBatch } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { BehaviorSubject } from 'rxjs';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';

@Injectable({
    providedIn: 'root'
})
export class CreateBatchData$Service {

    private stockBatchesFormArray = new BehaviorSubject<IStockTakeBatch[]>([]);
    currentStockBatchesFormArray$ = this.stockBatchesFormArray.asObservable();

    constructor(private toolbox: ToolboxGroupService) { }
    
    public get stockBatchesFormArrayValue() {
      return this.stockBatchesFormArray.value;
    }
    
    setStockBatchesFormArray(stockBatchesFormArray: IStockTakeBatch[]) {
        this.toolbox.multiFieldSorting(stockBatchesFormArray, ['year', 'weekNumber', 'dayNumber'])
        this.stockBatchesFormArray.next(stockBatchesFormArray)
    }
}

