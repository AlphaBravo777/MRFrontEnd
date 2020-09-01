import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular-boost';
import { ToolboxGroupService } from '../../../shared/services/toolbox/toolbox-group.service';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

    batchGroups = [];

    constructor(private apollo: Apollo, private toolbox: ToolboxGroupService) { }

    getGraphQLdata(): Observable<any> {
        return this.apollo
            .watchQuery({
                // variables: { year: data.year, week: data.week, weekDay: data.weekDay },
                query: gql`
                query{
                    listBatchgroups{
                      batchname
                      ranking
                      batchColor{
                        colorCode
                      }
                    }
                  }
        `,
            })
            // .valueChanges.pipe(map(result => this.refineData(result)));
            .valueChanges.pipe(map(result => this.refineData(result.data['listBatchgroups'])));
    }

    refineData(data): any {
        const flattendData: any[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <any>{};
            singleData.batchGroup = data[array].batchname;
            singleData.ranking = data[array].ranking;
            if (data[array].batchColor) {
            singleData.batchColor = data[array].batchColor.colorCode;
            }
            flattendData.push(singleData);
        }
        return this.toolbox.sorting(flattendData, 'ranking');
    }

        ngOnInit() {
            this.getGraphQLdata().subscribe(data => {
                console.log(data);
                this.batchGroups = data;
            });
        }

    }
