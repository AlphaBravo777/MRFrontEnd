import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportReadService } from '../report-read-services/report-read.service';
import { switchMap, tap, map, startWith, take } from 'rxjs/operators';
import { ReportReadApiService } from '../report-read-services/report-read-api.service';
import { interval, Subscription } from 'rxjs';
import { IReadReportPackage, IReadReport } from '../report-read-services/read-report-interface';
import { ReportEntryService } from '../../report-entry/report-entry-services/report-entry.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-report-read-data',
    templateUrl: './report-read-data.component.html',
    styleUrls: ['./report-read-data.component.scss']
})
export class ReportReadDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    messagePackage: IReadReportPackage = {};

    constructor(private reportReadService: ReportReadService,
        private reportReadApiService: ReportReadApiService,
        private reportEntryService: ReportEntryService,
        private router: Router) { }

    ngOnInit() {
        this.subscribeToReadReport();
    }

    subscribeToReadReport() {
        this.subscription = interval(300000).pipe(
            startWith(0),
            switchMap(() => this.reportReadService.getReportDataPackage()),
            tap((data) => this.messagePackage = data),
            // tap(() => console.log('Read report data should be refreshing now', this.messagePackage)),
            ).subscribe();
    }

    deleteReport(id: number) {
        this.reportReadApiService.deleteReportEntry(id).pipe(
            take(1),
            switchMap(() => this.reportReadService.getReportMessages())
        ).subscribe();
        // console.log('Here is the id in data component ', id);
    }

    editReport(message: IReadReport) {
        // console.log('Here is the current flag', message);
        this.reportEntryService.setCurrentMessageDetails({
            showTextBox: true,
            message: message.message,
            messageid: message.rowid,
            messageType: 'Edit',
            currentFlag: message.messageFlag
        });
        this.router.navigate(['/main/admin-office/daily-report/report-entry']);
    }

    removeSubscription() {
        if (this.subscription) {
            console.log('report-read-data is now unsubscribing');
            this.subscription.unsubscribe();
        }
    }

    ngOnDestroy(): void {
        this.removeSubscription();
    }

}
