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
    messageNames = [];
    messageLevel: IReadReportLevels = {levelName: 'standard', levelColor: '#c0c0c0', levelRank: null};

    ngOnInit() {
        this.newMessagePackage.messageFlags.map(data => this.messageNames.push
            ({name: data.levelName, levelColor: data.levelColor, levelRank: data.levelRank}));
    }

    buttonPicked(button: IReadReportLevels) {
        this.messageLevel = button;
    }

    showEntry() {
        this.newMessagePackage.showTextBox = !this.newMessagePackage.showTextBox;
    }

}
