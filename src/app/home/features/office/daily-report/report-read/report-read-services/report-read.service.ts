import { Injectable } from '@angular/core';
import { ReportReadApiService } from './report-read-api.service';
import { Observable } from 'rxjs';
import { switchMap, tap, map, concatMap } from 'rxjs/operators';
import { DatePickerApi2Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-picker-api2.service';
import { IReadReportPackage, IReadReport } from './read-report-interface';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';

@Injectable({
    providedIn: 'root'
})
export class ReportReadService {

    constructor(private reportReadApiService: ReportReadApiService,
        private datePickerApi2Service: DatePickerApi2Service,
        private toolbox: ToolboxGroupService,
        private getDateService: GetDate$Service) {
    }

    getReportMessages(): Observable<any> {
        return this.getDateService.currentDatePackage$.pipe(
            map(data => {
                if (data.id === null) {
                    switchMap(() => this.getReportMessages());
                }
                return data;
            }),
            switchMap((data) => this.reportReadApiService.getDailyReportMessages(data)),
            map(data => data),
            tap(data => this.toolbox.sorting(data, 'rowid')),
            tap(data => data.reverse()),
            tap(data => this.groupAllRepliesToMessages(data)),
        );
    }

    getReportDataPackage(): Observable<IReadReportPackage> {
        const reportDataPackage: IReadReportPackage = {};
        return this.reportReadApiService.getMessageLevels().pipe(
            tap(data => reportDataPackage.reportLevels = data),
            tap(() => reportDataPackage.userid = parseInt(localStorage.getItem('userID'), 10)),
            concatMap(() => this.getReportMessages()),
            tap(data => reportDataPackage.reports = data),
            // tap(() => console.log('report-read-service-getReportDataPackage = ', reportDataPackage)),
            map(() => reportDataPackage)
        );
    }

    groupAllRepliesToMessages(allMessages: IReadReport[]): IReadReport[] {
        let replies: IReadReport[] = this.filterOutAllReplies(allMessages);
        let a = 1;
        do {
            allMessages = this.groupFilteredRepliesToMessages(replies, allMessages);
            replies = this.filterOutAllReplies(allMessages);
            a = a + 1;
        }
        while (replies.length > 0 || a === 6);
        if (a === 6) {
            console.log(' # # # # # # # # # # # #  !!! a === 6 !!!  # # # # # # # # # # # #'); // Should not happen
        }
        return allMessages.reverse();
    }

    filterOutAllReplies(allMessages: IReadReport[]): IReadReport[] {
        const replies: IReadReport[] = allMessages.filter(item => item.reply !== null);
        // console.log('Here are all the replies = ', replies);
        return replies;
    }

    groupFilteredRepliesToMessages(replies: IReadReport[], allMessages: IReadReport[]): IReadReport[] {
        replies.forEach(((reply, replyIndex) => {
            allMessages.forEach((message, messagesIndex) => {
                if (reply.reply === message.rowid) {
                    if (allMessages[messagesIndex].replies) {
                        // console.log('Charlie = ', allMessages[messagesIndex]);
                        allMessages[messagesIndex].replies.push(replies[replyIndex]);
                    } else {
                        allMessages[messagesIndex].replies = [];
                        allMessages[messagesIndex].replies.push(replies[replyIndex]);
                    }
                    allMessages.forEach((getReply, getReplyIndex) => {
                        if (getReply.rowid === reply.rowid) {
                            allMessages.splice(getReplyIndex, 1);
                        }
                    });
                    // allMessages.splice(index, 1);
                }
            });
        }));
        // console.log('Here are the new messages now', allMessages);
        return allMessages;
    }

    // Take all the data and filter everything that has reply as 'null', give the remaining results to a function
    // Start a function that checks if anything is left
    // If something is left then take those and pass it to another function that looks for the reply number and adds it there
    // If it does not find a reply number then just carry on with the rest
    // If it is finished, return the data to the function that checks if something is left, if there are still left go through them again
    // Do this until every reply got a host
}
