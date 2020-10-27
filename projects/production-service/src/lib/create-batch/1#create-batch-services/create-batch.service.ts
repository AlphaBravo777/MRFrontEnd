import { Injectable } from '@angular/core';
import { IStockTakeAmountPerBatch } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CreateBatchService {

    constructor() { }

    insertBatches(batches: IStockTakeAmountPerBatch[]): Observable<IStockTakeAmountPerBatch[]> {
        batches.forEach(batch => batch.id = Math.floor(Math.random() * Math.floor(50)))
        return of(batches)
    }
}
