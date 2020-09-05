export class IDate {
    nodeID?: string;
    id: number;
    wholeDayID?: string;
    wholeDayid?: number;
    year?: number;
    week?: number;
    weekDay?: number;
    weekDayID?: string;
    weekDayName?: string;
    weekDayRank?: number;
    month?: number;
    monthDay?: number;
    shift?: string;
    shiftid?: number;
    shiftID?: string;
    time?: string;
    timeid?: number;
    timeID?: string;
    timeHalfStock?: boolean;
    shortDate?: string;
    longDate?: Date;
    timeStampID?: number;

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
