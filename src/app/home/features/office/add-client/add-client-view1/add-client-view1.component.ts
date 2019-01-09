import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFormControl } from 'src/app/home/shared/dynamic-form/dynamic-form-services/form-control-interface';

@Component({
    selector: 'app-add-client-view1',
    templateUrl: './add-client-view1.component.html',
    styleUrls: ['./add-client-view1.component.scss']
})
export class AddClientView1Component implements OnInit {

    @Input() formControls: IFormControl[] = [];
    @Output() submittedForm: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    formSubmitted(value) {
        this.submittedForm.emit(value);
    }

}
