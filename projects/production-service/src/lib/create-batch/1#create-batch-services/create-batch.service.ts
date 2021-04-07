import { Injectable } from '@angular/core';
import { IStockTakeAmountPerBatch } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/public_api';
import { factory_batches_backendToFrontend, factory_batches_frontendToBackend } from '../../#shared-services/production-factory.interface';
import { IBatchInfo } from '../../#shared-services/interfaces/production.interface';
import { CreateBatchData$Service } from './create-batch-data$.service';
import { CreateBatchRestApiService } from './create-batch-rest-api.service';

@Injectable({
    providedIn: 'root'
})
export class CreateBatchService {

    constructor(
        private createBatchRestApiService: CreateBatchRestApiService,
        private getDateService: GetDate$Service,
        private createBatchData$Service: CreateBatchData$Service
    ) { }

    // This might need to return only an IBatch where there is no amount data included 
    insertBatches(batches: IBatchInfo[]): Observable<IBatchInfo[]> {
        return this.createBatchRestApiService.getBatchesIfExistElseInsert(factory_batches_frontendToBackend(batches)).pipe(
            map(backendData => factory_batches_backendToFrontend(backendData))
        )
    }

    getTodaysBatch(): Observable<IBatchInfo[]> {
        const date: IDate = this.getDateService.singleDatePackage
        const currentBatch: IBatchInfo = {
            dayNumber: date.weekDay,
            id: null,
            weekNumber: date.week,
            year: date.year
        }
        return this.insertBatches([currentBatch]).pipe(
            tap(batch => this.createBatchData$Service.setTodayBatch(batch[0]))
        )
    }


}
