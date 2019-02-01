import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChecklistLevels, IChecklistArea } from '../../checklist-services/checklist-interface';

@Injectable({
  providedIn: 'root'
})
export class ChecklistAddCheckApiService {

    constructor(private urlService: UrlsService, private http: HttpClient, private apollo: Apollo) { }

    private stockUrl = this.urlService.backendUrl + 'office/';

    enterNewChecklist(newCheck) {
        console.log('THis is a new checklist', newCheck);
        return this.http.post<any>(this.stockUrl + 'checklists/enterNew/', newCheck);
    }

    getChecklistLevels(): Observable<IChecklistLevels[]> {
        return this.apollo
            .watchQuery({
                variables: { checklist: true },
                query: gql`
                query MessageLevels($checklist:Boolean){
                    nodeMessagelevels(checklist:$checklist){
                        edges{
                          node{
                            levelName
                            levelColor
                            levelRank
                          }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateChecklistLevels(result.data['nodeMessagelevels'].edges)));
    }

    private consolidateChecklistLevels(data): IChecklistLevels[] {
        const flattendData: IChecklistLevels[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IChecklistLevels>{};
                singleData.levelName = data[array].node.levelName;
                singleData.levelColor = data[array].node.levelColor;
                singleData.levelRank = data[array].node.levelRank;
                flattendData.push(singleData);
        }
        return flattendData;
    }

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
