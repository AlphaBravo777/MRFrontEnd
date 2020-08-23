export class ITableValue {
    accountid: number;
    value: string;
    classDivString: string;
    classSpanString: string;
}

export class IRow {
    colmString: string;
    classColmString: string;
    element: ITableValue[];
}
