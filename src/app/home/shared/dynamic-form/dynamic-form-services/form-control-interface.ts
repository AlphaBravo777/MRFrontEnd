export class IFormSelectControl {
    name: string;
    optionid: number;
    optionID: string;

    // constructor(name: string, areaid: number) {
    //     this.name = name;
    //     this.areaid = areaid;
    // }
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

    // constructor(name: string, areaid: number) {
    //     this.name = name;
    //     this.areaid = areaid;
    // }
}
