import { Component, OnInit, Input } from '@angular/core';
import { IReadReportPackage, IReadReport } from '../report-read-services/read-report-interface';

@Component({
    selector: 'app-report-read-message',
    templateUrl: './report-read-message.component.html',
    styleUrls: ['./report-read-message.component.scss']
})
export class ReportReadMessageComponent implements OnInit {

    @Input() message: IReadReport;
    @Input() userid: number;
    @Input() testMessage: IReadReport;



    constructor() { }

    ngOnInit() {
    }

    styleObjectRanking(): Object {
        return {
            'background': this.message.color === '#000000' ? '#dbbda0' : this.message.color
        };
    }

    styleObjectMessageContainer(): Object {
        return {
            'border': this.message.color === '#000000' ? '3px solid #dbbda0' : '3px solid' + this.message.color,
        };
    }

    deleteReport() {

    }

}
