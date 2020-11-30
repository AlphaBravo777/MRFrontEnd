import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@ng-stack/forms';
import { IDate } from 'src/public_api';
import { IStockTakeInstance } from '../../#shared-services/production-stock.interface';

@Injectable({
    providedIn: 'root'
})
export class StockCreateFormService {

    newStockTakeForm: FormGroup<IStockTakeInstance>

    constructor() { }

    createNewStockTakeForm(datePackage: IDate) {

        const fb = new FormBuilder();
        
        this.newStockTakeForm = fb.group<IStockTakeInstance>({
            ID: [null],
            dayNumber: [datePackage.weekDay, [Validators.required]],
            isFullStockTake: [true, [Validators.required]],
            stockTakeLocked: [false, [Validators.required]],
            id: [null],
            parentStockTake: [null, [Validators.required]],
            shortDate: [datePackage.shortDate, [Validators.required]],
            stockTakeTime: [datePackage.time, [Validators.required]],
            stockTakerName: [null, [Validators.required]],
            timeStampid: [datePackage.id, [Validators.required]],
            userid: [JSON.parse(localStorage.getItem('userID')), [Validators.required]],
            username: null,
            weekNumber: [datePackage.week, [Validators.required]],
            year: [datePackage.year, [Validators.required]],
        })
        return this.newStockTakeForm
    }

}
