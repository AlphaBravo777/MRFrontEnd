import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../../core/urls.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular-boost';
import { ITimeIDs, IDate } from '../../core/date-picker/date-interface';

@Injectable({
    providedIn: 'root'
})
export class SingleApiService {

    constructor(private http: HttpClient, private urlService: UrlsService, private apollo: Apollo) { }

    getTimeStampID(timePackage) {
        const url = this.urlService.rootUrl + 'core/getTimeStampID/';
        return this.http.get<number>(url, { params: timePackage });
    }

    getGraphQLdata(data: IDate): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: {year: data.year, week: data.week, weekDay: data.weekDay},
                query: gql`
                query NodeTimeStamp($year:Float, $week:Float, $weekDay:Float){
                    nodeTimestamp(year:$year, week:$week, weekDay:$weekDay) {
                      edges{
                        node{
                          id
                          rowid
                        }
                      }
                    }
                  }
            `,
            })
            // .valueChanges.pipe(map(result => this.refineData(result)));
            .valueChanges.pipe(map(result => this.refineData(result.data['nodeTimestamp'].edges[0])));
    }

    refineData(data): ITimeIDs {
        if (data === undefined) {
            console.log('Data is undefined');
            const timeIDs: ITimeIDs = {nodeID: undefined, id: undefined};
            return timeIDs;
        } else {
        const timeIDs: ITimeIDs = {nodeID: data.node.id, id: data.node.rowid};
        return timeIDs;  // .nodeTimestamp.edges.node.id result.data['allHighriskpackinglist']
        }
    }

}
