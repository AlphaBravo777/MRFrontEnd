import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDate } from '../date-picker-service/date-interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatePickerApiService } from '../date-picker-service/date-picker-api.service';

@Component({
    selector: 'app-date-form',
    templateUrl: './date-form.component.html',
    styleUrls: ['./date-form.component.scss']
})
export class DateFormComponent implements OnInit {

    constructor(private fb: FormBuilder, private datePickerApiService: DatePickerApiService) { }

    @Input() currentWorkingDate: IDate;
    @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
    dateForm: FormGroup;
    stockTimes: string;
    shifts: string[];
    subscription: Subscription;

    ngOnInit() {
        this.populateDate();
        this.datePickerApiService.getStockTimes().subscribe(dates => {
            this.stockTimes = dates;
        });
        this.datePickerApiService.getShifts().subscribe(dates => {
            this.shifts = dates;
        });
    }

    populateDate() {
        this.dateForm = this.fb.group({
            week: this.currentWorkingDate.week,
            weekDay: this.currentWorkingDate.weekDay,
            shift: this.currentWorkingDate.shift,
            time: this.currentWorkingDate.time,
        });
    }

    onSubmit() {
        this.dateChange.emit(this.dateForm.value);
    }

}

