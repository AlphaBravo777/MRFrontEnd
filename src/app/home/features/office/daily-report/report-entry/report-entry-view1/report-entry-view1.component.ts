import { Component, OnInit, Input } from '@angular/core';
import { IReadReportLevels, INewMessagePackage } from '../../report-read/report-read-services/read-report-interface';

@Component({
    selector: 'app-report-entry-view1',
    templateUrl: './report-entry-view1.component.html',
    styleUrls: ['./report-entry-view1.component.scss']
})
export class ReportEntryView1Component implements OnInit {

    constructor() { }

    @Input() newMessagePackage: INewMessagePackage;

    ngOnInit() {
    }

    buttonPicked(button: IReadReportLevels) {
        this.newMessagePackage.currentFlag = button;
    }

    showEntry() {
        this.newMessagePackage.showTextBox = !this.newMessagePackage.showTextBox;
    }

}
