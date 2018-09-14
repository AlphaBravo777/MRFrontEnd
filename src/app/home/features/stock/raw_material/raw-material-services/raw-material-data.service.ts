import { Injectable } from '@angular/core';
import { Observable, of, interval  } from 'rxjs';
import { map, timeout, take, delay } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular-boost';
import { IRawMaterialStockItem } from './RawMaterial';

@Injectable({
    providedIn: 'root'
})
export class RawMaterialDataService {

    hardAmount = 222;

    constructor(private apollo: Apollo) { }

    groupByArray(xs, key) {
        return xs.reduce(function (rv, x) {
            const v = key instanceof Function ? key(x) : x[key];
            const el = rv.find(r => r && r.key === v);
            if (el) {
                el.values.push(x);
            } else {
                rv.push({ key: v, values: [x], number: 2 });  // Math.floor((Math.random() * 100) + 1)
            }
            return rv;
        }, []);
    }

    getGraphQLdata(): Observable<any> {
        return this.apollo
            .watchQuery({
                query: gql`
                {
                    allProducts{
                      edges{
                        node{
                          productid
                          proddescription
                          unitweight
                          productonhold
                          batchranking
                        }
                      }
                    }
                  }
            `,
            })
            .valueChanges.pipe(
                take(1),
                map(result => this.flattenData(result.data['allProducts'])));
    }

    createHardcodedData(): Observable<any[]> {
        const data = [
            // tslint:disable
            { stockName: 'MDM Batch 105', category: 'MDM', supplier: 'Federated', baseUnitSize: 15, measureUnit: 'kg', modelGroup: 'MDM', price: '12.50', active: true, amount: this.hardAmount },
            { stockName: 'Erythrozine', category: 'Ingredients', supplier: 'ABC', baseUnitSize: 50, measureUnit: 'lt', modelGroup: 'Erythrozine', price: '77.50', active: true, amount: 17 },
            { stockName: 'Isolate', category: 'Ingredients', supplier: 'Crown National', baseUnitSize: 20, measureUnit: 'kg', modelGroup: 'Isolate', price: '21.50', active: true, amount: 8000 },
            { stockName: 'MDM Batch 98', category: 'MDM', supplier: 'Federated', baseUnitSize: 20, measureUnit: 'kg', modelGroup: 'MDM', price: '9.75', active: true, amount: 10000 },
            { stockName: 'Russian Brown', category: 'Ingredients', supplier: 'DFG', baseUnitSize: 40, measureUnit: 'lt', modelGroup: 'Russian Brown', price: '45.30', active: true, amount: 8 },
            { stockName: 'Vencor Russian Spice', category: 'Spices', supplier: 'Freddy Hirch', baseUnitSize: 15, measureUnit: 'kg', modelGroup: 'Vencor Russian Spice', price: '45.00', active: true, amount: 710 },
            { stockName: 'PnP Premium Chicken Vienna ', category: 'Spices', supplier: 'Freddy Hirch', baseUnitSize: 15, measureUnit: 'kg', modelGroup: 'PnP Premium Chicken Vienna', price: '50.00', active: true, amount: 330 },
            { stockName: 'Vencor Russian 1kg', category: 'Labels - Brands', supplier: 'DFG', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Vencor Russian 1kg', price: '15.30', active: true, amount: 23 },
            { stockName: 'Freshers RV 1kg', category: 'Labels - Brands', supplier: 'DFG', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Freshers RV 1kg', price: '17.80', active: true, amount: 7 },
            { stockName: 'MDM Batch 102', category: 'MDM', supplier: 'Azine', baseUnitSize: 18, measureUnit: 'kg', modelGroup: 'MDM', price: '11.00', active: true, amount: 3500 },
            { stockName: 'Labels Regular Use - Radiant Green', category: 'Labels - Generic', supplier: 'ERTS', baseUnitSize: 3000, measureUnit: 'units', modelGroup: 'Labels Regular Use - Radiant Green', price: '23.50', active: true, amount: 15 },
            { stockName: 'Bags Clear (600x900)', category: 'Packaging - Bags', supplier: 'VB', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Bags Clear (600x900)', price: '16.10', active: true, amount: 8 },
            { stockName: 'Bags Clear (300x600)', category: 'Packaging - Bags', supplier: 'VB', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Bags Clear (300x600)', price: '18.70', active: true, amount: 33 },
            { stockName: 'Lidding Vencor Red Vienna 1kg', category: 'Packaging - Lidding', supplier: 'LKJFGT', baseUnitSize: 500, measureUnit: 'm', modelGroup: 'Lidding Vencor Red Vienna 1kg', price: '365.50', active: true, amount: 9 },
            // tslint:enable
        ];
        return of(data);
    }

    sayHello() {
        this.hardAmount = Math.floor((Math.random() * 1000) + 1);
        console.log(this.hardAmount);
    }

    returnData(): Observable<any[]> {
        return this.createHardcodedData().pipe(
            take(1),  // This will only give the first result
            map(result => this.groupByArray(result, 'category')),  // This will change the data before sending through
        );
    }

    flattenData(data): IRawMaterialStockItem[] {
        const flattendDatas: IRawMaterialStockItem[] = [];
        // console.log('+++ ', data.edges[1].node.productid);

        for (let array = 0; array < data.edges.length; ++array) {
            const singleData = <IRawMaterialStockItem>{};
            singleData.stockName = data.edges[array].node.productid;
            singleData.category = 'MDM';
            singleData.supplier = 'Freddy Hirsch';
            singleData.baseUnitSize = data.edges[array].node.unitweight;
            singleData.measureUnit = 'kg';
            singleData.modelGroup = 'Spice';
            singleData.price = Math.floor((Math.random() * 1000) + 1);
            singleData.active = data.edges[array].node.productonhold;
            singleData.amount = Math.floor((Math.random() * 1000) + 1);
            flattendDatas.push(singleData);
        }
        console.log(flattendDatas);
        return this.groupByArray(flattendDatas, 'category');
    }

}
