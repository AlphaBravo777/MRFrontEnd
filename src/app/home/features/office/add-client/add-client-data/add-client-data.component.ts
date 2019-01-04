import { Component, OnInit } from '@angular/core';
import { IFormControl } from 'src/app/home/shared/dynamic-form/containers/form-control-interface';
import { AddClientService } from '../add-client-services/add-client.service';

@Component({
    selector: 'app-add-client-data',
    templateUrl: './add-client-data.component.html',
    styleUrls: ['./add-client-data.component.scss']
})
export class AddClientDataComponent implements OnInit {

    formControls: IFormControl[];

    constructor(private addClientService: AddClientService) { }

    ngOnInit() {
        this.addClientService.getFormControls().subscribe(data => {
            this.formControls = data;
        });
    }

}
