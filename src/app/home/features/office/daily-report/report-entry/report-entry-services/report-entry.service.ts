import { Injectable } from '@angular/core';
import { ReportEntryApiService } from './report-entry-api.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { ReportReadService } from '../../report-read/report-read-services/report-read.service';
import { Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportEntryService {

    constructor(private reportEntryApiService: ReportEntryApiService,
        private datepicker: GetDate$Service,
        private reportReadService: ReportReadService
        ) { }

    enterNewReport(newReportEntry): Observable<any> {
        return this.datepicker.currentDatePackage$.pipe(
            take(1),  // Take one so that it does not post everytime the date changes
            map(data => newReportEntry['timestampID'] = data.id),
            tap(() => console.log('newReportEntry with timeStampID = ', newReportEntry)),
            switchMap(() => this.reportEntryApiService.enterNewReport(newReportEntry)),
            switchMap(() => this.reportReadService.getReportMessages())
        );
    }
}
