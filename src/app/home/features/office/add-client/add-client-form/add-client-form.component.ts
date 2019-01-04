import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { IFormControl } from 'src/app/home/shared/dynamic-form/containers/form-control-interface';

@Component({
    selector: 'app-add-client-form',
    templateUrl: './add-client-form.component.html',
    styleUrls: ['./add-client-form.component.scss']
})
export class AddClientFormComponent implements OnInit {

    @Input() config: IFormControl[] = [];
    @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
    form: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.createGroup();
    }

    createGroup() {
        const group = this.fb.group({});
        this.config.forEach(control => group.addControl(control.name, this.createControl(control)));
        return group;
    }

    createControl(config: IFormControl) {
        const { disabled, validation, value } = config;
        return this.fb.control({ disabled, value }, validation);
    }

    // newClientForm: FormGroup;

    // constructor(private fb: FormBuilder) { }

    // ngOnInit() {
    //     this.buildform();
    // }

    // buildform() {
    //     this.newClientForm = this.fb.group({
    //         accountName: ['', [Validators.required, Validators.minLength(4)]],
    //         shopName: ['', [Validators.required, Validators.minLength(4)]],
    //         accountNumber: ['', Validators.required],
    //         route: ['', Validators.required]
    //     });
    // }

}
