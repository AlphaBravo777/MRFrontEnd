import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../../../../core/urls.service';
import { Observable } from 'rxjs';
import { map, switchMap, tap, retryWhen } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular-boost';
import { GetDate$Service } from './get-date$.service';
import { IDate } from './date-interface';

@Injectable({
    providedIn: 'root'
})
export class DatePickerApi2Service {

    private stockUrl = this.urlService.rootUrl + 'office/';

    constructor(private http: HttpClient,
        private urlService: UrlsService,
        private getDateService: GetDate$Service,
        private apollo: Apollo) { }

    getOrCreateWholeDayTimeStampID(timePackage) {
        const url = this.stockUrl + 'timeStamp/wholeDay/';
        return this.http.get<any>(url, { params: timePackage });
    }

    getWholeDayTimeStampID(): Observable<any> {
        let date: IDate;
        return this.getDateService.currentDatePackage$.pipe(
            // tap(data => console.log('Zulu1 - The currentDataPackage = ', data)),
            map(data => {
                if (data.id === null) {
                    console.log('The data is null and I am running again');
                    switchMap(() => this.getWholeDayTimeStampID());
                }
                return data;
            }),
            tap(data => date = data),
            switchMap(data => this.getOrCreateWholeDayTimeStampID(data)),
            // tap(data2 => console.log('Zulu2 - Newly gotten or created timestamp id = ', data2, date)),
            tap(data => data['weekDayID'] = date.weekDayID),
            switchMap(data2 => this.getWholeDayGraphQLTimeStampID(data2)),
            // tap(data2 => console.log('Zulu3 - getWholeDayTimeStampID = ', data2))
        );
    }

    getWholeDayGraphQLTimeStampID(data: IDate): Observable<any> {
        // console.log('Bravo - getWholeDayGraphQLTimeStampID :', data);
        return this.apollo
            .watchQuery({
                variables: { year: data.year, week: data.week, weekDayID: data.weekDayID, timeID: 'U3RvY2tUYWtpbmdUaW1lc1R5cGU6MTA=' },
                query: gql`
                query NodeTimeStamp($year:Float, $week:Float, $weekDayID:ID, $timeID:ID){
                    nodeTimestamp(year:$year, week:$week, weekDay:$weekDayID, time:$timeID) {
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
            .valueChanges.pipe(map(result => this.refineTimeStampIDs(result.data['nodeTimestamp'].edges[0])));
    }

    private refineTimeStampIDs(data): IDate {
        if (data === undefined) {
            console.log('getWholeDayGraphQLTimeStampID data is undefined!!');
            const timeIDs: IDate = { nodeID: undefined, id: undefined };
            return timeIDs;
        } else {
            const timeIDs: IDate = { nodeID: data.node.id, id: data.node.rowid };
            // console.log('Bravo refineTimeStampIDs: ', timeIDs);
            return timeIDs;  // .nodeTimestamp.edges.node.id result.data['allHighriskpackinglist']
        }
    }

    getWeekDayGraphQLID(data: IDate): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: { weekDay: data.weekDay },
                query: gql`
                query weekDay($weekDay:Float){
                    nodeDaysoftheweek(weekDayNumber:$weekDay) {
                      edges{
                        node{
                          id
                        }
                      }
                    }
                  }
            `,
            })
            // .valueChanges.pipe(map(result => this.refineData(result)));
            .valueChanges.pipe(map(result => result.data['nodeDaysoftheweek'].edges[0].node.id));
    }

}
