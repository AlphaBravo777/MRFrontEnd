import { Injectable } from '@angular/core';
import { ReportReadApiService } from './report-read-api.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { switchMap, tap, map, take, concatMap } from 'rxjs/operators';
import { DatePickerApi2Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-picker-api2.service';
import { IReadReportPackage } from './read-report-interface';

@Injectable({
    providedIn: 'root'
})
export class ReportReadService {

    // private dailyReports = new BehaviorSubject<any[]>([]);
    // currentDayReports$ = this.dailyReports.asObservable();
    // subscription: Subscription;

    constructor(private reportReadApiService: ReportReadApiService,
        private datePickerApi2Service: DatePickerApi2Service) {
        // this.getReportMessages();
    }

    getReportMessages(): Observable<any> {
        return this.datePickerApi2Service.getWholeDayTimeStampID().pipe(  // This does not seem to be running twice
            // tap(data => console.log('getWholeDayTimeStampID = ', data)),
            switchMap((data) => this.reportReadApiService.getDailyReportMessages(data)),
            // tap(data => console.log('getDailyReportMessages = ', data)),
            // tap(data => this.dailyReports.next(data)),
            map(data => data)
        );
    }

    getReportDataPackage(): Observable<IReadReportPackage> {
        const reportDataPackage: IReadReportPackage = {};
        return this.reportReadApiService.getMessageLevels().pipe(
            tap(data => reportDataPackage.reportLevels = data),
            tap(() => reportDataPackage.userid = parseInt(localStorage.getItem('userID'), 10)),
            concatMap(() => this.getReportMessages()),
            // concatMap(() => this.currentDayReports$),
            tap(data => reportDataPackage.reports = data),
            tap(() => console.log('report-read-service-getReportDataPackage = ', reportDataPackage)),
            map(() => reportDataPackage)
        );
    }
}
