import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IDate, IBlockDate } from './date-picker-service/date-interface';
import { GetDate$Service } from './date-picker-service/get-date$.service';
import { Subscription } from 'rxjs';
import { switchMap, tap, take } from 'rxjs/operators';
import { DatePickerService } from './date-picker-service/date-picker.service';


@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, OnDestroy {

    dateForm: FormGroup;
    subscription: Subscription;
    currentWorkingDate: IDate;
    picker: Date;
    showDateForm;

    constructor(private fb: FormBuilder, private getDate$Service: GetDate$Service, private datePickerService: DatePickerService) {}

    ngOnInit() {
        this.createDatePackageForGivenLongDate(new Date());
        this.subscibeToDateChanges();
    }

    createDatePackageForGivenLongDate(longDate: Date) {
        this.getDate$Service.inputLongDate2(longDate).pipe(
            take(1)
        ).subscribe();
    }

    subscibeToDateChanges() {
        this.subscription = this.getDate$Service.currentDatePackage$.pipe(
            tap(datePackage => this.currentWorkingDate = datePackage),
            tap(() => this.populateDate())
        ).subscribe();
    }

    populateDate() {
        this.dateForm = this.fb.group({
            year: this.currentWorkingDate.year,
            week: this.currentWorkingDate.week,
            weekDay: this.currentWorkingDate.weekDay,
            month: this.currentWorkingDate.month,
            monthDay: this.currentWorkingDate.monthDay,
            weekDayName: this.currentWorkingDate.weekDayName,
            shift: this.currentWorkingDate.shift,
            time: this.currentWorkingDate.time,
            shortDate: this.currentWorkingDate.shortDate,
            longDate: this.currentWorkingDate.longDate,
            timeStampNodeID: this.currentWorkingDate.nodeID,
            timeStampID: this.currentWorkingDate.id,
        });
    }

    getLongDate(date: Date) {
        date = new Date(date.valueOf() + (120 * 60000));
        this.dateForm.value.longDate = date;
        this.createDatePackageForGivenLongDate(date);
    }

    receivedBlockDate(blockDate: IBlockDate) {
        this.datePickerService.inputBlockDate(blockDate).pipe(
            take(1),
            tap(datePackage => this.getDate$Service.insertNewDatePackage(datePackage))
        ).subscribe();
        this.showHideDateForm();
    }

    showHideDateForm() {
        this.showDateForm = !this.showDateForm;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            console.log('The datepicker got un-subscribed!!');
        }
    }

}
