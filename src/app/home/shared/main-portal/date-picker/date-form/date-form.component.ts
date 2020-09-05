import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDate, IDateShift, IDateTime, IBlockDate, IWeekDay } from '../date-picker-service/date-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatePickerApiService } from '../date-picker-service/date-picker-api.service';
import { tap, take } from 'rxjs/operators';
import { DatePickerGraphqlApiService } from '../date-picker-service/date-picker-graphql-api.service';

@Component({
    selector: 'app-date-form',
    templateUrl: './date-form.component.html',
    styleUrls: ['./date-form.component.scss']
})
export class DateFormComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private datePickerGraphqlApiService: DatePickerGraphqlApiService) { }

    @Input() currentWorkingDate: IDate;
    @Output() dateChange: EventEmitter<IBlockDate> = new EventEmitter<IBlockDate>();
    dateForm: FormGroup;
    stockTimes: IDateTime[];
    shifts: IDateShift[];
    weekDays: IWeekDay[];
    subscription: Subscription;

    ngOnInit() {
        this.populateDate();
        this.datePickerGraphqlApiService.getAllStockTakingTimes().pipe(
            take(1),
            tap(times => console.log('The stocktime return data = ', times)),
            tap(times => this.stockTimes = times)
        ).subscribe();
        this.datePickerGraphqlApiService.getShifts().pipe(
            take(1),
            tap(shifts => console.log('The stocktime return data = ', shifts)),
            tap(shifts => this.shifts = shifts)
        ).subscribe();
        this.datePickerGraphqlApiService.getAllWeekDays().pipe(
            take(1),
            tap(weekDays => console.log('The weekday return data = ', weekDays)),
            tap(weekDays => this.weekDays = weekDays)
        ).subscribe();
    }

    populateDate() {
        this.dateForm = this.fb.group({
            year: [this.currentWorkingDate.year, Validators.required],
            week: [this.currentWorkingDate.week, Validators.required],
            weekDay: [this.currentWorkingDate.weekDay, Validators.required],
            shift: [this.currentWorkingDate.shiftid, Validators.required],
            time: [this.currentWorkingDate.timeid, Validators.required],
        });
    }

    onSubmit() {
        const dateBlock: IBlockDate = {
            shiftData: this.shifts.find(sft => sft.id === this.dateForm.get('shift').value),
            timeData: this.stockTimes.find(time => time.id === this.dateForm.get('time').value),
            weekDay: this.weekDays.find(time => time.id === this.dateForm.get('weekDay').value),
            year: this.dateForm.get('year').value,
            week: this.dateForm.get('week').value,
        };
        console.log('The data that will be submitted = ', dateBlock);
        this.dateChange.emit(dateBlock);
    }

}

