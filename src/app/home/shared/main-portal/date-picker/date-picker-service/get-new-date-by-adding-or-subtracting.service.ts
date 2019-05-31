import { Injectable } from '@angular/core';
import { IDate } from './date-interface';
import { Observable, of } from 'rxjs';
import { GetDate$Service } from './get-date$.service';

@Injectable({
    providedIn: 'root'
})
export class GetNewDateByAddingOrSubtractingService {

    constructor(private getDate$Service: GetDate$Service) {}

    calculateNewDate(datePackage: IDate, daysOffset: number = 0, hoursOffset: number = 0): Observable<IDate> {
        // console.log('  = Alpha =     GetOffsetDateService: ', datePackage, daysOffset, hoursOffset);
        const d = new Date(datePackage.longDate);
        const newDate: Date = this.dateByChangingDays(d, daysOffset, hoursOffset);
        // console.log('  = Bravo =     GetOffsetDateService: ', newDate);
        return this.getDate$Service.getDatePackageForGivenLongDate(newDate).pipe();
        // return of([])
    }

    private dateByChangingDays(date: Date, daysOffset: number, hoursOffset: number): Date {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + daysOffset,
            date.getHours() + hoursOffset,
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        );
    }

}
