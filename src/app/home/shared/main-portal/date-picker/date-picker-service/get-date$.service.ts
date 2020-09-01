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

    inputLongDate(longDate: Date): Observable<IDate> {
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

    getDatePackageForGivenLongDate(longDate): Observable<IDate> {
        return this.datePickerService.inputLongDate2(longDate).pipe(
            take(1),
        );
    }

    getDatePackageForCurrentDateMinusPlusDays(daysToAdd: number): Observable<IDate> {
        const longDate =  new Date(new Date().setDate(new Date().getDate() + daysToAdd));
        console.log('* * * * New date = ', longDate);
        return this.getDatePackageForGivenLongDate(longDate).pipe();
    }

    getAllDatePackagesForGivenWeekNR(datePackage: IDate): Observable<IDate[]> {
        return this.datePickerService.getAllDatePackagesForGivenWeekNR(datePackage);
    }
}
