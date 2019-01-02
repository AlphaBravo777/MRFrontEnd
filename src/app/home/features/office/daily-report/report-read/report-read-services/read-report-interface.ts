export class IReadReport {
    rowid: number;
    messageID: string;
    message: string;
    userID: string;
    userid: number;
    userName: string;
    color: string;
    reply: number;
    replies?: IReadReport[];
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
        this.reports = reports;
    }
}

export class INewMessagePackage {
    showTextBox?: boolean;
    placeHolderMessage?: string;
    messageFlags?: IReadReportLevels[];

    constructor(showTextBox: boolean, placeHolderMessage: string, messageFlags: IReadReportLevels[]) {
        this.showTextBox = showTextBox;
        this.placeHolderMessage = placeHolderMessage;
        this.messageFlags = messageFlags;
    }
}
