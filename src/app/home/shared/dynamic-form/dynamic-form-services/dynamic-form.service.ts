import { Injectable } from '@angular/core';
import { DynamicFormGraphqlService } from './dynamic-form-graphql.service';
import { Observable } from 'rxjs';
import { IFormMain } from './dynamic-form.interface';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormService {

    constructor(private dynamicFormGraphqlService: DynamicFormGraphqlService) { }

    getForm(formName): Observable<IFormMain> {
        return this.dynamicFormGraphqlService.getForm(formName).pipe(

        );
    }
}
