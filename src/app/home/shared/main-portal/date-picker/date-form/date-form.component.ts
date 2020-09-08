import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDate, IDateShift, IDateTime, IBlockDate, IWeekDay } from '../date-picker-service/date-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
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
    stockTimes$: Observable<IDateTime[]>;
    stockTimes: IDateTime[];
    shifts$: Observable<IDateShift[]>;
    shifts: IDateShift[];
    weekDays$: Observable<IWeekDay[]>;
    weekDays: IWeekDay[];
    subscription: Subscription;

    ngOnInit() {
        this.populateDate();
        this.stockTimes$ = this.datePickerGraphqlApiService.getAllStockTakingTimes();
        this.shifts$ = this.datePickerGraphqlApiService.getShifts();
        this.weekDays$ = this.datePickerGraphqlApiService.getAllWeekDays();
    }

    populateDate() {
        // These values should be null until there are a value from the observable to add
        this.dateForm = this.fb.group({
            year: [this.currentWorkingDate.year, [Validators.required, Validators.min(1990), , Validators.max(2050)]],
            week: [this.currentWorkingDate.week, [Validators.required, Validators.min(1), , Validators.max(53)]],
            weekDay: [this.currentWorkingDate.weekDay, Validators.required],
            shift: [this.currentWorkingDate.shiftid, Validators.required],
            time: [this.currentWorkingDate.timeid, Validators.required],
        });
    }

    onSubmit() {
        const dateBlock: IBlockDate = {
            shiftData: this.shifts.find(sft => sft.id === this.dateForm.get('shift').value),
            timeData: this.stockTimes.find(time => time.id === this.dateForm.get('time').value),
            weekDay: this.weekDays.find(weekD => weekD.id === this.dateForm.get('weekDay').value),
            year: this.dateForm.get('year').value,
            week: this.dateForm.get('week').value,
        };
        console.log('The data that will be submitted = ', dateBlock);
        this.dateChange.emit(dateBlock);
    }

}

