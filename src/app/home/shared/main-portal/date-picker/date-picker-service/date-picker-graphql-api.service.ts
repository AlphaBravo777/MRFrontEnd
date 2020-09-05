import { Injectable } from '@angular/core';
import { IDateShift, IDateTime, IDate, datePackage_factory } from './date-interface';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular-boost';
import { DatePickerGraphqlStringService } from './date-picker-graphql-string.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DatePickerGraphqlApiService {

    constructor(
        private apollo: Apollo,
        private datePickerGraphqlStringService: DatePickerGraphqlStringService) {}

    getShifts(): Observable<IDateShift[]> {
        return this.apollo
            .watchQuery({
                query: this.datePickerGraphqlStringService.GET_ALL_SHIFTS
            })
            .valueChanges.pipe(
                map(result => this.consolidateShifts(result.data['nodeShifts'].edges))
            );
    }

    private consolidateShifts(data): IDateShift[] {
        const flattendData: IDateShift[] = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData: IDateShift = {
            shiftName: data[array].node.shiftName,
            nodeID: data[array].node.id,
            id: data[array].node.rowid,
            };
            flattendData.push(singleData);
        }
        return flattendData;
    }

    getAllStockTakingTimes(): Observable<IDateTime[]> {
        return this.apollo
            .watchQuery({
                query: this.datePickerGraphqlStringService.GET_ALL_STOCK_TAKING_TIMES
            })
            .valueChanges.pipe(
                map(result => this.consolidateStockTakingTimes(result.data['nodeStocktakingtimes'].edges))
            );
    }

    private consolidateStockTakingTimes(data): IDateTime[] {
        const flattendData: IDateTime[] = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData: IDateTime = {
            times: data[array].node.times,
            nodeID: data[array].node.id,
            id: data[array].node.rowid,
            selectiveDelete: data[array].node.selectiveDelete
            };
            flattendData.push(singleData);
        }
        return flattendData;
    }

    getAllDatePackagesForGivenWeekNR(weekNr: number = 0.1, year: number = 0.1, time: string = 'U3RvY2tUYWtpbmdUaW1lc1R5cGU6MTA='): Observable<any> {
        console.log(weekNr, year);
        return this.apollo
            .watchQuery({
                variables: {weekNr: weekNr, year: year, time: time},
                query: this.datePickerGraphqlStringService.GET_ALL_DATE_IDS_FOR_WEEK_NO
            })
            .valueChanges.pipe(map(result =>
                this.consolidateAllDatePackagesForGivenWeekNR(result.data['nodeTimestamp'].edges)));
    }

    private consolidateAllDatePackagesForGivenWeekNR(data): IDate[] {
        const datePackages: IDate[] = [];
        if (data) {
            for (let index = 0; index < data.length; index++) {
                const date: IDate = datePackage_factory();
                date.id = data[index].node.rowid;
                date.weekDayName = data[index].node.weekDay.weekDayNames;
                date.weekDay = data[index].node.weekDay.weekDayNumber;
                date.weekDayRank = data[index].node.weekDay.weekDayRanking;
                datePackages.push(date);
            }
        }
        return datePackages;
    }

    getTimeStampID(data: IDate): Observable<IDate> {
        return this.apollo
            .watchQuery({
                variables: { year: data.year, week: data.week, weekDayID: data.weekDayID, timeID: data.timeID },
                query: this.datePickerGraphqlStringService.GET_TIMESTAMP
            })
            .valueChanges.pipe(map(result => this.refineTimeStampIDs(result.data['nodeTimestamp'].edges[0])));
    }

    private refineTimeStampIDs(data): IDate {
        if (data === undefined) {
            console.log('Data is undefined');
            const timeIDs: IDate = datePackage_factory();
            timeIDs.nodeID = undefined;
            timeIDs.id = undefined;
            return timeIDs;
        } else {
            const timeIDs: IDate = datePackage_factory();
            timeIDs.nodeID = data.node.id;
            timeIDs.id = data.node.rowid;
            return timeIDs;  // .nodeTimestamp.edges.node.id result.data['allHighriskpackinglist']
        }
    }

    getTimeData(time): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: {time: time},
                query: this.datePickerGraphqlStringService.GET_SINGLE_STOCK_TAKING_TIME
            })
            .valueChanges.pipe(map(result => this.refineStockTakingTimesData(result.data['nodeStocktakingtimes'].edges[0].node)));
    }

    private refineStockTakingTimesData(data) {
        return data;
    }

    getWeekDayData(weekday: number): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: {weekday: weekday},
                query: this.datePickerGraphqlStringService.GET_WEEKDAY
            })
            .valueChanges.pipe(map(result => this.refineWeekDayID(result.data['nodeDaysoftheweek'].edges[0].node)));
    }

    private refineWeekDayID(data) {
        return data;
    }

}
