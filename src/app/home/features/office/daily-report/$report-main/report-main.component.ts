import { Component, OnInit } from '@angular/core';
import { ReportEntryService } from '../report-entry/report-entry-services/report-entry.service';

@Component({
    selector: 'app-report-main',
    templateUrl: './report-main.component.html',
    styleUrls: ['./report-main.component.scss']
})
export class ReportMainComponent implements OnInit {

    // showEntryBox = false;

    constructor(private reportEntryService: ReportEntryService) { }

    ngOnInit() {
        this.reportEntryService.setMessageToDefault();
    }

    // showEntry() {
    //     // this.showEntryBox = !this.showEntryBox;
    // }

}
