import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormControl } from './form-control-interface';
import { DynamicFormApiService } from './dynamic-form-api.service';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormService {

    constructor(private dynamicFormApiService: DynamicFormApiService) { }

    getFormControls(formName: string): Observable<IFormControl[]> {
        return this.dynamicFormApiService.getFormControls(formName).pipe();
    }

    submitFormData(data) {
        this.dynamicFormApiService.submitFormData(data).subscribe();
    }
}
