import { IReadReportLevels } from '../../report-read/report-read-services/read-report-interface';

export class IInsertNewReportApiInterface {
    message: string;
    messageLevel: IReadReportLevels;
    messageid: number;
    timestampID: number;
}
