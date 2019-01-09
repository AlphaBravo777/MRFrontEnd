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
                return this.getProductGroupNames().pipe();
            case '3':
                return this.getAccountNameAndIDs().pipe();
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

    private getProductGroupNames(): Observable<IFormSelectControl[]> {
        return this.apollo
            .watchQuery({
                // variables: { name: formName },
                query: gql`
                query ProductGroup {
                    nodeProductgroupnames{
                    edges{
                      node{
                        groupname
                        id
                        rowid
                      }
                    }
                  }
                }
                `,
            })
            .valueChanges.pipe(
                map(result => this.consolidateProductGroupNames(result.data['nodeProductgroupnames'].edges))
                );
    }

    private consolidateProductGroupNames(data): IFormSelectControl[] {
        const flattendData: IFormSelectControl[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IFormSelectControl>{};
            singleData.name = data[array].node.groupname;
            singleData.optionid = data[array].node.rowid;
            singleData.optionID = data[array].node.id;
            flattendData.push(singleData);
        }
        return flattendData;
    }


    private getAccountNameAndIDs(): Observable<IFormSelectControl[]> {
        return this.apollo
            .watchQuery({
                // variables: { name: formName },
                query: gql`
                query getAccountName {
                    nodeAccountnames{
                      edges{
                        node{
                          id
                          rowid
                          commonName
                          accountID
                        }
                      }
                    }
                  }
                `,
            })
            .valueChanges.pipe(
                map(result => this.consolidateAccountNameAndIDs(result.data['nodeAccountnames'].edges))
                );
    }

    private consolidateAccountNameAndIDs(data): IFormSelectControl[] {
        const flattendData: IFormSelectControl[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IFormSelectControl>{};
            singleData.name = data[array].node.accountID + '  ' + data[array].node.commonName;
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

