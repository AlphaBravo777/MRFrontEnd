import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDate } from './date-interface';
import { DatePickerService } from './date-picker.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GetDate$Service {

    private datePackage = new BehaviorSubject<IDate>({id: null});
    currentDatePackage$ = this.datePackage.asObservable();

    constructor(private datePickerService: DatePickerService) {}

    inputLongDate(longDate: Date): Observable<any> {
        return this.datePickerService.inputLongDate(longDate).pipe(
            take(1),
            tap(data => this.datePackage.next(data))
            );
    }

    inputBlockDate(datePackage) {
        this.datePickerService.inputBlockDate(datePackage).pipe(
            take(1),
            tap(data => this.datePackage.next(data))
            ).subscribe();
    }

    getDifferentDay(datePackage, days) {
        console.log('Different day', datePackage, days);
        // getLongDate(date: Date) {
        //     date = new Date(date.valueOf() + (120 * 60000));
        //     this.dateForm.value.longDate = date;
        //     this.getDate$Service.inputLongDate(this.dateForm.value.longDate).subscribe();
        // }
    }
}
