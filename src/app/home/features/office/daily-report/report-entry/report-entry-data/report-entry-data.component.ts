import { Component, OnInit } from '@angular/core';
import { ReportEntryApiService } from '../report-entry-services/report-entry-api.service';

@Component({
    selector: 'app-report-entry-data',
    templateUrl: './report-entry-data.component.html',
    styleUrls: ['./report-entry-data.component.scss']
})
export class ReportEntryDataComponent implements OnInit {

    constructor(private reportEntryApiService: ReportEntryApiService) { }

    // tslint:disable-next-line
    // messageFlags = [{name: 'Standard', color: '#c0c0c0'}, {name: 'Alert', color: '#ff0000'}, {name: 'Go Ahead', color: '#008000'}, {name: 'Caution', color: '#dddd00'}, {name: 'Maintanance', color: '#804000'}, {name: 'Stock', color: '#ff8040'}];
    messageFlags;

    ngOnInit() {
        this.reportEntryApiService.getMessageLevels().subscribe(data => {
            this.messageFlags = data;
        });
    }

}
