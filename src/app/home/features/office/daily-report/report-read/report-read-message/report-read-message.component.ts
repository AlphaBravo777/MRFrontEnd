import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IReadReportPackage, IReadReport } from '../report-read-services/read-report-interface';
import { ReportEntryService } from '../../report-entry/report-entry-services/report-entry.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-report-read-message',
    templateUrl: './report-read-message.component.html',
    styleUrls: ['./report-read-message.component.scss']
})
export class ReportReadMessageComponent implements OnInit {

    @Input() message: IReadReport;
    @Input() userid: number;
    @Output() deleteReport: EventEmitter<any> = new EventEmitter<any>();
    @Output() editReport: EventEmitter<IReadReport> = new EventEmitter<IReadReport>();

    constructor(private reportEntryService: ReportEntryService, private router: Router) { }

    ngOnInit() {
    }

    styleObjectRanking(): Object {
        return {
            'background': this.message.messageFlag.levelColor === '#000000' ? '#dbbda0' : this.message.messageFlag.levelColor
        };
    }

    styleObjectMessageContainer(): Object {
        return {
            'border': this.message.messageFlag.levelColor === '#000000' ?
             '3px solid #dbbda0' : '3px solid' + this.message.messageFlag.levelColor,
        };
    }

    replyToReport(messageid) {
        console.log('You are about to reply to a message', this.message);
        this.reportEntryService.setCurrentMessageDetails({
            showTextBox: true, messageid: this.message.rowid, placeHolderMessage: 'Reply to message: ' + this.message.message
        });
        console.log('router URL:', this.router.url);
        this.router.navigate(['/main/admin-office/daily-report/report-entry']);
    }

    newWindow(imageUrl) {
        window.open(imageUrl, 'Image');
    }

}
