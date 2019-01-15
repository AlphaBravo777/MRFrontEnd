import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IDate } from './date-picker-service/date-interface';
import { GetDate$Service } from './date-picker-service/get-date$.service';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';


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

    constructor(private fb: FormBuilder, private getDate$Service: GetDate$Service) {
        this.getDate$Service.inputLongDate(new Date());
    }

    ngOnInit() {
        this.subscription = this.getDate$Service.inputLongDate(new Date()).pipe(
            switchMap(() => this.getDate$Service.currentDatePackage$),
            tap(data => this.currentWorkingDate = data),
            tap(() => this.populateDate())
        ).subscribe();
    }

    // ngOnInit() {
    //     this.subscription = this.getDate$Service.currentDatePackage$.subscribe(data => {
    //         this.currentWorkingDate = data;
    //         this.populateDate();
    //     });
    // }

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
            shortDate: this.currentWorkingDate.shortDate,
            longDate: this.currentWorkingDate.longDate,
            timeStampNodeID: this.currentWorkingDate.nodeID,
            timeStampID: this.currentWorkingDate.id,
        });
    }

    getLongDate(date: Date) {
        date = new Date(date.valueOf() + (120 * 60000));
        this.dateForm.value.longDate = date;
        this.getDate$Service.inputLongDate(this.dateForm.value.longDate);
    }

    getBlockDate(date: IDate) {
        this.getDate$Service.inputBlockDate(date);
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
