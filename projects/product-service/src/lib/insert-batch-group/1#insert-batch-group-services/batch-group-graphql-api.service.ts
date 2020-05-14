import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBatchGroup, IBatchColor } from './batch-group-interface';

@Injectable({
    providedIn: 'root'
})
export class BatchGroupGraphqlApiService {

    public All_BATCHGROUP_QUERIES = gql`
    query BatchGroups {
        nodeBatchgroups {
            edges{
                node {
                    rowid
                    batchname
                    ranking
                    packingListRanking
                    batchColor {
                        itemDescription
                        colorCode
                        rowid
                    }
                }
            }
        }
    }`;

    public ALL_BATCHGROUP_COLORS = gql `
    query BatchColors {
        nodeColorcodes {
          edges{
            node{
              itemDescription
              rowid
              colorCode
            }
          }
        }
      }`;

    constructor(private apollo: Apollo) {}

    getAllBatchGroups(): Observable<IBatchGroup[]> {
        return this.apollo
            .watchQuery<any>({
                // context: { headers: headers},
                // variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: this.All_BATCHGROUP_QUERIES,
            })
            .valueChanges.pipe(
                map(result => this.consolidateAllBatchGroups(result.data['nodeBatchgroups'])));
    }

    private consolidateAllBatchGroups(data): IBatchGroup[] {
        if (data.length === 0) {
            return [];
        }
        const batchGroupArrays: IBatchGroup[] = [];
        // console.log('Fox(b) = ', data);
        for (let batch = 0; batch < data.edges.length; batch++) {
            const group = data.edges[batch];
            const batchGroup: IBatchGroup = {
                id: group.node.rowid,
                batchName: group.node.batchname,
                ranking: group.node.ranking,
                packingListRanking: group.node. packingListRanking,
                batchColor: this.singleBatchColor(group.node.batchColor)
            };
            batchGroupArrays.push(batchGroup);
        }
        return batchGroupArrays;
    }

    getAllBatchColors(): Observable<IBatchColor[]> {
        return this.apollo
            .watchQuery<any>({
                // context: { headers: headers},
                // variables: { accountid: accountid, timeStampid: datePackage.id, routeid: routeid},
                query: this.ALL_BATCHGROUP_COLORS,
            })
            .valueChanges.pipe(
                map(result => this.consolidateAllBatchColors(result.data['nodeColorcodes'])));
    }

    private singleBatchColor(data): IBatchColor {
        return {
            colorid: data.rowid,
            colorCode: data.colorCode,
            itemDescription: data.itemDescription
        };
    }

    private consolidateAllBatchColors(data): IBatchColor[] {
        if (data.length === 0) {
            return [];
        }
        const batchColorsArray: IBatchColor[] = [];
        for (let color = 0; color < data.edges.length; color++) {
            const groupColor = data.edges[color];
            batchColorsArray.push(this.singleBatchColor(groupColor.node));
        }
        return batchColorsArray;
    }
}
