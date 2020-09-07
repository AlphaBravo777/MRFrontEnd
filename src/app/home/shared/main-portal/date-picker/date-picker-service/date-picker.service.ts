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

    convertLongDateToShortDate(longDate: Date): string {
        return this.datePickerHelperService.longToShortDate(longDate);
    }

    returnWeekdayNameFromLongDate(longDate: Date): string {
        try {
            return longDate.toLocaleDateString('en-US', { weekday: 'long' });
        } catch (error) {
            return undefined;
        }
    }

    convertShortDateToLongDate(shortDate: string): Date {
        return this.datePickerHelperService.convertShortToLongDate(shortDate);
    }

    returnWeekNumberFromLongDate(longDate: Date): number {
        return this.datePickerHelperService.getWeekNumber(longDate);
    }

    convertYearWeekDayIntoLongDate(datePackage: IDate): Date {
        return this.datePickerHelperService.changeYearWeekDayIntoLongDate(datePackage);
    }

    addNumberOfDaysToCurrentDate(longDate: Date, days: number): Date {
        return this.datePickerHelperService.addDaysToDate(longDate, days);
    }

    insertYearWeekWeekdayIntoIDate(datePackage: IDate) {
        this.datePickerHelperService.convertLongDateIntoYearWeekWeekDay(datePackage);
    }

    getAllDatePackagesForGivenWeekNR(datePackage: IDate): Observable<IDate[]> {
        // What we can do here is call the function, create a spy that intercepts the backend call, return data that looks like the data that we will get from the backend
        // (a json string) and then have a look how that data will get parsed. We can in the backend api maybe make a test that does an actual call, and tests the results with
        // data that we have on record to make sure the backend does not change.
        // If you test something that makes a backend call and you have a spy returning backend data, then you can do anything with that record and make sure that it returns
        // the correct data.
        // https://www.apollographql.com/docs/angular/guides/testing/
        // https://medium.com/@sergeyfetiskin/testing-apollo-graphql-in-your-angular-application-595f0a04aad3
        // https://www.geekstrick.com/apollo-client-graphql-testing-angular/
        return this.datePickerGraphqlApiService.getAllDatePackagesForGivenWeekNR(datePackage.week, datePackage.year).pipe();
    }

    getorCreateTimeStampid(datePackage: IDate): Observable<IDate> {
        return this.datePickerApiService.getOrCreateTimeStampid(datePackage).pipe(
            tap(timeStamp => datePackage.id = timeStamp.id),
            concatMap(() => this.datePickerGraphqlApiService.getSingleTimeStampNodeID(datePackage)),
        );
    }
}


