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
        this.dynamicFormService.getFormControls().subscribe(data => {
            this.formControls = data;
        });
    }

}
// id accountID accountName commonName parentAccountID(fk) route(fk) details(fk) productGroup(fk)
// If there is an option box, then it looks like the best course of action would be to get an number from the db,
// (put number in value field?)
// and according to that number, to then go get a service than needs to be run, and run that service that
// retrieves the db that that is needed and returns it to the options box as an array
