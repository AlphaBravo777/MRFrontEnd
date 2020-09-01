import { FormGroup, ValidatorFn } from '@angular/forms';

export class IFormControl {
    controlName: string;
    description: string;
    rowid: number;
}

export class IFormValidation {
    item: string;
    name: string;
    value: number;
    number: null;
    rowid: number;
}

export class IFormIcon {
    iconName: string;
    description: string;
    rowid: number;
}

export class IFormOptions {
    option: string;
    controlid: string;
    rowid: number;
}

// export class IFormControlBuilder {
//     controlFormName: string;  // Then name that the control will have in a form
//     label: string; // The label that will show when a control is used
//     value: string; // The default value that a control might have
//     disabled: boolean; // Whether the control is enabled or disabled
//     placeholder: string; // The placeholder text
//     ranking: number; // Where the control will show, from top to bottom
//     controlType: string; // This is the type of the control like 'submit', 'text', 'number'
//     options: string[]; // The options that might be available for the control
//     control: IFormControl; // The control like 'input', 'button', 'select'
//     validation: ValidatorFn[]; // The validation array with the validators
//     icon: IFormIcon; // The name of the icon if one needs to be used
// }

export interface IFormControlBuilder {
    disabled: boolean; // Whether the control is enabled or disabled
    label: string; // The label that will show when a control is used
    formControlName: string; // Then name that the control will have in a form
    // options: string[]; // The options that might be available for the control
    options: IFormOptions[]; // The options that might be available for the control
    placeholder: string; // The placeholder text
    control: string; // The control like 'input', 'button', 'select'
    controlType: string; // This is the type of the control like 'submit', 'text', 'number'
    validation: ValidatorFn[]; // The validation array with the validators
    value: any; // The default value that a control might have
    ranking: number; // Where the control will show, from top to bottom
    icon: IFormIcon; // The name of the icon if one needs to be used
  }

export class IFormMain {
    formName: string;
    description: string;
    rowid: number;
    formBuilder: IFormControlBuilder[];
}

export interface IFormField {
    config: IFormControlBuilder;
    group: FormGroup;
}


