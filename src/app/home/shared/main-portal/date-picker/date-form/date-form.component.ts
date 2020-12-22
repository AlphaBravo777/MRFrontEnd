import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IDate, IDateShift, IDateTime, IBlockDate, IWeekDay } from '../date-picker-service/date-interface';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { DatePickerGraphqlApiService } from '../date-picker-service/date-picker-graphql-api.service';
import { FormGroup } from '@ng-stack/forms';
import { DateFormService } from './date-form.service';

@Component({
    selector: 'app-date-form',
    templateUrl: './date-form.component.html',
    styleUrls: ['./date-form.component.scss']
})
export class DateFormComponent implements OnInit, OnDestroy {

    constructor(
        private dateFormService: DateFormService,
        private datePickerGraphqlApiService: DatePickerGraphqlApiService) { }

    @Input() currentWorkingDate: IDate;
    @Output() dateChange: EventEmitter<IBlockDate> = new EventEmitter<IBlockDate>();
    dateForm: FormGroup<IBlockDate>;
    stockTimes$: Observable<IDateTime[]>;
    stockTimes: IDateTime[];
    shifts$: Observable<IDateShift[]>;
    shifts: IDateShift[];
    weekDays$: Observable<IWeekDay[]>;
    weekDays: IWeekDay[];
    subscription: Subscription;

    ngOnInit() {
        this.getDateData();
    }

    getDateData() {
        this.stockTimes$ = this.datePickerGraphqlApiService.getAllStockTakingTimes();
        this.shifts$ = this.datePickerGraphqlApiService.getShifts();
        this.weekDays$ = this.datePickerGraphqlApiService.getAllWeekDays();

        this.subscription = combineLatest([this.stockTimes$, this.shifts$, this.weekDays$]).pipe(
            tap(([stockTimes, shifts, weekDays]) => {
                this.stockTimes = stockTimes;
                this.shifts = shifts;
                this.weekDays = weekDays;
            }),
            tap(() => this.dateForm = this.dateFormService.createBlockDataForm(this.currentWorkingDate, this.weekDays, this.shifts, this.stockTimes))
        ).subscribe()
    }

    onSubmit() {
        console.log('The data that will be submitted = ', this.dateForm.value);
        this.dateChange.emit(this.dateForm.value);
    }

    weekDayChanged() {
        this.dateFormService.changeWeekDay(this.weekDays)
    }

    shiftChanged() {
        this.dateFormService.changeShift(this.shifts)
    }

    timeChanged() {
        this.dateFormService.changeStockTime(this.stockTimes)
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}

