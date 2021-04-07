import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { IDate } from 'src/public_api';
import { IBatchInfo } from '../../#shared-services/interfaces/production.interface';

@Injectable({
    providedIn: 'root'
})
export class CreateBatchFormService {

    private batchArray: FormArray<IBatchInfo>

    constructor() { }

    private createSingleBatchGroup(): FormGroup<IBatchInfo> {
        const datePackage: IDate = JSON.parse(localStorage.getItem("datePackage"));
        return new FormGroup<IBatchInfo>({
            id: new FormControl(null),
            dayNumber: new FormControl(datePackage.weekDay, [Validators.required, Validators.min(1), Validators.max(10)]),
            weekNumber: new FormControl(datePackage.week, [Validators.required, Validators.min(1), Validators.max(53)]),
            year: new FormControl(datePackage.year, [Validators.required, Validators.min(1990), Validators.max(2050)]),
        })
    }

    createBatchFormArray(): FormArray<IBatchInfo> {
        this.batchArray = new FormArray<IBatchInfo>([]);
        this.addBatchToArray();
        return this.batchArray
    }

    addBatchToArray(): void {
        this.batchArray.push(this.createSingleBatchGroup());
    }
}
