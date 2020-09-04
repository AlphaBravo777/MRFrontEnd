import { Injectable } from '@angular/core';
import { IDate } from './date-interface';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap, concatMap, take } from 'rxjs/operators';
import { DatePickerApiService } from './date-picker-api.service';

@Injectable({
    providedIn: 'root'
})

export class DatePickerService {

    datePackage: IDate = { id: null };

    constructor(private datePickerApiService: DatePickerApiService) { }

    // This is only used by datepicker service
    inputLongDate(longDate: Date): Observable<IDate> {
        this.datePackage.longDate = longDate;
        this.getBlockDate(longDate);
        this.getShortDate(longDate);
        this.getShift();
        this.getTime();
        return this.getOrCreateTimeStampData().pipe(
        );
    }

    // This service takes a long date, and then returns the timestamp id for that long date
    // This is quite a high traffic endpoint
    inputLongDate2(longDate: Date): Observable<IDate> {
        const packageDate: IDate = {
            id: null,
            longDate: longDate,
            shift: 'Day',
            time: 'Day'
        };
        this.returnShortDate(packageDate);
        this.returnBlockDate(packageDate);
        console.log('CURRENT DATEPACKAGE: ', packageDate);
        return this.getOrCreateTimeStampData2(packageDate).pipe();
    }

    inputBlockDate(datePackage: IDate): Observable<any> {
        this.datePackage.week = datePackage.week;
        this.datePackage.weekDay = datePackage.weekDay;
        this.datePackage.shift = datePackage.shift;
        this.datePackage.time = datePackage.time;
        this.datePackage.longDate = this.weekToDate(this.datePackage);
        this.getShortDate(this.datePackage.longDate);
        return this.getOrCreateTimeStampData().pipe(
        );
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
        // console.log('Date -- ', date);
        // console.log(mydate.toDateString());

        // Old code
        // Tue Sep 12 2017 08:46:02 GMT+0200 (South Africa Standard Time)
        // shortDate = shortDate.split('-');
        // const newDate = shortDate[0] + '/' + shortDate[1] + '/' + shortDate[2];
        // const date = new Date(newDate);
        return date;
    }

    getShortDate(longDate: Date) {
        // console.log('--- ', longDate, longDate.getDate());
        this.datePackage.weekDayName = longDate.toString().split(' ')[0];
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
        this.datePackage.shortDate = yyyy + '-' + mmm + '-' + ddd;
    }

    private returnShortDate(packageDate: IDate) {  // This is of the new generation date functions
        const longDate = packageDate.longDate; // Do not modify original longdate
        packageDate.weekDayName = longDate.toString().split(' ')[0];
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
        packageDate.shortDate = yyyy + '-' + mmm + '-' + ddd;
    }

    longToShortDate(date) {
        // Takes a "Date()" format "Tue Sep 12 2017 08:46:02 GMT+0200
        // (South Africa Standard Time)" and turns it into a date format "yyyy-mm-dd"

        const dd = date.getDate();  // Gets the day number of the date, meaning "12"
        const mm = date.getMonth() + 1; // Gets the month number of the date, meaning "9" and adds +1 because January = 0!
        const yyyy = date.getFullYear(); // Gets the year number of the date, meaning "2017"
        let ddd = '0';
        let mmm = '0';

        if (dd < 10) {  // Adds a "0" to days < 10 to make sure the number is "03" and not "3"
            ddd = '0' + dd;
        } else { ddd = dd.toString(); }
        if (mm < 10) {   // Adds a "0" to months < 10 to make sure the number is "03" and not "3"
            mmm = '0' + mm;
        } else { mmm = mm.toString(); }
        const today2 = yyyy + '-' + mmm + '-' + ddd;
        return today2;
    }

    dateToString(arg) { // Turns the date into a string
        return arg + '';
    }

    weekToDate(result: IDate) { // Takes a week and year number and turns it into a date

        const simple = new Date(result.year, 0, 1 + (result.week - 1) * 7);
        const dow = simple.getDay();
        const ISOweekStart = simple;
        if (dow <= 4) {
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        } else {
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        }
        const now = this.addDaysToDate(ISOweekStart, result.weekDay);
        return now;
    }

    addDaysToDate(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + (days - 1));
        return result;
    }

    getTime() {
        this.datePackage.time = 'Day';
    }

    getShift() {
        this.datePackage.shift = 'Day';
    }

    getOrCreateTimeStampData(): Observable<IDate> {
        // console.log(' ##################### getOrCreateTimeStampData is running ##############');
        const getWeekDayData$ = this.datePickerApiService.getWeekDayData(this.datePackage.weekDay);
        const getTimeData$ = this.datePickerApiService.getTimeData(this.datePackage.time);
        return getTimeData$.pipe(
            take(1),
            map(data => {
                this.datePackage.timeID = data.id;
                this.datePackage.timeHalfStock = data.selectiveDelete;
            }),
            concatMap(() => getWeekDayData$),
            map(data => {
                this.datePackage.weekDayID = data.id;
                this.datePackage.weekDayName = data.weekDayNames;
            }),
            map(() => this.datePackage),
            switchMap((data) => this.datePickerApiService.getTimeStampIDs(data)),
            switchMap(data => {
                if (data.nodeID === undefined) {
                    return this.datePickerApiService.createTimeStampID(this.datePackage).pipe(   // This can maybe be refractured to getOrCreateTimeStampid
                        switchMap(() => this.getOrCreateTimeStampData())
                    );
                }
                return of(data);
            }),
            tap((data) => console.log('There is a timestampID and it is', data)),
            map(data => {
                this.datePackage.id = data.id;
                this.datePackage.nodeID = data.nodeID;
                return this.datePackage;
            })
        );
    }

    getOrCreateTimeStampData2(packageDate: IDate): Observable<IDate> {
        // console.log(' ##################### getOrCreateTimeStampData2 is running ##############');
        return this.datePickerApiService.getTimeData(packageDate.time).pipe(
            tap(time => {
                packageDate.timeID = time.id;
                packageDate.timeHalfStock = time.selectiveDelete;
            }),
            concatMap(() => this.datePickerApiService.getWeekDayData(packageDate.weekDay)),
            tap(weekDay => {
                packageDate.weekDayID = weekDay.id;
                packageDate.weekDayName = weekDay.weekDayNames;
            }),
            switchMap(() => this.datePickerApiService.getTimeStampIDs(packageDate)),  // This can maybe be refractured to getOrCreateTimeStampid
            concatMap(date => {
                if (date.nodeID === undefined) {
                    return this.datePickerApiService.createTimeStampID(packageDate).pipe(
                        switchMap(data => this.datePickerApiService.getTimeStampIDs(packageDate)),
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
        return this.datePickerApiService.getAllDatePackagesForGivenWeekNR(datePackage.week, datePackage.year).pipe();
    }
}


