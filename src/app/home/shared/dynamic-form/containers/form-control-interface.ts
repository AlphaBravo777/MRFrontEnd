export class IFormControl {
    type: string;
    label: string;
    name: string;
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    validation?: any[];
    options?: string[];

    // constructor(name: string, areaid: number) {
    //     this.name = name;
    //     this.areaid = areaid;
    // }
}
