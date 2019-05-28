import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular-boost';
import { map } from 'rxjs/operators';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class PnpMrStockApiService {

    constructor(private apollo: Apollo, private urlService: UrlsService, private http: HttpClient) {}

    private stockUrl = this.urlService.backendUrl + 'api/products/';

    submitPnPStock(mrPnPStock) {
        return this.http.post<any>(this.stockUrl + 'stock/meatriteStock/insert/', mrPnPStock);
    }

    getAllPnPProducts(): Observable<any> {
        return this.apollo
            .watchQuery({
                // variables: { name: formName },
                query: gql`
                query getPnPProducts($brandID:ID="UHJvZHVjdEJyYW5kc1R5cGU6NQ=="){
                    nodeProductlist(brand:$brandID){
                        edges{
                            node{
                                rowid
                                productid
                                rankingInGroup
                                batchgroup{
                                    rowid
                                    }
                                }
                            }
                        }
                    }
                `,
            })
            .valueChanges.pipe(
                map(result => this.consolidateProductGroupNames(result.data['nodeProductlist'].edges))
                );
    }
    private consolidateProductGroupNames(data) {
        const flattendData = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData = {};
            singleData['productid'] = data[array].node.rowid;
            singleData['productMRid'] = data[array].node.productid;
            singleData['rankingInGroup'] = data[array].node.rankingInGroup;
            singleData['batchGroupid'] = data[array].node.batchgroup.rowid;
            flattendData.push(singleData);
        }
        return flattendData;
    }

    getBatchGroupids(batchMRid): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: { batchMRid: batchMRid },
                query: gql`
                query getBatchNumberIds($batchMRid: String){
                    nodeBatchnumbers(batchMRid:$batchMRid){
                      edges{
                        node{
                          productbatchnumbersjunctionSet{
                            edges{
                              node{
                                rowid
                                batchGroup{
                                  rowid
                                }
                                batchNumbers{
                                  batchMRid
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateBatchGroupids(result.data['nodeBatchnumbers']
                .edges[0].node.productbatchnumbersjunctionSet.edges))
                );
    }

    private consolidateBatchGroupids(data) {
        const flattendData = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData = {};
            singleData['batchGroupJunctionid'] = data[array].node.rowid;
            singleData['batchGroupid'] = data[array].node.batchGroup.rowid;
            singleData['batchMRid'] = data[array].node.batchNumbers.batchMRid;
            flattendData.push(singleData);
        }
        return flattendData;
    }
}
