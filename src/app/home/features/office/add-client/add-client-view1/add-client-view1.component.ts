import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { IFormControl } from 'src/app/home/shared/dynamic-form/dynamic-form-services/form-control-interface';

@Component({
    selector: 'app-add-client-view1',
    templateUrl: './add-client-view1.component.html',
    styleUrls: ['./add-client-view1.component.scss']
})
export class AddClientView1Component implements OnInit {

    @Input() formControls: IFormControl[] = [];

    constructor() { }

    ngOnInit() {
    }

    formSubmitted(value) {
        console.log(value);
    }

}
