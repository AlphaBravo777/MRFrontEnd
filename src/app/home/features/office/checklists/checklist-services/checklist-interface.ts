export class IChecklistLevels {
    levelName: string;
    levelColor: string;
    levelRank: number;
}

export class IChecklistArea {
    name: string;
    areaid?: number;
    areaID?: string;
    areaChecks?: IChecksSingleArea[];

    constructor(name: string, areaid: number) {
        this.name = name;
        this.areaid = areaid;
    }
}

export class IChecksSingleArea {
    message: string;
    checkID: string;
    checkid: number;
    levelColor: string;
    levelRank: number;
    levelName: string;
}

export class IChecklistPackage {
    // userid?: number;
    checklistLevels?: IChecklistLevels[];
    checklistAreas?: IChecklistArea[];

    constructor(checklistLevels: IChecklistLevels[], checklistAreas: IChecklistArea[]) {
        // this.userid = userid;
        this.checklistLevels = checklistLevels;
        this.checklistAreas = checklistAreas;
    }
}
