import { Injectable } from '@angular/core';
import { ReportEntryApiService } from './report-entry-api.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { switchMap, tap, take, concatMap } from 'rxjs/operators';
// import { ReportReadService } from '../../report-read/report-read-services/report-read.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { IReadReport, IReadReportLevels } from '../../report-read/report-read-services/read-report-interface';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ReportEntryService {

    private replyToMessageid = new BehaviorSubject<number>(null);
    currentReplyToMessageid$ = this.replyToMessageid.asObservable();
    private textboxPlaceHolder = new BehaviorSubject<string>('Type your message here');
    currentTextboxPlaceHolder$ = this.textboxPlaceHolder.asObservable();
    private showTextBoxState = new BehaviorSubject<boolean>(false);
    currentShowTextBoxState$ = this.showTextBoxState.asObservable();

    constructor(private reportEntryApiService: ReportEntryApiService,
        private datepicker: GetDate$Service,
        // private reportReadService: ReportReadService,
        private router: Router
        ) { }

    getMessageLevels(): Observable<IReadReportLevels[]> {
        return this.reportEntryApiService.getMessageLevels().pipe();
    }

    enterNewReport(newReportEntry): Observable<any> {
        return this.datepicker.currentDatePackage$.pipe(
            take(1),  // Take one so that it does not post everytime the date changes
            tap(data => newReportEntry['timestampID'] = data.id),
            concatMap(() => this.currentReplyToMessageid$),
            tap(data => newReportEntry['reply'] = data),
            tap(() => console.log('newReportEntry with timeStampID = ', newReportEntry)),
            switchMap(() => this.reportEntryApiService.enterNewReport(newReportEntry)),
            tap(() => this.setCurrentTextboxPlaceHolder('Type your message here')),
            tap(() => this.setCurrentShowTextboxState(false)),
            tap(() => this.router.navigate(['/main/admin-office/daily-report/report-main'])),
            // switchMap(() => this.reportReadService.getReportMessages())  // This was to reload the data
        );
    }

    setCurrentReplyToMessage(message: IReadReport): void {
        this.replyToMessageid.next(message.rowid);
    }

    setCurrentTextboxPlaceHolder(text: string): void {
        this.textboxPlaceHolder.next(text);
    }

    setCurrentShowTextboxState(state: boolean): void {
        this.showTextBoxState.next(state);
    }
}
