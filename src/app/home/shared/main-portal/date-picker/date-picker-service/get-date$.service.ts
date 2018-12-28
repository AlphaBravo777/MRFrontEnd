import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDate } from './date-interface';
import { DatePickerService } from './date-picker.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GetDate$Service {

    private datePackage = new BehaviorSubject<IDate>({id: null});
    currentDatePackage$ = this.datePackage.asObservable();

    constructor(private datePickerService: DatePickerService) {
        // this.inputLongDate(new Date());
    }

    inputLongDate(longDate: Date) {
        this.datePickerService.inputLongDate(longDate).pipe(
            take(1),
            tap(data => this.datePackage.next(data))
            ).subscribe();
    }

    inputBlockDate(datePackage) {
        this.datePickerService.inputBlockDate(datePackage).pipe(
            take(1),
            tap(data => this.datePackage.next(data))
            ).subscribe();
    }

}
