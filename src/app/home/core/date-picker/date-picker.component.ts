import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IDate } from './date-interface';
import { GetDate$Service } from './get-date$.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

    dateForm: FormGroup;
    subscribe: Subscription;
    currentWorkingDate: IDate;
    picker: Date;

    constructor(private fb: FormBuilder, private getDate$Service: GetDate$Service) { }

    ngOnInit() {
        this.subscribe = this.getDate$Service.currentDatePackage$.subscribe(data => {
            this.currentWorkingDate = data;
            this.populateDate();
        });
    }

    populateDate() {
        this.dateForm = this.fb.group({
            year: this.currentWorkingDate.year,
            week: this.currentWorkingDate.week,
            weekDay: this.currentWorkingDate.weekDay,
            month: this.currentWorkingDate.month,
            monthDay: this.currentWorkingDate.monthDay,
            stringDay: this.currentWorkingDate.stringDay,
            shift: this.currentWorkingDate.shift,
            time: this.currentWorkingDate.time,
            date: this.currentWorkingDate.shortDate,
            longDate: this.currentWorkingDate.longDate,
        });
    }

    chosenDateFunc(date) {
        // Add two hours for UTC time (else days show 1 less than needed)
        date = new Date(date.valueOf() + (120 * 60000));
        this.getDate$Service.inputLongDate(date);
    }

}
