import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular-boost';
import { map } from 'rxjs/operators';
import { IFormControl } from 'src/app/home/shared/dynamic-form/containers/form-control-interface';

@Injectable({
    providedIn: 'root'
})
export class AddClientApiService {

    constructor(private apollo: Apollo) { }

    getFormControls(formName): Observable<IFormControl[]> {
        return this.apollo
            .watchQuery({
                variables: { name: formName },
                query: gql`
                query Forms($name: String){
                    nodeForms(name: $name){
                      edges{
                        node{
                          name
                          id
                          formbuilderSet{
                            edges{
                              node{
                                type
                                name
                                label
                                value
                                disabled
                                placeholder
                                validation
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateFormControls(result.data['nodeForms'].edges[0].node.formbuilderSet.edges)));
    }

    private consolidateFormControls(data): IFormControl[] {
        console.log('getFormControls 1', data);
        const flattendData: IFormControl[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IFormControl>{};
            singleData.type = data[array].node.type;
            singleData.name = data[array].node.name;
            singleData.label = data[array].node.label;
            singleData.value = data[array].node.value;
            singleData.disabled = data[array].node.disabled;
            singleData.placeholder = data[array].node.placeholder;
            singleData.validation = data[array].node.value;
            flattendData.push(singleData);
        }
        console.log('getFormControls 2', flattendData);
        return flattendData;
    }

    // private removeBeginningAndEndQuotes(string): any[] {
    //     const array = [];
    //     array.push(string);
    //     const newArray = [array[0].replace(/['"]+/g, '')];
    //     return newArray;
    // }
}
