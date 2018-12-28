export class IReadReport {
    rowid: number;
    messageID: string;
    message: string;
    userID: string;
    userid: number;
    userName: string;
    color: string;
}

export class IReadReportLevels {
    levelName: string;
    levelColor: string;
    levelRank: number;
}

export class IReadReportPackage {
    userid?: number;
    reportLevels?: IReadReportLevels[];
    reports?: IReadReport[];

    constructor(userid: number, reportLevels: IReadReportLevels[], reports: IReadReport[]) {
        this.userid = userid;
        this.reportLevels = reportLevels;
        reports = reports;
    }
}
