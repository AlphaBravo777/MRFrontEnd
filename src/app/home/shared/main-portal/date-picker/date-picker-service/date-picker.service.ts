import { Injectable } from '@angular/core';
import { IDate, IBlockDate } from './date-interface';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap, concatMap, take } from 'rxjs/operators';
import { DatePickerApiService } from './date-picker-api.service';
import { DatePickerGraphqlApiService } from './date-picker-graphql-api.service';
import { DatePickerHelperService } from './date-picker-helper.service';

@Injectable({
    providedIn: 'root'
})

export class DatePickerService {

    datePackage: IDate = { id: null };

    constructor(
        private datePickerApiService: DatePickerApiService,
        private datePickerGraphqlApiService: DatePickerGraphqlApiService,
        private datePickerHelperService: DatePickerHelperService) { }

    // This service takes a long date, and then returns the timestamp id for that long date
    // This is quite a high traffic endpoint
    inputLongDate2(longDate: Date): Observable<IDate> {
        const datePackage: IDate = {
            id: null,
            longDate: longDate,
            shift: 'Day',
            time: 'Day'
        };
        this.datePackage.shortDate = this.convertBlockDateToShortDate(datePackage);
        this.returnBlockDate(datePackage);
        console.log('CURRENT DATEPACKAGE: ', datePackage);
        return this.getOrCreateTimeStampData2(datePackage).pipe();
    }

    inputBlockDate(blockDate: IBlockDate): Observable<IDate> { // This service only has to do with the shift and stocktake block that is in the datePicker
        const datePackage: IDate = {
            id: null,
            year: blockDate.year,
            week: blockDate.week,
            weekDay: blockDate.weekDay,
            shiftid: blockDate.shiftData.id,
            shift: blockDate.shiftData.shiftName,
            shiftID: blockDate.shiftData.nodeID,
            timeid: blockDate.timeData.id,
            time: blockDate.timeData.times,
            timeID: blockDate.timeData.nodeID,
        };
        datePackage.longDate = this.convertYearWeekDayIntoLongDate(datePackage);
        datePackage.weekDayName = this.returnWeekdayName(datePackage.longDate);
        datePackage.shortDate = this.getShortDate(datePackage.longDate);
        return this.refractureGetorCreateTimestampid(datePackage).pipe();
    }

