import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDate } from './date-interface';
import { DatePickerService } from './date-picker.service';

@Injectable({
    providedIn: 'root'
})
export class GetDate$Service {

    private datePackage = new BehaviorSubject<IDate>(this.datePickerService.inputLongDate(new Date()));
    currentDatePackage$ = this.datePackage.asObservable();

    constructor(private datePickerService: DatePickerService) {
    }

    inputLongDate(date) {
        this.datePackage.next(this.datePickerService.inputLongDate(date));
    }

    getBlockDateFromShortDate() {
        return;
    }

    getShortDateFromBlockDate() {
        return;
    }

}
