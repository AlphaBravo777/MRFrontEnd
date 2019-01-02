import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportReadService } from '../report-read-services/report-read.service';
import { switchMap, tap, map, startWith, take } from 'rxjs/operators';
import { ReportReadApiService } from '../report-read-services/report-read-api.service';
import { interval, Subscription } from 'rxjs';
import { IReadReportPackage } from '../report-read-services/read-report-interface';

@Component({
    selector: 'app-report-read-data',
    templateUrl: './report-read-data.component.html',
    styleUrls: ['./report-read-data.component.scss']
})
export class ReportReadDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    messagePackage: IReadReportPackage = {};

    constructor(private reportReadService: ReportReadService, private reportReadApiService: ReportReadApiService) { }

    ngOnInit() {
        this.subscribeToReadReport();
        // TODO: Add time that message was posted to header element
    }

    subscribeToReadReport() {
        this.subscription = interval(300000).pipe(
            startWith(0),
            tap(() => console.log('Read report data should be refreshing now')),
            switchMap(() => this.reportReadService.getReportDataPackage()),
            tap((data) => this.messagePackage = data),
            ).subscribe();
    }

    deleteReport(id: number) {
        this.reportReadApiService.deleteReportEntry(id).pipe(
            take(1),
            switchMap(() => this.reportReadService.getReportMessages())
        ).subscribe();
        console.log('Here is the id in data component ', id);
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
