export class IReadReport {
    rowid: number;
    messageID: string;
    message: string;
    userID: string;
    userid: number;
    userName: string;
    messageFlag: IReadReportLevels;
    reply: number;
    replies?: IReadReport[];
    images?: IReadReportImages[];
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
    message?: string;
    messageid?: number;
    messageType?: 'New' | 'Edit';
    currentFlag?: IReadReportLevels;
    // replyToMessageid?: number;

    constructor(showTextBox: boolean, placeHolderMessage: string, messageFlags: IReadReportLevels[]) {
        this.showTextBox = showTextBox;
        this.placeHolderMessage = placeHolderMessage;
        this.messageFlags = messageFlags;
    }
}

export class IReadReportImages {
    id: number;
    ID: string;
    image: string;
    name: string;
    report: number;
}
