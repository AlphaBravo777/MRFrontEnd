import { Injectable } from '@angular/core';
import { IFormSelectControl } from './form-control-interface';
import { Observable, of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular-boost';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormSelectApiService {

    constructor(private apollo: Apollo) { }

    getSelection(value: string): Observable<IFormSelectControl[]> {
        switch (value) {
            case '1':
                return this.getRoutes().pipe();
            case '2':
                // return this.getAccounts();
            default:
                console.log('Select value was not found');
                return of([{name: 'No value was found', optionID: null, optionid: null}]);
        }
    }

    private getRoutes(): Observable<IFormSelectControl[]> {
        return this.apollo
            .watchQuery({
                // variables: { name: formName },
                query: gql`
                query DeliveryRoutes {
                    nodeDeliveryroutes{
                      edges{
                        node{
                          rowid
                          id
                          routeName
                        }
                      }
                    }
                  }
                `,
            })
            .valueChanges.pipe(
                map(result => this.consolidateGetRoutes(result.data['nodeDeliveryroutes'].edges))
                );
    }

    private consolidateGetRoutes(data): IFormSelectControl[] {
        const flattendData: IFormSelectControl[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IFormSelectControl>{};
            singleData.name = data[array].node.routeName;
            singleData.optionid = data[array].node.rowid;
            singleData.optionID = data[array].node.id;
            flattendData.push(singleData);
        }
        return flattendData;
    }


    getAccounts(): IFormSelectControl[] {
        return;
    }
}

