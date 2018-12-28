import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular-boost';
import { map } from 'rxjs/operators';
import { IChecklistArea } from './checklist-interface';

@Injectable({
    providedIn: 'root'
})
export class ChecklistApiService {

    constructor(private apollo: Apollo) { }

    getChecklistAreas(): Observable<IChecklistArea[]> {
        return this.apollo
            .watchQuery({
                variables: { checklist: true },
                query: gql`
                query getChecklistAreas {
                    listChecklistareas{
                      area
                      id
                      rowid
                    }
                  }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateChecklistAreas(result.data['listChecklistareas'])));
    }

    private consolidateChecklistAreas(data): IChecklistArea[] {
        const flattendData: IChecklistArea[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IChecklistArea>{};
            singleData.name = data[array].area;
            singleData.areaid = data[array].rowid;
            singleData.areaID = data[array].id;
            flattendData.push(singleData);
        }
        return flattendData;
    }
}
