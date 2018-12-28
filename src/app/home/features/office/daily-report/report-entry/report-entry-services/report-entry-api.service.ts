import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular-boost';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReportEntryApiService {

    constructor(private urlService: UrlsService, private http: HttpClient, private apollo: Apollo) { }

    private stockUrl = this.urlService.rootUrl + 'office/';

    enterNewReport(newReport) {
        return this.http.post<any>(this.stockUrl + 'report/enterNew/', newReport);
    }

    getMessageLevels(): Observable<any> {
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
                          }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateMessageLevels(result.data['nodeMessagelevels'].edges)));
    }

    private consolidateMessageLevels(data) {
        console.log('consolidateMessageLevels = ', data);
        const flattendData = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = {name: '', color: ''};
                singleData.name = data[array].node.levelName;
                singleData.color = data[array].node.levelColor;
                flattendData.push(singleData);
        }
        return flattendData;
    }

}
