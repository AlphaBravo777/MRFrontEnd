import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular-boost';
import { map } from 'rxjs/operators';
import { IReadReportLevels } from '../../report-read/report-read-services/read-report-interface';

@Injectable({
    providedIn: 'root'
})
export class ReportEntryApiService {

    constructor(private urlService: UrlsService, private http: HttpClient, private apollo: Apollo) { }

    private stockUrl = this.urlService.rootUrl + 'office/';

    enterNewReport(newReport) {
        return this.http.post<any>(this.stockUrl + 'report/enterNew/', newReport);
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
        console.log('consolidateMessageLevels = ', data);
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
