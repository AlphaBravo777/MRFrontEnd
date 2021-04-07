import { IUserType } from 'projects/user-service/src/lib/interfaces/user-graphql.interface'
import { IDailyReportTypeEdges } from '../../../services/dailyReportServices/dailyReport-graphql.interface'
import { IDeliveryRoutesTypeEdges } from '../../../services/routesServices/routes-interface'

// ===============================================================================================================================================
//                                                              timeStamp
// ===============================================================================================================================================

export class ITimeStampType {
    id: string
    year: number
    week: number
    weekDay: IDaysOfTheWeekType
    time: IStockTakingTimesType
    shortDate: number
    dateCreated: number
    shift: IShiftsType
    dailyreportSet: IDailyReportTypeEdges
    rowid: number
}

export class ITimeStampTypeNodes {
    node: ITimeStampType
}

export class ITimeStampTypeEdges {
    edges: ITimeStampTypeNodes[]
}

export class ITimeStampTypeConnection {
    nodeWeeklyOrdersMicroService: ITimeStampTypeEdges
}


// ===============================================================================================================================================
//                                                              shifts
// ===============================================================================================================================================

export class IShiftsType {
    id: string
    shiftName: string
    shiftSuperVisor: IUserType
    timestampSet: ITimeStampTypeEdges
    rowid: number
}

export class IShiftsTypeNodes {
    node: IShiftsType
}

export class IShiftsTypeEdges {
    edges: IShiftsTypeNodes[]
}

export class IShiftsTypeConnection {
    somethingElseHere: IShiftsTypeEdges
}


// ===============================================================================================================================================
//                                                              daysOfTheWeek
// ===============================================================================================================================================

export class IDaysOfTheWeekType {
    id: string
    weekDayNames: string
    weekDayNumber: number
    weekDayRanking: number
    timestampSet: ITimeStampTypeEdges
    deliveryroutesSet: IDeliveryRoutesTypeEdges
    rowid: number
}


export class IDaysOfTheWeekTypeNodes {
    node: IDaysOfTheWeekType
}

export class IDaysOfTheWeekTypeEdges {
    edges: IDaysOfTheWeekTypeNodes[]
}

export class IDaysOfTheWeekTypeConnection {
    somethingElseHere: IDaysOfTheWeekTypeEdges
}

// ===============================================================================================================================================
//                                                              stockTakingTimes
// ===============================================================================================================================================

export class IStockTakingTimesType {
    id: string
    times: string
    selectiveDelete: boolean
    timestampSet: ITimeStampTypeEdges
    rowid: number
}

export class IStockTakingTimesTypeNodes {
    node: IStockTakingTimesType
}

export class IStockTakingTimesTypeEdges {
    edges: IStockTakingTimesTypeNodes[]
}

export class IStockTakingTimesTypeConnection {
    somethingElseHere: IStockTakingTimesTypeEdges
}