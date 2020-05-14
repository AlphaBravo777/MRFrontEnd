export class IBatchColor {
    colorid: number;
    itemDescription: string;
    colorCode: string;
}

export class IBatchGroup {
    id: number;
    batchName: string;
    ranking: number;
    packingListRanking: number;
    batchColor: IBatchColor;
}

export class IBatchGroupFrontEnd {
    batchGroupid: number;
    batchName: string;
    ranking: number;
    packingListRanking: number;
    batchColorid: number;
    colorCode: string;
    colorItemDescription: string;
}
