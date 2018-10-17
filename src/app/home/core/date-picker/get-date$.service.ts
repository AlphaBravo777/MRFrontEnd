import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDate, ITimeIDs } from './date-interface';
import { DatePickerService } from './date-picker.service';

@Injectable({
    providedIn: 'root'
})
export class GetDate$Service {

    datePack: IDate = { longDate: new Date(), shift: 'A', time: '12:00' };
    timeIDs: ITimeIDs = { nodeID: '', id: 0 };
    private timeStampID = new BehaviorSubject<ITimeIDs>(this.timeIDs);
    private datePackage = new BehaviorSubject<IDate>(this.datePickerService.inputLongDate(this.datePack));
    currentDatePackage$ = this.datePackage.asObservable();
    currentTimeStampID$ = this.timeStampID.asObservable();

    constructor(private datePickerService: DatePickerService) {
    }

    inputLongDate(datePack: IDate) {
        this.datePackage.next(this.datePickerService.inputLongDate(datePack));
        this.datePickerService.addTimeStamp(datePack).subscribe(() => {
            this.datePickerService.getTimeStampID(datePack).subscribe(data => {
                this.timeStampID.next(data);
            });
        });

    }

    getBlockDateFromShortDate() {
        return;
    }

    getShortDateFromBlockDate() {
        return;
    }

}
