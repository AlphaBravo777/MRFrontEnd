import { Injectable } from '@angular/core';
import { IDate, ITimeIDs } from './date-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SingleApiService } from '../../shared/services/single-api-service';


@Injectable({
    providedIn: 'root'
})

export class DatePickerService {

    datePackage: IDate = {};

    constructor(private singleApiService: SingleApiService) { }

    inputLongDate(datePack: IDate): IDate {
        this.datePackage = datePack;
        this.getBlockDate(datePack.longDate);
        this.getShortDate(datePack.longDate);
        return this.datePackage;
    }

    weekMain(firstDate: any): IDate {  // Takes any day format and turns it into an array with Year, Week number and day number.

        let workingDate;
        const new2 = this.dateToString(firstDate);

        if (new2.length < 13) {
            workingDate = this.shortToLongDate(new2);
        } else {
            workingDate = firstDate;
        }
        const dateArray: IDate = this.getWeekNumber(workingDate);
        if (dateArray.weekDay === 0) { dateArray.weekDay = 7; }
        // console.log('The starting date = ', dateArray);
        return dateArray;
    }

    getBlockDate(longDate: any) {

        longDate = new Date(Date.UTC(longDate.getFullYear(), longDate.getMonth(), longDate.getDate()));
        this.datePackage.weekDay = longDate.getUTCDay();
        // console.log('+++ ', this.datePackage.weekDay, longDate);
        longDate.setUTCDate(longDate.getUTCDate() + 4 - (longDate.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(longDate.getUTCFullYear(), 0, 1));
        // console.log(longDate.getUTCDay());
        this.datePackage.week = Math.ceil((((longDate - yearStart.valueOf()) / 86400000) + 1) / 7);
        this.datePackage.year = longDate.getUTCFullYear();
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
            year: dateVar.getUTCFullYear(),
            week: weekNo,
            weekDay: day,
        };
        // return [dateVar.getUTCFullYear(), weekNo, day];    //Returns 2017, 37, 7
        return dateArray;
    }

    shortToLongDate(tyd) {
        // Takes a date in format "dd-mm-yyyy" and turns it into a "Date()" format -
        // Tue Sep 12 2017 08:46:02 GMT+0200 (South Africa Standard Time)
        tyd = tyd.split('-');
        const newDate = tyd[0] + '-' + tyd[1] + '-' + tyd[2];
        const date = new Date(newDate.replace(/-/g, '/'));
        return date;
    }

    getShortDate(longDate: Date) {
        // console.log('--- ', longDate, longDate.getDate());
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
        console.log('Modified date is: ', now);
        return now;
    }

    addDaysToDate(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + (days - 1));
        return result;
    }

    getTime() {
        this.datePackage.time = '12:00';
    }

    getShift() {
        this.datePackage.shift = 'A';
    }

    addTimeStamp(datePack): Observable<any> {
        return this.singleApiService.getTimeStampID(datePack).pipe(
            // map(data => data[0].id)
            // console.log(data[0].id);
            map(data => data)
        );
    }

    getTimeStampID(datePack: IDate): Observable<ITimeIDs> {
        return this.singleApiService.getGraphQLdata(datePack).pipe(
            map(result => result)
        );
    }
}

/*
Run a main function that decides where to send the incoming date,
if long format send to getweeknumber and get the returning result and send back, if short date then make it long date first,
then send to getweeknumber, and get returning result and send through.

*/
