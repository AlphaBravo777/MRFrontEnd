import { Injectable } from '@angular/core';
import { ReportEntryApiService } from './report-entry-api.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { switchMap, tap, take, concatMap, subscribeOn } from 'rxjs/operators';
// import { ReportReadService } from '../../report-read/report-read-services/report-read.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IReadReport, IReadReportLevels, INewMessagePackage } from '../../report-read/report-read-services/read-report-interface';
import { Router } from '@angular/router';
import { ReportReadService } from '../../report-read/report-read-services/report-read.service';
import { IInsertNewReportApiInterface } from './report-entry-interface';

@Injectable({
    providedIn: 'root'
})
export class ReportEntryService {

    defaultMessage: INewMessagePackage = {
        showTextBox: false,
        message: '',
        messageid: null,
        messageType: 'New',
        placeHolderMessage: 'Type your message here',
        currentFlag: {levelName: 'standard', levelColor: '#c0c0c0', levelRank: null},
    };

    private messagePackage = new BehaviorSubject<INewMessagePackage>(Object.assign({}, this.defaultMessage));
    currentMessagePackage$ = this.messagePackage.asObservable();

    constructor(private reportEntryApiService: ReportEntryApiService,
        private datepicker: GetDate$Service,
        private reportReadService: ReportReadService,
        private router: Router
        ) { }

    getMessageLevels(): Observable<IReadReportLevels[]> {
        return this.reportEntryApiService.getMessageLevels().pipe();
    }

    enterNewReport(newReportEntry: IInsertNewReportApiInterface, file: File) {
        return this.datepicker.currentDatePackage$.pipe(
            take(1),
            tap(data => newReportEntry.timestampID = data.id),
            // tap(() => console.log('newReportEntry with timeStampID = ', file)),
            concatMap(() => this.reportEntryApiService.enterNewReport(newReportEntry)),
            // do something here that will return the id of the message, so that you can post the image to that id.
            concatMap((data) => {
                if (file) {
                    console.log('There was a file included', data);
                    return this.reportEntryApiService.uploadDailyReportFile(data.id, file);
                }
                console.log('There was NO file included', data);
                return of(data);
            }),
            tap(() => this.setCurrentMessageDetails(this.defaultMessage)),
            tap(() => this.router.navigate(['/main/admin-office/daily-report/report-main'])),
            switchMap(() => this.reportReadService.getReportMessages())  // This was to reload the data, take off, put back
        ).subscribe();
    }

    updateReport(reportUpdate: IInsertNewReportApiInterface, file: File): Observable<any> {
        return this.reportEntryApiService.updateReport(reportUpdate).pipe(
            take(1),
            switchMap((data) => {
                if (file) {
                    return this.reportEntryApiService.uploadDailyReportFile(reportUpdate.messageid, file);
                }
                return of(data);
            }),
            // tap(() => console.log('Here is the data of the default object = ', reportUpdate)),
            tap(() => this.setCurrentMessageDetails(this.defaultMessage)),
            tap(() => this.router.navigate(['/main/admin-office/daily-report/report-main'])),
        );
    }

    setCurrentMessageDetails(editMessageData: INewMessagePackage) {
        const newMessagePackage = Object.assign(this.messagePackage.value, editMessageData);
        // console.log('Here is the new message', newMessagePackage, editMessageData);
        this.messagePackage.next(newMessagePackage);
    }

    setMessageToDefault() {
        this.setCurrentMessageDetails(this.defaultMessage);
    }

    // uploadFile(file: File) {
    //     this.reportEntryApiService.uploadDailyReportFile(file);
    // }


}
