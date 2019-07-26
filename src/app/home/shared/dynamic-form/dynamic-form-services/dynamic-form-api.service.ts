import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular-boost';
import { map, tap } from 'rxjs/operators';
import { IFormControl } from 'src/app/home/shared/dynamic-form/dynamic-form-services/form-control-interface';
import { Validators } from '@angular/forms';
import { DynamicFormSelectApiService } from './dynamic-form-select-api.service';
import { ToolboxGroupService } from '../../services/toolbox/toolbox-group.service';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/app/home/core/urls.service';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormApiService {


    constructor(private apollo: Apollo,
        private dynamicFormSelectApiService: DynamicFormSelectApiService,
        private toolbox: ToolboxGroupService,
        private urlService: UrlsService,
        private http: HttpClient) { }

    private stockUrl = this.urlService.backendUrl + 'office/';

    submitFormData(formData): Observable<any> {
        return this.http.post<any>(this.stockUrl + 'accounts/enterNew/', formData);
    }

    getFormControls(formName: string): Observable<IFormControl[]> {
        return this.apollo
            .watchQuery({
                variables: { name: formName },
                query: gql`
                query Forms($name: String){
                    nodeForms(name: $name){
                        edges{
                            node{
                              name
                              formbuilderSet{
                                edges{
                                  node{
                                    type
                                    name
                                    label
                                    value
                                    disabled
                                    placeholder
                                    ranking
                                    validation{
                                      edges{
                                        node{
                                          item
                                          value
                                          number
                                          }
                                        }
                                    }
                                  }
                                }
                              }
                            }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(
                map(result => this.consolidateFormControls(result.data['nodeForms'].edges[0].node.formbuilderSet.edges)),
                // map(data => {
                //     data.map(item => {
                //         if (item.type === 'select' || item.type === 'filterInput') {
                //             const value = item.value;
                //             item.value = null;
                //             return this.dynamicFormSelectApiService.getSelection(value).subscribe(data2 => item.options = data2);
                //         }
                //     });
                //     return data;
                // }),
                tap(data => this.toolbox.sorting(data, 'ranking'))
                );
    }

    // If there is an option box, then it looks like the best course of action would be to get an number from the db,
    // (put number in value field?)
    // and according to that number, to then go get a service than needs to be run, and run that service that
    // retrieves the db that that is needed and returns it to the options box as an array

    private consolidateFormControls(data): IFormControl[] {
        const flattendData: IFormControl[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IFormControl>{};
            singleData.type = data[array].node.type;
            singleData.name = data[array].node.name;
            singleData.label = data[array].node.label;
            singleData.value = data[array].node.value;
            singleData.disabled = data[array].node.disabled;
            singleData.placeholder = data[array].node.placeholder;
            singleData.ranking = data[array].node.ranking;
            singleData.validation = this.combineValidatorsIntoArray(data[array].node.validation.edges);
            singleData.options = [{name: 'No data available', optionid: null}];
            flattendData.push(singleData);
        }
        return flattendData;
    }

    private combineValidatorsIntoArray(data): Validators[] {
        const flattendData: Validators[] = [];

        for (let array = 0; array < data.length; ++array) {
            switch (data[array].node.value) {
                case 1:
                    flattendData.push(Validators.required);
                    break;
                case 2:
                    flattendData.push(Validators.minLength(+ data[array].node.number));
                    break;
            }
        }
        return flattendData;
    }

}
