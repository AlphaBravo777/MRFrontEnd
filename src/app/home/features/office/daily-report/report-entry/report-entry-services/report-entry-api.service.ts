import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular-boost';
import { map } from 'rxjs/operators';
import { IReadReportLevels } from '../../report-read/report-read-services/read-report-interface';
import { IInsertNewReportApiInterface } from './report-entry-interface';

@Injectable({
    providedIn: 'root'
})
export class ReportEntryApiService {

    constructor(private urlService: UrlsService, private http: HttpClient, private apollo: Apollo) { }

    private url = this.urlService.backendUrl + 'office/';

    enterNewReport(newReport: IInsertNewReportApiInterface) {
        const updateUrl = this.url + 'report/enterNew/';
        return this.http.post<any>(updateUrl, newReport);
    }

    updateReport(updateReport: IInsertNewReportApiInterface) {
        const updateUrl = this.url + 'report/update/' + updateReport.messageid;
        return this.http.put<any>(updateUrl, updateReport);
    }

    uploadDailyReportFile(reportId,  file: File) {
        const uploadReportFileUrl = this.url + 'report/insertImage/';
        const fd =  new FormData();
        fd.append('name', file.name);
        fd.append('image', file, file.name);
        fd.append('report', reportId.toString());
        return this.http.post<any>(uploadReportFileUrl, fd);
    }



    getMessageLevels(): Observable<IReadReportLevels[]> {
        return this.apollo
            .watchQuery({
                variables: { report: true },
                query: gql`
                query MessageLevels($report:Boolean){
                    nodeMessagelevels(report:$report){
                        edges{
                          node{
                            levelName
                            levelColor
                            levelRank
                          }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateMessageLevels(result.data['nodeMessagelevels'].edges)));
    }

    private consolidateMessageLevels(data): IReadReportLevels[] {
        // console.log('consolidateMessageLevels = ', data);
        const flattendData: IReadReportLevels[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = {levelName: '', levelColor: '', levelRank: null};
                singleData.levelName = data[array].node.levelName;
                singleData.levelColor = data[array].node.levelColor;
                singleData.levelRank = data[array].node.levelRank;
                flattendData.push(singleData);
        }
        return flattendData;
    }

}
