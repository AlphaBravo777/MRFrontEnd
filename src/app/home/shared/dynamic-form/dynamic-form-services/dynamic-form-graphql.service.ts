import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicFormGraphqlStringsService } from './dynamic-form-graphql-strings.service';
import { IFormMain, IFormControlBuilder, IFormOptions, IFormIcon } from './dynamic-form.interface';
import { Validators, ValidatorFn } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormGraphqlService {

    constructor(private apollo: Apollo, private graphqlStrings: DynamicFormGraphqlStringsService) { }

    getForm(formName: string): Observable<any> {
        return this.apollo
            .watchQuery<any>({
                variables: { name: formName },
                query: this.graphqlStrings.MAIN_FORM_QUERY
            })
            .valueChanges.pipe(
                map(result => this.consolidateForm(result.data['nodeFormCoreMicroService'].edges))
            );
    }


    private consolidateForm(data) {
        if (data.length === 0) {return null; }
        console.log('Formcontrol data = ', data);


        const formBuilder = (buildData): IFormControlBuilder[] => {

            const formOptions = (optionData): IFormOptions[] => {
                if (!optionData) {
                    return null;
                }
                const optionArray: IFormOptions[] = [];
                optionData.forEach(element => {
                    optionArray.push(element.node);
                });
                return optionArray;
            };

            const formIcons = (iconData): IFormIcon => {
                if (!iconData) {
                    return null;
                }
                return {
                    iconName: iconData.iconName,
                    rowid: iconData.rowid,
                    description: null
                };
            };

            const combineValidatorsIntoArray = (validatorsData): ValidatorFn[] => {
                if (!validatorsData) {
                    return null;
                }
                const flattendData: ValidatorFn[] = [];

                // tslint:disable-next-line
                for (let array = 0; array < validatorsData.length; ++array) {
                    switch (validatorsData[array].node.formValidatorid.number) {
                        case 1:
                            flattendData.push(Validators.required);
                            break;
                        case 2:
                            flattendData.push(Validators.minLength(+ validatorsData[array].node.formValidatorid.value));
                            break;
                    }
                }
                return flattendData;
            };

            const formControlArray = [];
            buildData.forEach(control => {
                const formControlData: IFormControlBuilder = {
                    label: control.node.label,
                    disabled: control.node.disabled,
                    formControlName: control.node.controlName,
                    control: control.node.control.controlName,
                    icon: formIcons(control.node.icon),
                    options: formOptions(control.node.formoptionsSet.edges),
                    placeholder: control.node.placeholder,
                    ranking: control.node.ranking,
                    controlType: control.node.controlType,
                    validation: combineValidatorsIntoArray(control.node.formvalidatorjunctionSet.edges),
                    value: control.node.value,
                };
                formControlArray.push(formControlData);
            });
            return formControlArray;
        };

        const formData: IFormMain = {
            formName: data[0].node.formName,
            description: data[0].node.description,
            rowid: data[0].node.rowid,
            formBuilder: formBuilder(data[0].node.formcontrolbuilderSet.edges)
        };
        console.log('Form data = ', formData);
        return formData;
    }
}
