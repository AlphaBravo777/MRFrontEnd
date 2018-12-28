import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChecksSingleArea, IChecklistArea } from '../../checklist-services/checklist-interface';

@Injectable({
  providedIn: 'root'
})
export class ChecklistReadApiService {

  constructor(private urlService: UrlsService, private http: HttpClient, private apollo: Apollo) { }

  getAreaChecks(area: IChecklistArea): Observable<IChecksSingleArea[]> {
    return this.apollo
        .watchQuery({
            variables: { area: area.areaID },
            query: gql`
            query getChecklistAreaChecks($area:ID){
                nodeChecklist(area:$area){
                  edges{
                    node{
                      message
                      id
                      rowid
                      importance{
                        levelColor
                        levelRank
                        levelName
                      }
                    }
                  }
                }
              }
            `,
        })
        .valueChanges.pipe(map(result => this.consolidateAreaChecks(result.data['nodeChecklist'].edges)));
}

private consolidateAreaChecks(data): IChecksSingleArea[] {
    const flattendData: IChecksSingleArea[] = [];

    for (let array = 0; array < data.length; ++array) {
        const singleData = <IChecksSingleArea>{};
            singleData.message = data[array].node.message;
            singleData.checkid = data[array].node.rowid;
            singleData.checkID = data[array].node.id;
            singleData.levelColor = data[array].node.importance.levelColor;
            singleData.levelRank = data[array].node.importance.levelRank;
            flattendData.push(singleData);
    }
    return flattendData;
}

}
