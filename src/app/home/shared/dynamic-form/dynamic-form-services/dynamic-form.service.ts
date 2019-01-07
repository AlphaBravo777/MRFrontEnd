import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormControl } from './form-control-interface';
import { DynamicFormApiService } from './dynamic-form-api.service';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormService {

    constructor(private dynamicFormApiService: DynamicFormApiService) { }

    getFormControls(): Observable<IFormControl[]> {
        return this.dynamicFormApiService.getFormControls('Add new client').pipe();
    }

    // write a funciton that takes a number and returns an array if strings, with that number decide what service you have to run
    // to get what api call
    // the run the api call, change the data to a string (or maybe an object will be better so that you can add the id)
}
