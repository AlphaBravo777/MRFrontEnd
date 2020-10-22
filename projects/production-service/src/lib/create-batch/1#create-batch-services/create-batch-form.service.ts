import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { IStockTakeBatch } from 'projects/stock-take-service/src/lib/#shared-services/production-stock.interface';
import { IDate } from 'src/public_api';
import { IBatchInfo } from '../../#shared-services/production.interface';

@Injectable({
    providedIn: 'root'
})
export class CreateBatchFormService {

    private batchArray: FormArray<IStockTakeBatch>

    constructor() { }

    private createSingleBatchGroup(): FormGroup<IStockTakeBatch> {
        const datePackage: IDate = JSON.parse(localStorage.getItem("datePackage"));
        return new FormGroup<IStockTakeBatch>({
            id: new FormControl(null),
            dayNumber: new FormControl(datePackage.weekDay, [Validators.required, Validators.min(1), Validators.max(10)]),
            weekNumber: new FormControl(datePackage.week, [Validators.required, Validators.min(1), Validators.max(53)]),
            year: new FormControl(datePackage.year, [Validators.required, Validators.min(1990), Validators.max(2050)]),
        })
    }

    createBatchFormArray(): FormArray<IStockTakeBatch> {
        this.batchArray = new FormArray<IStockTakeBatch>([]);
        this.addBatchToArray();
        return this.batchArray
    }

    addBatchToArray(): void {
        this.batchArray.push(this.createSingleBatchGroup());
    }
}
