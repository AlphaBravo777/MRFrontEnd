import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-client-form',
    templateUrl: './add-client-form.component.html',
    styleUrls: ['./add-client-form.component.scss']
})
export class AddClientFormComponent implements OnInit {

    newClientForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.buildform();
    }

    buildform() {
        this.newClientForm = this.fb.group({
            companyName: ['', [Validators.required, Validators.minLength(4)]],
            accountNumber: ['', Validators.required],
            route: ['', Validators.required]
        });
    }

}
