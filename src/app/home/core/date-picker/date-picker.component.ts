import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IDate } from './date-interface';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

    dateForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.populateDate('today');
    }

    populateDate(day) {
        const dateData: IDate = this.getDate(day);
        this.dateForm = this.fb.group({
            year: dateData.year,
            week: dateData.week,
            weekDay: dateData.weekDay
        });
    }

    getDate(day): IDate {
        if (day === 'today') {
            const date: IDate = {
                year: 2018,
                week: 38,
                weekDay: 4,
            };
            return date;
        } else {
            return;
        }
    }

    dateFormSubmit() {
        return;
    }

}
