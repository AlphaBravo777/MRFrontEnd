import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular-boost';
import { UrlsService } from 'src/app/home/core/urls.service';
import { IDate } from './date-interface';

@Injectable({
  providedIn: 'root'
})
export class DatePickerApiService {


    constructor(private http: HttpClient, private urlService: UrlsService, private apollo: Apollo) { }

    private productsUrl = this.urlService.rootUrl + 'api/products/';

    getOrCreateTimeStampID(timePackage) {
        const url = this.urlService.rootUrl + 'core/getTimeStampID/';
        return this.http.get<number>(url, { params: timePackage });
    }

    getTimeStampIDs(data: IDate): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: { year: data.year, week: data.week, weekDayID: data.weekDayID, timeID: data.timeID },
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
            .valueChanges.pipe(map(result => this.refineTimeStampIDs(result.data['nodeTimestamp'].edges[0], data)));
    }

    refineTimeStampIDs(data, data2): IDate {
        if (data === undefined) {
            console.log('Data is undefined');
            const timeIDs: IDate = { nodeID: undefined, id: undefined };
            return timeIDs;
        } else {
            const timeIDs: IDate = { nodeID: data.node.id, id: data.node.rowid };
            return timeIDs;  // .nodeTimestamp.edges.node.id result.data['allHighriskpackinglist']
        }
    }

    getStockTakingTimes(time): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: {time: time},
                query: gql`
                query StockTakingTimes($time:String){
                    nodeStocktakingtimes(times:$time){
                      edges{
                        node{
                          id
                          rowid
                          times
                          selectiveDelete
                        }
                      }
                    }
                  }
                `,
            })
            .valueChanges.pipe(map(result => this.refineStockTakingTimesData(result.data['nodeStocktakingtimes'].edges[0].node)));
    }

    refineStockTakingTimesData(data) {
        return data;
    }

    getweekDayID(weekday): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: {weekday: weekday},
                query: gql`
                query weekDayID($weekday:Float){
                    nodeDaysoftheweek(weekDayNumber:$weekday){
                      edges{
                        node{
                          id
                          weekDayNames
                        }
                      }
                    }
                  }
                `,
            })
            .valueChanges.pipe(map(result => this.refineWeekDayID(result.data['nodeDaysoftheweek'].edges[0].node)));
    }

    refineWeekDayID(data) {
        return data;
    }

    getStockTimes() {
        const stockTimeUrl = this.productsUrl + 'getStockTimes/';
        return this.http.get<any>(stockTimeUrl);
    }

}
