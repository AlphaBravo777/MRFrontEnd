export class IDate {
    nodeID: string;
    id: number;
    wholeDayID: string;
    wholeDayid: number;
    year: number;
    week: number;
    weekDay: number;
    weekDayID: string;
    weekDayName: string;
    weekDayRank: number;
    month: number;
    monthDay: number;
    shift: string;
    shiftid: number;
    shiftID: string;
    time: string;
    timeid: number;
    timeID: string;
    timeHalfStock: boolean;
    shortDate: string;
    longDate: Date;
    timeStampID: number;

}

export function datePackage_factory(datePackage?: IDate): IDate {
    return {
        id: datePackage ? datePackage.id : null,
        nodeID: datePackage ? datePackage.nodeID : null,
        wholeDayID: datePackage ? datePackage.wholeDayID : null,
        wholeDayid: datePackage ? datePackage.wholeDayid : null,
        year: datePackage ? datePackage.year : null,
        week: datePackage ? datePackage.week : null,
        weekDay: datePackage ? datePackage.weekDay : null,
        weekDayID: datePackage ? datePackage.weekDayID : null,
        weekDayName: datePackage ? datePackage.weekDayName : null,
        weekDayRank: datePackage ? datePackage.weekDayRank : null,
        month: datePackage ? datePackage.month : null,
        monthDay: datePackage ? datePackage.monthDay : null,
        shift: datePackage ? datePackage.shift : null,
        shiftid: datePackage ? datePackage.shiftid : null,
        shiftID: datePackage ? datePackage.shiftID : null,
        time: datePackage ? datePackage.time : null,
        timeid: datePackage ? datePackage.timeid : null,
        timeID: datePackage ? datePackage.timeID : null,
        timeHalfStock: datePackage ? datePackage.timeHalfStock : null,
        shortDate: datePackage ? datePackage.shortDate : null,
        longDate: datePackage ? datePackage.longDate : null,
        timeStampID: datePackage ? datePackage.timeStampID : null,
      };
}

export class IDateShift {
    id: number;
    nodeID: string;
    shiftName: string;
}

export class IDateTime {
    id: number;
    nodeID: string;
    times: string;
    selectiveDelete: boolean;
}

export class IBlockDate {
    year: number;
    week: number;
    weekDay: number;
    shiftData: IDateShift;
    timeData: IDateTime;
}

export class ITimeStampBackend {
    id?: number;
    year: number;
    week: number;
    weekDay: number;
    time: number;
    shift: number;
    shortDate: string;
}

export function returnTimeStampBackendFromDatePackage_factory(datePackage: IDate): ITimeStampBackend {
    return {
        year: datePackage.year,
        week: datePackage.week,
        weekDay: datePackage.weekDay,
        shift: datePackage.shiftid,
        time: datePackage.timeid,
        shortDate: datePackage.shortDate
    };
}
