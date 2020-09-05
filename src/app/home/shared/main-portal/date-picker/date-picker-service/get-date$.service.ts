import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDate, IBlockDate } from './date-interface';
import { DatePickerService } from './date-picker.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GetDate$Service {

    private datePackage = new BehaviorSubject<IDate>({id: null});
    currentDatePackage$ = this.datePackage.asObservable();

    constructor(private datePickerService: DatePickerService) {}

    // This is only used by the main datepicker service
    inputLongDate2(longDate: Date): Observable<IDate> {
        return this.datePickerService.inputLongDate2(longDate).pipe(
            take(1),
            tap(data => this.datePackage.next(data))
            );
    }

    insertNewDatePackage(datePackage: IDate) {
        this.datePackage.next(datePackage);
    }

    // inputBlockDate(blockDate: IBlockDate): Observable<IDate> {
    //     this.datePickerService.inputBlockDate(blockDate).pipe(
    //         take(1),
    //         tap(data => this.datePackage.next(data))
    //     ).subscribe();
    // }

    // This is an api where you can just give a number of days forwards or backwards, and it will return the day id for those days
    // This is quite a high traffic api point
    getDatePackageForCurrentDateMinusPlusDays(daysToAdd: number): Observable<IDate> {
        const longDate =  new Date(new Date().setDate(new Date().getDate() + daysToAdd));
        console.log('* * * * New date = ', longDate);
        return this.getDatePackageForGivenLongDate(longDate).pipe();
    }

    getDatePackageForGivenLongDate(longDate): Observable<IDate> {
        return this.datePickerService.inputLongDate2(longDate).pipe(
            take(1),
        );
    }

    getAllDatePackagesForGivenWeekNR(datePackage: IDate): Observable<IDate[]> {
        return this.datePickerService.getAllDatePackagesForGivenWeekNR(datePackage);
    }
}
