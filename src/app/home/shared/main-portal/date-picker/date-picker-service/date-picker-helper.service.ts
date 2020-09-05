import { Injectable } from '@angular/core';
import { IDate } from './date-interface';

@Injectable({
    providedIn: 'root'
})
export class DatePickerHelperService {

    constructor() { }

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

    changeYearWeekDayIntoLongDate(datePackage: IDate) { // Takes a week and year number and turns it into a date

        const simple = new Date(datePackage.year, 0, 1 + (datePackage.week - 1) * 7);
        const dow = simple.getDay();
        const ISOweekStart = simple; // Takes the weeknumber and works out in that year which days it will have
        if (dow <= 4) {
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        } else {
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        }
        const now = this.addDaysToDate(ISOweekStart, datePackage.weekDay);
        return now;
    }

    addDaysToDate(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + (days - 1));
        return result;
    }

    returnShortDate(datePackage: IDate): string {  // This is of the new generation date functions
        const longDate = datePackage.longDate; // Do not modify original longdate
        datePackage.weekDayName = longDate.toString().split(' ')[0];
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

}
