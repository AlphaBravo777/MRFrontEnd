import { Injectable } from '@angular/core';
import { IDate } from './date-interface';

@Injectable({
    providedIn: 'root'
})
export class DatePickerHelperService {

    constructor() { }

    longToShortDate(longDate: Date): string {
        try {
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

        } catch (error) {
            return undefined;
        }
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


    getWeekNumber(dateVar: any): number {
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
        // return [dateVar.getUTCFullYear(), weekNo, day];    //Returns 2017, 37, 7
        return weekNo;
    }

    insert_Year_Week_Weekday_IntoIDate(datePackage: IDate) {  // This is of the new generation date functions
        let longDate: any = datePackage.longDate; // Do not modify original longdate
        longDate = new Date(Date.UTC(longDate.getFullYear(), longDate.getMonth(), longDate.getDate()));
        let dayNumber = longDate.getUTCDay();
        if (dayNumber === 0) {
            dayNumber = 7;
        }
        datePackage.weekDay = dayNumber;
        longDate.setUTCDate(longDate.getUTCDate() + 4 - (longDate.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(longDate.getUTCFullYear(), 0, 1));
        datePackage.week = Math.ceil((((longDate - yearStart.valueOf()) / 86400000) + 1) / 7);
        datePackage.year = longDate.getUTCFullYear();
    }

    convertShortToLongDate(shortDate) {
        // To parse a date as UTC, append a Z - e.g.: new Date('2011-04-11T10:20:30Z') // Did not work so far
        // Examples of ISO format: YYYY-MM-DD, or when you have time as well later (but it won't work now): YYYY-MM-DDTHH:MM:SS
        // Takes a date in format "YYYY-MM-DD" and turns it into a "Date()" format
        const parts = shortDate.split('-');
        // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
        // January - 0, February - 1, etc.
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date;
    }

}
