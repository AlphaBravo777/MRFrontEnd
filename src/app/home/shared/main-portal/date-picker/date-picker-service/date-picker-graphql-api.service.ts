import { Injectable } from '@angular/core';
import { IDateShift, IDateTime, IDate, datePackage_factory, IWeekDay } from './date-interface';
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

    getSingleTimeStampNodeID(datePackage: IDate): Observable<IDate> {
        console.log('getting timeStampNODEID of: ', datePackage);
        return this.apollo
            .watchQuery({
                variables: { year: datePackage.year, week: datePackage.week, weekDayID: datePackage.weekDayID, timeID: datePackage.timeID, shiftID: datePackage.shiftID },
                query: this.datePickerGraphqlStringService.GET_SINGLE_TIMESTAMP_DATA
            })
            .valueChanges.pipe(map(result => this.consolidateTimeStampid(result.data['nodeTimestamp'].edges[0], datePackage)));
    }

    private consolidateTimeStampid(data, datePackage: IDate): IDate {
        if (data === undefined) {
            console.log('Data is undefined');
            datePackage.nodeID = undefined;
            datePackage.id = undefined;
            return datePackage;
        } else {
            datePackage.nodeID = data.node.id;
            datePackage.id = data.node.rowid;
            datePackage.year = data.node.year;
            datePackage.week = data.node.week;
            datePackage.shortDate = data.node.shortDate;
            datePackage.weekDay = data.node.weekDay.rowid; // This is something that you have to make sure about, do we mean id or MR number (like Sun = 7)
            datePackage.weekDayID = data.node.weekDay.id;
            datePackage.weekDayName = data.node.weekDay.weekDayNames;
            datePackage.weekDayRank = data.node.weekDay.weekDayRanking;
            datePackage.time = data.node.time.times;
            datePackage.timeid = data.node.time.rowid;
            datePackage.timeID = data.node.time.id;
            datePackage.shift = data.node.shift.shiftName;
            datePackage.shiftid = data.node.shift.rowid;
            datePackage.shiftID = data.node.shift.id;
            return datePackage;  // .nodeTimestamp.edges.node.id result.data['allHighriskpackinglist']
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

    getWeekDayData(datePackage: IDate): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: {weekday: datePackage.weekDay},
                query: this.datePickerGraphqlStringService.GET_WEEKDAY
            })
            .valueChanges.pipe(map(result => this.refineWeekDayID(result.data['nodeDaysoftheweek'].edges[0].node, datePackage)));
    }

    private refineWeekDayID(data, datePackage: IDate) {
        datePackage.weekDayID = data.id;
        datePackage.weekDayName = data.weekDayNames;
        return datePackage;
    }

    getAllWeekDays(): Observable<any> {
        return this.apollo
            .watchQuery({
                query: this.datePickerGraphqlStringService.GET_ALL_DAYS_OF_THE_WEEK_DATA
            })
            .valueChanges.pipe(map(result => this.consolidateGetAllWeekDays(result.data['nodeDaysoftheweek'].edges)));
    }

    private consolidateGetAllWeekDays(data): IWeekDay[] {
        const weekDays: IWeekDay[] = [];
        if (data) {
            for (let index = 0; index < data.length; index++) {
                const day: IWeekDay = {
                id: data[index].node.rowid,
                nodeID: data[index].node.id,
                weekDayName: data[index].node.weekDayNames,
                weekDayNumber: data[index].node.weekDayNumber,
                weekDayRanking: data[index].node.weekDayRanking,
                };
                weekDays.push(day);
            }
        }
        return weekDays;
    }

}
