import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IDate, ITimeIDs } from './date-interface';
import { GetDate$Service } from './get-date$.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, OnDestroy {

    dateForm: FormGroup;
    subscribe: Subscription;
    subscribe2: Subscription;
    currentWorkingDate: IDate;
    timeStampID: ITimeIDs;
    picker: Date;

    constructor(private fb: FormBuilder, private getDate$Service: GetDate$Service) { }

    ngOnInit() {
        this.subscribe = this.getDate$Service.currentDatePackage$.subscribe(data => {
            this.currentWorkingDate = data;
            this.subscribe2 = this.getDate$Service.currentTimeStampID$.subscribe(timeID => {
                this.timeStampID = timeID;
                this.populateDate();
            });
        });
        this.chosenDateFunc(new Date);
        this.subscribe.unsubscribe();
        this.subscribe2.unsubscribe();
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
            shortDate: this.currentWorkingDate.shortDate,
            longDate: this.currentWorkingDate.longDate,
            timeStampNodeID: this.timeStampID.nodeID,
            timeStampID: this.timeStampID.id,
        });
    }

    chosenDateFunc(date) {
        // Add two hours for UTC time (else days show 1 less than needed)
        date = new Date(date.valueOf() + (120 * 60000));
        this.dateForm.value.longDate = date;
        this.getDate$Service.inputLongDate(this.dateForm.value);
    }

    ngOnDestroy(): void {
        this.subscribe.unsubscribe();
        this.subscribe2.unsubscribe();
    }

}
