import { IUserType } from 'projects/user-service/src/lib/interfaces/user-graphql.interface'
import { ITimeStampType } from '../../main-portal/date-picker/date-picker-service/date-graphql.interface'

// ===============================================================================================================================================
//                                                              dailyReport
// ===============================================================================================================================================

export class IDailyReportType {
    id: string
    message: string
    messageLevel:  IMessageLevelsType
    user: number
    dateCreated: string
    timeStampID: ITimeStampType
    reply: IDailyReportType
    dailyreportSet: IDailyReportTypeEdges
    reportimagesSet: IReportImagesTypeEdges
    rowid: number
    userNode: IUserType
}

export class IDailyReportTypeNodes {
    node: IDailyReportType
}

export class IDailyReportTypeEdges {
    edges: IDailyReportTypeNodes[]
}

export class IDailyReportTypeConnection {
    somethingElseHere: IDailyReportTypeEdges
}


// ===============================================================================================================================================
//                                                              messageLevel
// ===============================================================================================================================================

export class IMessageLevelsType {
    id: string
    levelName: string
    levelColor: string
    levelRank: number
    report: boolean
    checklist: boolean
    dailyreportSet: IDailyReportTypeEdges
}

export class IMessageLevelsTypeNodes {
    node: IMessageLevelsType
}

export class IMessageLevelsTypeEdges {
    edges: IMessageLevelsTypeNodes[]
}

export class IMessageLevelsTypeConnection {
    somethingElseHere: IMessageLevelsTypeEdges
}


// ===============================================================================================================================================
//                                                              reportImages
// ===============================================================================================================================================

export class IReportImagesType {
    id: string
    name: string
    image: string
    report: IDailyReportType
    rowid: number
}

export class IReportImagesTypeNodes {
    node: IReportImagesType
}

export class IReportImagesTypeEdges {
    edges: IReportImagesTypeNodes[]
}

export class IReportImagesTypeConnection {
    somethingElseHere: IReportImagesTypeEdges
}