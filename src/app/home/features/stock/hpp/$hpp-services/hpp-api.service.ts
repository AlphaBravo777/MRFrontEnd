import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class HppApiService {
    constructor(private http: HttpClient, private apollo: Apollo) {}

    getAllPnPProducts(): Observable<any> {
        return this.apollo
            .watchQuery({
                // variables: { accountID: accountID },
                query: gql`
                query getPnPProducts($brandID:ID="UHJvZHVjdEJyYW5kc1R5cGU6NQ=="){
                    nodeProductlist(brand:$brandID){
                    edges{
                        node{
                            rowid
                            productid
                            }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateGetAllPnPProducts(result.data['nodeProductlist'].edges)));
    }

    private consolidateGetAllPnPProducts(data) {
        const flattendData = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData = {};
                singleData['productName'] = data[array].node.productid;
                singleData['productid'] = data[array].node.rowid;
                flattendData.push(singleData);
        }
        return flattendData;
    }

    getPreHppStock(): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/hppPreHppStock.json').pipe(
            map(data => data.hppPreHppStock),
            map(data =>
                data.map(stock => {
                    stock.stockTotal = this.getTotals(stock.batches, 'amount');
                    return stock;
                })
            )
        );
    }

    getPostHppStock(): Observable<[]> {
        return this.http.get<any>('assets/mockData/meatriteStock/hppPostHppStock.json').pipe(
            map(data => data.hppPostHppStock),
            map(data =>
                data.map(stock => {
                    stock.stockTotal = this.getTotals(stock.batches, 'amount');
                    return stock;
                })
            )
        );
    }

    getHppLeakers(): Observable<[]> {
        return this.http
            .get<any>('assets/mockData/meatriteStock/hppLeakers.json').pipe(
                map(data => data.hppLeakers),
                map(data => data.map(stock => {
                    stock.stockTotal = this.getTotals(stock.batches, 'amount');
                    return stock;
                }))
            );
    }

    getTotals(data: [], property: string) {
        if (data) {
            let total = 0;
            data.map(dataPoint => (total = total + dataPoint[property]));
            return total;
        }
    }
}
