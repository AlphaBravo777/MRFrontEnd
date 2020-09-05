import { Injectable } from '@angular/core';
import { IDate, IBlockDate, datePackage_factory } from './date-interface';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap, concatMap, take, timestamp } from 'rxjs/operators';
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

    // This service takes a long date, and then returns the timestamp id for that long date
    // This is quite a high traffic endpoint
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
        datePackage.shortDate = this.getShortDate(longDate);
        this.insertYearWeekWeekdayIntoIDate(datePackage);
        console.log('CURRENT DATEPACKAGE: ', datePackage);
        // return this.getOrCreateTimeStampData2(datePackage).pipe();
        return this.datePickerGraphqlApiService.getWeekDayData(datePackage).pipe(
            concatMap(() => this.refractureGetorCreateTimestampid(datePackage))
        );
    }

    inputBlockDate(blockDate: IBlockDate): Observable<IDate> { // This service only has to do with the shift and stocktake block that is in the datePicker
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
        datePackage.weekDayName = this.returnWeekdayName(datePackage.longDate);
        datePackage.shortDate = this.getShortDate(datePackage.longDate);
        return this.refractureGetorCreateTimestampid(datePackage).pipe();
        // return this.datePickerGraphqlApiService.getWeekDayData(datePackage).pipe(
        //     concatMap(() => this.refractureGetorCreateTimestampid(datePackage))
        // );
    }



    shortToLongDate(shortDate) {
        // To parse a date as UTC, append a Z - e.g.: new Date('2011-04-11T10:20:30Z') // Did not work so far
        // Examples of ISO format: YYYY-MM-DD, or when you have time as well later (but it won't work now): YYYY-MM-DDTHH:MM:SS
        // Takes a date in format "YYYY-MM-DD" and turns it into a "Date()" format
        const parts = shortDate.split('-');
        // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
        // January - 0, February - 1, etc.
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date;
    }

    returnWeekdayName(longDate: Date): string {
        console.log('longDate = ', longDate);
        return longDate.toString().split(' ')[0];
    }

    getShortDate(longDate: Date): string {
        const dd = longDate.getDate();  // Gets the day number of the date, meaning "12"
        const mm = longDate.getMonth() + 1; // Gets the month number of the date, meaning "9" and adds +1 because January = 0!
        const yyyy = longDate.getFullYear(); // Gets the year number of the date, meaning "2017"
        let ddd = '0';
        let mmm = '0';

        if (dd < 10) {  // Adds a "0" to days < 10 to make sure the number is "03" and not "3"
            ddd = '0' + dd;
        } else { ddd = dd.toString(); }
        if (mm < 10) {   // Adds a "0" to months < 10 to make sure the number is "03" and not "3"
            mmm = '0' + mm;
        } else { mmm = mm.toString(); }

        return yyyy + '-' + mmm + '-' + ddd;
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

    refractureGetorCreateTimestampid(datePackage: IDate): Observable<IDate> {
        return this.datePickerApiService.getOrCreateTimeStampid(datePackage).pipe(
            tap(timeStamp => datePackage.id = timeStamp.id),
            concatMap(() => this.datePickerGraphqlApiService.getSingleTimeStampID(datePackage)),
        );
    }

    // getOrCreateTimeStampData2(packageDate: IDate): Observable<IDate> {
    //     // console.log(' ##################### getOrCreateTimeStampData2 is running ##############');
    //     return this.datePickerGraphqlApiService.getTimeData(packageDate.time).pipe(
    //         tap(time => {
    //             packageDate.timeID = time.id;
    //             packageDate.timeHalfStock = time.selectiveDelete;
    //         }),
    //         concatMap(() => this.datePickerGraphqlApiService.getWeekDayData(packageDate)),
    //         // tap(weekDay => {
    //         //     packageDate.weekDayID = weekDay.id;
    //         //     packageDate.weekDayName = weekDay.weekDayNames;
    //         // }),
    //         switchMap(() => this.datePickerGraphqlApiService.getSingleTimeStampID(packageDate)),  // This can maybe be refractured to getOrCreateTimeStampid
    //         concatMap(date => {
    //             if (date.nodeID === undefined) {
    //                 return this.datePickerApiService.createTimeStampID(packageDate).pipe(
    //                     switchMap(data => this.datePickerGraphqlApiService.getSingleTimeStampID(packageDate)),
    //                 );
    //             } else {
    //                 return of(date);
    //             }
    //         }),
    //         map(date => {
    //             packageDate.id = date.id;
    //             packageDate.nodeID = date.nodeID;
    //             return packageDate;
    //         })
    //     );
    // }

    getAllDatePackagesForGivenWeekNR(datePackage: IDate): Observable<IDate[]> {
        return this.datePickerGraphqlApiService.getAllDatePackagesForGivenWeekNR(datePackage.week, datePackage.year).pipe();
    }
}


