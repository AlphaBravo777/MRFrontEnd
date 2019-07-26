export class IFormSelectControl {
    name: string;
    optionid: number;
    optionID?: string;
}

export class IFormControlData {
    controlName: string;
    data: IFormSelectControl[];
}

export class IFormControl {
    type: string;
    label: string;
    name: string;
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    validation?: any[];
    options?: IFormSelectControl[];
    ranking: number;
}
