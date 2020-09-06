import { Injectable } from '@angular/core';
import { IDate, IBlockDate, datePackage_factory } from './date-interface';
import { Observable } from 'rxjs';
import { tap, concatMap} from 'rxjs/operators';
import { DatePickerApiService } from './date-picker-api.service';
import { DatePickerGraphqlApiService } from './date-picker-graphql-api.service';
import { DatePickerHelperService } from './date-picker-helper.service';

@Injectable({
    providedIn: 'root'
})

export class DatePickerService {

    constructor(
        private datePickerApiService: DatePickerApiService,
        private datePickerGraphqlApiService: DatePickerGraphqlApiService,
        private datePickerHelperService: DatePickerHelperService) { }

    // This is the option to run when you have to get a timestamp from a date() object, where you need the full day - no shift or time (it is the most used option)
    inputLongDate2(longDate: Date): Observable<IDate> {
        const datePackage: IDate = datePackage_factory();
        datePackage.id = null;
        datePackage.longDate = longDate;
        datePackage.shiftid = 4;
        datePackage.shift = 'Day';
        datePackage.shiftID = 'U2hpZnRzVHlwZTo0';
        datePackage.time = 'Day';
        datePackage.timeid = 10;
        datePackage.timeID = 'U3RvY2tUYWtpbmdUaW1lc1R5cGU6MTA=';
        datePackage.shortDate = this.convertLongDateToShortDate(longDate);
        this.insertYearWeekWeekdayIntoIDate(datePackage);
        console.log('CURRENT DATEPACKAGE: ', datePackage);
        return this.datePickerGraphqlApiService.getWeekDayData(datePackage).pipe(
            concatMap(() => this.getorCreateTimeStampid(datePackage))
        );
    }

    // This is the option to run when you have to get a timestamp from data like "year", "week", "day", "shift", "time"
    inputBlockDate(blockDate: IBlockDate): Observable<IDate> {
        const datePackage: IDate = datePackage_factory();
        datePackage.id = null,
        datePackage.year = blockDate.year;
        datePackage.week = blockDate.week;
        datePackage.weekDay = blockDate.weekDay.weekDayNumber;
        datePackage.weekDayID = blockDate.weekDay.nodeID;
        datePackage.weekDayName = blockDate.weekDay.weekDayName;
        datePackage.weekDayRank = blockDate.weekDay.weekDayRanking;
        datePackage.shiftid = blockDate.shiftData.id;
        datePackage.shift = blockDate.shiftData.shiftName;
        datePackage.shiftID = blockDate.shiftData.nodeID;
        datePackage.timeid = blockDate.timeData.id;
        datePackage.time = blockDate.timeData.times;
        datePackage.timeID = blockDate.timeData.nodeID;
        datePackage.longDate = this.convertYearWeekDayIntoLongDate(datePackage);
        datePackage.weekDayName = this.returnWeekdayNameFromLongDate(datePackage.longDate);
        datePackage.shortDate = this.convertLongDateToShortDate(datePackage.longDate);
        return this.getorCreateTimeStampid(datePackage).pipe();
     }

    returnWeekdayNameFromLongDate(longDate: Date): string {
        console.log('longDate = ', longDate);
        return longDate.toLocaleDateString('en-US', { weekday: 'long' });
    }

    convertShortDateToLongDate(shortDate: string): Date {
        return this.datePickerHelperService.convertShortToLongDate(shortDate);
    }

    returnsWeekNumberFromLongDate(longDate: Date): number {
        return this.datePickerHelperService.getWeekNumber(longDate);
    }

    convertBlockDateToShortDate(datePackage: IDate): string {
        return this.datePickerHelperService.returnShortDate(datePackage);
    }

    convertLongDateToShortDate(longDate: Date): string {
        return this.datePickerHelperService.longToShortDate(longDate);
    }

    convertYearWeekDayIntoLongDate(datePackage: IDate): Date {
        return this.datePickerHelperService.changeYearWeekDayIntoLongDate(datePackage);
    }

    addNumberOfDaysToCurrentDate(date, days): Date {
        return this.datePickerHelperService.addDaysToDate(date, days);
    }

    insertYearWeekWeekdayIntoIDate(datePackage: IDate) {
        this.datePickerHelperService.insert_Year_Week_Weekday_IntoIDate(datePackage);
    }

    getorCreateTimeStampid(datePackage: IDate): Observable<IDate> {
        return this.datePickerApiService.getOrCreateTimeStampid(datePackage).pipe(
            tap(timeStamp => datePackage.id = timeStamp.id),
            concatMap(() => this.datePickerGraphqlApiService.getSingleTimeStampNodeID(datePackage)),
        );
    }

    getAllDatePackagesForGivenWeekNR(datePackage: IDate): Observable<IDate[]> {
        return this.datePickerGraphqlApiService.getAllDatePackagesForGivenWeekNR(datePackage.week, datePackage.year).pipe();
    }
}


