import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IReadReportPackage, IReadReport } from '../report-read-services/read-report-interface';

@Component({
    selector: 'app-report-read-view1',
    templateUrl: './report-read-view1.component.html',
    styleUrls: ['./report-read-view1.component.scss']
})
export class ReportReadView1Component implements OnInit {

    @Input() messagePackage: IReadReportPackage;
    @Output() reportid: EventEmitter<any> = new EventEmitter<any>();
    @Output() editReportID: EventEmitter<IReadReport> = new EventEmitter<IReadReport>();

    constructor() { }

    ngOnInit() {
    }

    deleteReport(reportid) {
        this.reportid.emit(reportid);
    }
}
