import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToolboxGroupService } from '../../../../../shared/services/toolbox/toolbox-group.service';

@Injectable({
    providedIn: 'root'
})
export class ProcStockApiService {

    constructor(private apollo: Apollo, private toolboxGroup: ToolboxGroupService) { }

    getGraphQLProcData(timeID: any): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: { timeStampID: timeID },
                query: gql`
                query processedstockamountsSet($timeStampID:ID) {
                    listProductcontainers{
                      id
                      productid{
                        productid
                        processedstockamountsSet(timeStampID:$timeStampID){
                          edges{
                            node{
                              amount
                              timeStampID{
                                id
                              }
                            }
                          }
                        }
                      }
                    }
                  }
        `,
            })
            .valueChanges.pipe(map(result => this.consolidateData(result.data['listProductcontainers'])));
    }

    consolidateData(data): any {
        console.log('Result data ', data);
        const flattendData: any[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <any>{};
            singleData.productCode = data[array].productCode.productid;
            singleData.description = data[array].productCode.proddescription;
            singleData.productGroup = data[array].productCode.packlistgroup.batchname;
            singleData.groupRanking = data[array].productCode.packlistgroup.packingListRanking;
            singleData.currentStock = data[array].currentStock;
            singleData.stockNeeded = data[array].stockNeeded;
            flattendData.push(singleData);
        }
        return this.toolboxGroup.groupByArray(flattendData, 'productGroup');
    }
}
