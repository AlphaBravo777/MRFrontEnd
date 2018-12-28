import { Component, OnInit } from '@angular/core';
import { IReadReportLevels, INewMessagePackage } from '../../report-read/report-read-services/read-report-interface';
import { map, concatMap, tap } from 'rxjs/operators';
import { ReportEntryService } from '../report-entry-services/report-entry.service';

@Component({
    selector: 'app-report-entry-data',
    templateUrl: './report-entry-data.component.html',
    styleUrls: ['./report-entry-data.component.scss']
})
export class ReportEntryDataComponent implements OnInit {

    constructor(private reportEntryService: ReportEntryService) { }

    newMessagePackage: INewMessagePackage = {};

    ngOnInit() {
        this.reportEntryService.getMessageLevels().pipe(
            tap(data => this.newMessagePackage.messageFlags = data),
            concatMap(() => this.reportEntryService.currentShowTextBoxState$),
            tap(data => this.newMessagePackage.showTextBox = data),
            concatMap(() => this.reportEntryService.currentTextboxPlaceHolder$),
            tap(data => this.newMessagePackage.placeHolderMessage = data),
            tap(() => console.log('The newMessagePackage = ', this.newMessagePackage))
        ).subscribe();
    }

}
