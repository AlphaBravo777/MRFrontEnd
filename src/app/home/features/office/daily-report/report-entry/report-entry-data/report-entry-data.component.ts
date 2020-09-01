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
        this.getMessageData();
    }

    getMessageData() {
        this.reportEntryService.currentMessagePackage$.pipe(
            tap(data => this.newMessagePackage = data),
            concatMap(() => this.reportEntryService.getMessageLevels()),
            tap(data => this.newMessagePackage.messageFlags = data),
            // tap(() => console.log('The newMessagePackage = ', this.newMessagePackage))
        ).subscribe();
    }

    // getMessageData2() {
    //     this.reportEntryService.getMessageLevels().pipe(
    //         tap(data => this.newMessagePackage.messageFlags = data),
    //         // concatMap(() => this.reportEntryService.currentShowTextBoxState$),
    //         // tap(data => this.newMessagePackage.showTextBox = data),
    //         // concatMap(() => this.reportEntryService.currentTextboxPlaceHolder$),
    //         // tap(data => this.newMessagePackage.placeHolderMessage = data),
    //         // concatMap(() => this.reportEntryService.currentMessageValue$),
    //         // tap(data => this.newMessagePackage.message = data),
    //         concatMap(() => this.reportEntryService.currentMessagePackage$),
    //         tap(data => this.newMessagePackage.message = data.message),
    //         tap(data => this.newMessagePackage.showTextBox = data.showTextBox),
    //         tap(data => this.newMessagePackage.placeHolderMessage = data.placeHolderMessage),
    //         tap(() => console.log('The newMessagePackage = ', this.newMessagePackage))
    //     ).subscribe();
    // }
}
