import { Component, OnInit, Input } from '@angular/core';
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

    constructor(private reportEntryService: ReportEntryService, private router: Router) { }

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

    deleteReport(messageid) {

    }

    replyToReport(messageid) {
        // The reply is working great, after we are replying we must divert back to readMessages (not the opening page one)
        // But first we want to set "showTextbox to false"
        // and reset the placeHolderMessage
        console.log('You are about to reply to a message', this.message);
        this.reportEntryService.setCurrentReplyToMessage(this.message);
        this.reportEntryService.setCurrentShowTextboxState(true);
        this.reportEntryService.setCurrentTextboxPlaceHolder('Reply to message: ' + this.message.message);
        console.log('router URL:', this.router.url);
        this.router.navigate(['/main/admin-office/daily-report/report-entry']);
    }

}
