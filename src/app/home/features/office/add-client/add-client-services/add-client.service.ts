import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormControl } from 'src/app/home/shared/dynamic-form/containers/form-control-interface';
import { AddClientApiService } from './add-client-api.service';

@Injectable({
    providedIn: 'root'
})
export class AddClientService {

    constructor(private addClientApiService: AddClientApiService) { }

    getFormControls(): Observable<IFormControl[]> {
        return this.addClientApiService.getFormControls('Add new client').pipe();
    }
}

// id accountID accountName commonName parentAccountID(fk) route(fk) details(fk) productGroup(fk)
