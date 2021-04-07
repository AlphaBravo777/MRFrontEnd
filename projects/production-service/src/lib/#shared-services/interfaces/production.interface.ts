export class IBatchInfo {
    id: number;
    weekNumber: number;
    dayNumber: number;
    year: number;
}

export class IBatchInfoBackend {
    id: number;
    weeknumber: number;
    year: number;
    day: number;
}

export class IContainerInfo {
    containerName: string;
    containerid: number;
    containerRanking: number;
    containerIndex: number;
    showContainer: boolean;
}

export class IContainerInfoHash {
    [containerid: number]: IContainerInfo;
}