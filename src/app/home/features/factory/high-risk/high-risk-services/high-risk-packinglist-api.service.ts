import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPackingListStock } from './high-risk-interfaces';
import { Apollo, gql } from 'apollo-angular-boost';

@Injectable({
  providedIn: 'root'
})
export class HighRiskPackinglistApiService {

    constructor(private apollo: Apollo) { }

    groupByArray(xs, key) {
        return xs.reduce(function (rv, x) {
            const v = key instanceof Function ? key(x) : x[key];
            const el = rv.find(r => r && r.key === v);
            if (el) {
                el.values.push(x);
            } else {
                rv.push({ key: v, values: [x], number: x.groupRanking  });
            }
            return rv;
        }, []);
    }

    getGraphQLdata(): Observable<any> {
        return this.apollo
            .watchQuery({
                query: gql`
                {
                    allHighriskpackinglist {
                      productCode {
                        productid
                        proddescription
                              packlistgroup{
                          batchname
                          packingListRanking
                        }
                      }
                      currentStock
                      stockNeeded
                    }
                  }
            `,
            })
            .valueChanges.pipe(map(result => this.flattenHighRiskpackingList(result.data['allHighriskpackinglist'])));
    }

    flattenHighRiskpackingList(data): IPackingListStock[] {
        // console.log(data);
        const flattendData: IPackingListStock[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IPackingListStock>{};
            singleData.productCode = data[array].productCode.productid;
            singleData.description = data[array].productCode.proddescription;
            singleData.productGroup = data[array].productCode.packlistgroup.batchname;
            singleData.groupRanking = data[array].productCode.packlistgroup.packingListRanking;
            singleData.currentStock = data[array].currentStock;
            singleData.stockNeeded = data[array].stockNeeded;
            flattendData.push(singleData);
        }
        return this.groupByArray(flattendData, 'productGroup');
    }

    }
