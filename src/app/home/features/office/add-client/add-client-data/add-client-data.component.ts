import { Component, OnInit } from '@angular/core';
import { IFormControl } from 'src/app/home/shared/dynamic-form/dynamic-form-services/form-control-interface';
import { DynamicFormService } from 'src/app/home/shared/dynamic-form/dynamic-form-services/dynamic-form.service';

@Component({
    selector: 'app-add-client-data',
    templateUrl: './add-client-data.component.html',
    styleUrls: ['./add-client-data.component.scss']
})
export class AddClientDataComponent implements OnInit {

    formControls: IFormControl[];

    constructor(private dynamicFormService: DynamicFormService) { }

    ngOnInit() {
        this.getFormData();
    }

    getFormData() {
        this.dynamicFormService.getFormControls('Add new client').subscribe(data => {
            this.formControls = data;
            console.log('formcontrols raw data = ', data);
        });
    }

    submittedForm(value) {
        this.dynamicFormService.submitFormData(value);
    }



}

// id accountID accountName commonName parentAccountID(fk) route(fk) details(fk) productGroup(fk)
// Add parent account selection box with a search input box, as a person types, start searching and narrowing dows results
// It may not have to be a selection box, but rather an input box that you can not change, or maybe an input box
// Make front and back end to submit a client once form is populated
