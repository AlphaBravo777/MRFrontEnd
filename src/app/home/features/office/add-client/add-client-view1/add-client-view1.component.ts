import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { IFormControl } from 'src/app/home/shared/dynamic-form/containers/form-control-interface';

@Component({
    selector: 'app-add-client-view1',
    templateUrl: './add-client-view1.component.html',
    styleUrls: ['./add-client-view1.component.scss']
})
export class AddClientView1Component implements OnInit {

    @Input() formControls: IFormControl[] = [];
    // config = [
    //     {
    //         type: 'input',
    //         label: 'Full name',
    //         name: 'name',
    //         placeholder: 'Enter your name',
    //         validation: [Validators.required, Validators.minLength(4)],
    //         disabled: false
    //     },
    //     {
    //         type: 'input',
    //         label: 'Enter Surname',
    //         name: 'surname',
    //         placeholder: 'Please enter your surname',
    //         validation: [Validators.required, Validators.minLength(8)]
    //     },
    //     // {
    //     //     type: 'select',
    //     //     label: 'Favourite food',
    //     //     name: 'food',
    //     //     options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
    //     //     placeholder: 'Select an option',
    //     // },
    //     // {
    //     //     label: 'Submit',
    //     //     name: 'submit',
    //     //     type: 'button',
    //     // },
    // ];

    constructor() { }

    ngOnInit() {
        console.log('Alpha ', this.formControls);
    }

    formSubmitted(value) {
        console.log(value);
    }

}