    getBlockDate(longDate: any) {

        longDate = new Date(Date.UTC(longDate.getFullYear(), longDate.getMonth(), longDate.getDate()));
        let dayNumber = longDate.getUTCDay();
        if (dayNumber === 0) {
            dayNumber = 7;
        }
        this.datePackage.weekDay = dayNumber;
        longDate.setUTCDate(longDate.getUTCDate() + 4 - (longDate.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(longDate.getUTCFullYear(), 0, 1));
        this.datePackage.week = Math.ceil((((longDate - yearStart.valueOf()) / 86400000) + 1) / 7);
        this.datePackage.year = longDate.getUTCFullYear();
    }

    private returnBlockDate(packageDate: IDate) {  // This is of the new generation date functions
        let longDate: any = packageDate.longDate; // Do not modify original longdate
        longDate = new Date(Date.UTC(longDate.getFullYear(), longDate.getMonth(), longDate.getDate()));
        let dayNumber = longDate.getUTCDay();
        if (dayNumber === 0) {
            dayNumber = 7;
        }
        packageDate.weekDay = dayNumber;
        longDate.setUTCDate(longDate.getUTCDate() + 4 - (longDate.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(longDate.getUTCFullYear(), 0, 1));
        packageDate.week = Math.ceil((((longDate - yearStart.valueOf()) / 86400000) + 1) / 7);
        packageDate.year = longDate.getUTCFullYear();

    }

    getWeekNumber(dateVar: any) {
        // Takes a "Date()" format "Tue Sep 12 2017 08:46:02 GMT+0200 (South Africa Standard Time)"
        // and gives an array with Year, Week number and day number

        // Copy date so don't modify original
        dateVar = new Date(Date.UTC(dateVar.getFullYear(), dateVar.getMonth(), dateVar.getDate()));
        const day = dateVar.getUTCDay();
        // Set to nearest Thursday: current date + 4 - current day number. Make Sunday's day number 7
        dateVar.setUTCDate(dateVar.getUTCDate() + 4 - (dateVar.getUTCDay() || 7));
        // Get first day of year
        const yearStart = new Date(Date.UTC(dateVar.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        const weekNo = Math.ceil((((dateVar - yearStart.valueOf()) / 86400000) + 1) / 7);
        // Return array of year and week number
        const dateArray: IDate = {
            id: null,
            year: dateVar.getUTCFullYear(),
            week: weekNo,
            weekDay: day,
        };
        // return [dateVar.getUTCFullYear(), weekNo, day];    //Returns 2017, 37, 7
        return dateArray;
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



    getTime() {
        this.datePackage.time = 'Day';
    }

    getShift() {
        this.datePackage.shift = 'Day';
    }

    refractureGetorCreateTimestampid(datePackage: IDate): Observable<IDate> {
        console.log('The datepackage going to the backend = ', JSON.parse(JSON.stringify(datePackage)));
        return this.datePickerApiService.getOrCreateTimeStampid(datePackage).pipe(
            tap(timestamp => console.log('The timestamp returning from the backend = ', timestamp)),
            map(timestamp => {
                datePackage.id = timestamp.id;
                return datePackage;
            })
        );
    }

    // // This service gets only used by the blockTimestamp form when you pick a date
    // getOrCreateTimeStampData(): Observable<IDate> { // Old timestamp id using strings more instead of ids to get data
    //     // console.log(' ##################### getOrCreateTimeStampData is running ##############');
    //     const getWeekDayData$ = this.datePickerGraphqlApiService.getWeekDayData(this.datePackage.weekDay);
    //     const getTimeData$ = this.datePickerGraphqlApiService.getTimeData(this.datePackage.time);
    //     return getTimeData$.pipe(
    //         take(1),
    //         map(data => {
    //             this.datePackage.timeID = data.id;
    //             this.datePackage.timeHalfStock = data.selectiveDelete;
    //         }),
    //         concatMap(() => getWeekDayData$),
    //         map(data => {
    //             this.datePackage.weekDayID = data.id;
    //             this.datePackage.weekDayName = data.weekDayNames;
    //         }),
    //         map(() => this.datePackage),
    //         switchMap((data) => this.datePickerGraphqlApiService.getTimeStampID(data)),
    //         switchMap(data => {
    //             if (data.nodeID === undefined) {
    //                 return this.datePickerApiService.createTimeStampID(this.datePackage).pipe(   // This can maybe be refractured to getOrCreateTimeStampid
    //                     switchMap(() => this.getOrCreateTimeStampData())
    //                 );
    //             }
    //             return of(data);
    //         }),
    //         tap((data) => console.log('There is a timestampID and it is', data)),
    //         map(data => {
    //             this.datePackage.id = data.id;
    //             this.datePackage.nodeID = data.nodeID;
    //             return this.datePackage;
    //         })
    //     );
    // }

    getOrCreateTimeStampData2(packageDate: IDate): Observable<IDate> {
        // console.log(' ##################### getOrCreateTimeStampData2 is running ##############');
        return this.datePickerGraphqlApiService.getTimeData(packageDate.time).pipe(
            tap(time => {
                packageDate.timeID = time.id;
                packageDate.timeHalfStock = time.selectiveDelete;
            }),
            concatMap(() => this.datePickerGraphqlApiService.getWeekDayData(packageDate.weekDay)),
            tap(weekDay => {
                packageDate.weekDayID = weekDay.id;
                packageDate.weekDayName = weekDay.weekDayNames;
            }),
            switchMap(() => this.datePickerGraphqlApiService.getTimeStampID(packageDate)),  // This can maybe be refractured to getOrCreateTimeStampid
            concatMap(date => {
                if (date.nodeID === undefined) {
                    return this.datePickerApiService.createTimeStampID(packageDate).pipe(
                        switchMap(data => this.datePickerGraphqlApiService.getTimeStampID(packageDate)),
                    );
                } else {
                    return of(date);
                }
            }),
            map(date => {
                packageDate.id = date.id;
                packageDate.nodeID = date.nodeID;
                return packageDate;
            })
        );
    }

    getAllDatePackagesForGivenWeekNR(datePackage: IDate): Observable<IDate[]> {
        return this.datePickerGraphqlApiService.getAllDatePackagesForGivenWeekNR(datePackage.week, datePackage.year).pipe();
    }
}


