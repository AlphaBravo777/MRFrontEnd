import { Injectable } from '@angular/core';
import { Observable, of, interval  } from 'rxjs';
import { map, timeout, take, delay } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular-boost';
import { IRawMaterialStockItem, IRawMaterialGroup } from './RawMaterial';

@Injectable({
    providedIn: 'root'
})
export class RawMaterialDataService {

    hardAmount = 12000;

    constructor(private apollo: Apollo) { }

    groupByArray(xs, key) {   // Do not change this function too much, so that it can be used continuesly
        return xs.reduce(function (rv, x) {
            const v = key instanceof Function ? key(x) : x[key];
            const el = rv.find(r => r && r.key === v);
            if (el) {
                el.values.push(x);
            } else {
                rv.push({ key: v, values: [x], number: x.modelPersLeft });  // Math.floor((Math.random() * 100) + 1)
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
            { stockName: 'MDM Batch 105', category: 'MDM', supplier: 'Federated', baseUnitSize: 15, measureUnit: 'kg', modelGroup: 'MDM', price: '12.50', active: true, amount: this.hardAmount, modelPersLeft: 40, modelStock: 20000, dailyUse: 7000 },
            { stockName: 'Erythrozine', category: 'Ingredients', supplier: 'ABC', baseUnitSize: 50, measureUnit: 'lt', modelGroup: 'Erythrozine', price: '77.50', active: true, amount: 25, modelPersLeft: 77, modelStock: 20, dailyUse: 0.3 },
            { stockName: 'Isolate', category: 'Ingredients', supplier: 'Crown National', baseUnitSize: 20, measureUnit: 'kg', modelGroup: 'Isolate', price: '21.50', active: true, amount: 8000, modelPersLeft: 77, modelStock: 10000, dailyUse: 2000 },
            { stockName: 'MDM Batch 98', category: 'MDM', supplier: 'Federated', baseUnitSize: 20, measureUnit: 'kg', modelGroup: 'MDM', price: '9.75', active: true, amount: 10000, modelPersLeft: 40, modelStock: 20000, dailyUse: 1000 },
            { stockName: 'Russian Brown', category: 'Ingredients', supplier: 'DFG', baseUnitSize: 40, measureUnit: 'lt', modelGroup: 'Russian Brown', price: '45.30', active: true, amount: 8, modelPersLeft: 77, modelStock: 20, dailyUse: 1.1 },
            { stockName: 'Vencor Russian Spice', category: 'Spices', supplier: 'Freddy Hirch', baseUnitSize: 15, measureUnit: 'kg', modelGroup: 'Vencor Russian Spice', price: '45.00', active: true, amount: 710, modelPersLeft: 60, modelStock: 900, dailyUse: 70 },
            { stockName: 'PnP Premium Chicken Vienna ', category: 'Spices', supplier: 'Freddy Hirch', baseUnitSize: 15, measureUnit: 'kg', modelGroup: 'PnP Premium Chicken Vienna', price: '50.00', active: true, amount: 330, modelPersLeft: 60, modelStock: 550, dailyUse: 40 },
            { stockName: 'Vencor Russian 1kg', category: 'Labels - Brands', supplier: 'DFG', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Vencor Russian 1kg', price: '15.30', active: true, amount: 23, modelPersLeft: 100, modelStock: 40, dailyUse: 4 },
            { stockName: 'Freshers RV 1kg', category: 'Labels - Brands', supplier: 'DFG', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Freshers RV 1kg', price: '17.80', active: true, amount: 7, modelPersLeft: 100, modelStock: 40, dailyUse: 2 },
            { stockName: 'MDM Batch 102', category: 'MDM', supplier: 'Azine', baseUnitSize: 18, measureUnit: 'kg', modelGroup: 'MDM', price: '11.00', active: true, amount: 3500, modelPersLeft: 40, modelStock: 20000, dailyUse: 7000 },
            { stockName: 'Labels Regular Use - Radiant Green', category: 'Labels - Generic', supplier: 'ERTS', baseUnitSize: 3000, measureUnit: 'units', modelGroup: 'Labels Regular Use - Radiant Green', price: '23.50', active: true, amount: 15, modelPersLeft: 33, modelStock: 20, dailyUse: 2 },
            { stockName: 'Bags Clear (600x900)', category: 'Packaging - Bags', supplier: 'VB', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Bags Clear (600x900)', price: '16.10', active: true, amount: 2, modelPersLeft: 10, modelStock: 16, dailyUse: 0.7 },
            { stockName: 'Bags Clear (300x600)', category: 'Packaging - Bags', supplier: 'VB', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Bags Clear (300x600)', price: '18.70', active: true, amount: 33, modelPersLeft: 10, modelStock: 25, dailyUse: 1.2 },
            { stockName: 'Lidding Vencor Red Vienna 1kg', category: 'Packaging - Lidding', supplier: 'LKJFGT', baseUnitSize: 500, measureUnit: 'm', modelGroup: 'Lidding Vencor Red Vienna 1kg', price: '365.50', active: true, amount: 9, modelPersLeft: 50, modelStock: 14, dailyUse: 0.5 },
            // tslint:enable
        ];
        return of(data);
    }

    createHardcodedStock(): Observable<any[]> {
        const data = [
            // tslint:disable
            { id: 1, stockName: 'MDM Batch 105', category: 'MDM', supplier: 'Federated', baseUnitSize: 15, measureUnit: 'kg', modelGroup: 'MDM', price: '12.50', active: true, amount: 0 },
            { id: 2, stockName: 'Erythrozine', category: 'Ingredients', supplier: 'ABC', baseUnitSize: 50, measureUnit: 'lt', modelGroup: 'Erythrozine', price: '77.50', active: true, amount: 1 },
            { id: 3, stockName: 'Isolate', category: 'Ingredients', supplier: 'Crown National', baseUnitSize: 20, measureUnit: 'kg', modelGroup: 'Isolate', price: '21.50', active: true, amount: 2 },
            { id: 4, stockName: 'MDM Batch 98', category: 'MDM', supplier: 'Federated', baseUnitSize: 20, measureUnit: 'kg', modelGroup: 'MDM', price: '9.75', active: true, amount: 3 },
            { id: 5, stockName: 'Russian Brown', category: 'Ingredients', supplier: 'DFG', baseUnitSize: 40, measureUnit: 'lt', modelGroup: 'Russian Brown', price: '45.30', active: true, amount: 4 },
            { id: 6, stockName: 'Vencor Russian Spice', category: 'Spices', supplier: 'Freddy Hirch', baseUnitSize: 15, measureUnit: 'kg', modelGroup: 'Vencor Russian Spice', price: '45.00', active: true, amount: 5 },
            { id: 7, stockName: 'PnP Premium Chicken Vienna ', category: 'Spices', supplier: 'Freddy Hirch', baseUnitSize: 15, measureUnit: 'kg', modelGroup: 'PnP Premium Chicken Vienna', price: '50.00', active: true, amount: 6 },
            { id: 8, stockName: 'Vencor Russian 1kg', category: 'Labels - Brands', supplier: 'DFG', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Vencor Russian 1kg', price: '15.30', active: true, amount: 7 },
            { id: 9, stockName: 'Freshers RV 1kg', category: 'Labels - Brands', supplier: 'DFG', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Freshers RV 1kg', price: '17.80', active: true, amount: 8 },
            { id: 10, stockName: 'MDM Batch 102', category: 'MDM', supplier: 'Azine', baseUnitSize: 18, measureUnit: 'kg', modelGroup: 'MDM', price: '11.00', active: true, amount: 9 },
            { id: 11, stockName: 'Labels Regular Use - Radiant Green', category: 'Labels - Generic', supplier: 'ERTS', baseUnitSize: 3000, measureUnit: 'units', modelGroup: 'Labels Regular Use - Radiant Green', price: '23.50', active: true, amount: 10 },
            { id: 12, stockName: 'Bags Clear (600x900)', category: 'Packaging - Bags', supplier: 'VB', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Bags Clear (600x900)', price: '16.10', active: true, amount: 11 },
            { id: 13, stockName: 'Bags Clear (300x600)', category: 'Packaging - Bags', supplier: 'VB', baseUnitSize: 1000, measureUnit: 'units', modelGroup: 'Bags Clear (300x600)', price: '18.70', active: true, amount: 12 },
            { id: 14, stockName: 'Lidding Vencor Red Vienna 1kg', category: 'Packaging - Lidding', supplier: 'LKJFGT', baseUnitSize: 500, measureUnit: 'm', modelGroup: 'Lidding Vencor Red Vienna 1kg', price: '365.50', active: true, amount: 13 },
            // tslint:enable
        ];
        return of(data);
    }

    calculateValues1(data) {
        const groupedData = this.flattenData(data);
        for (let group = 0; group < groupedData.length; ++group) {
            let amount = 100;
            for (let value = 0; value < groupedData[group].values.length; ++value) {
                if (groupedData[group].values[value].modelPersLeft < amount) {
                    amount = groupedData[group].values[value].modelPersLeft;
                }
            }
            groupedData[group].number = amount;
        }
        return groupedData;
    }

    returnStockTakeData(): Observable<any[]> {
        return this.createHardcodedStock().pipe(
            take(1),  // This will only give the first result
            map(result => this.groupByArray(result, 'category')),
        );
    }

    returnData(): Observable<any[]> {
        return this.createHardcodedData().pipe(
            take(1),  // This will only give the first result
            map(result => this.calculateValues1(result)),  // This will change the data before sending through
        );
    }

    flattenData(data): IRawMaterialGroup[] {
        const flattendDatas: IRawMaterialStockItem[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IRawMaterialStockItem>{};
            singleData.stockName = data[array].stockName;
            singleData.category = data[array].category;
            singleData.supplier = data[array].supplier;
            singleData.baseUnitSize = data[array].baseUnitSize;
            singleData.measureUnit = data[array].measureUnit;
            singleData.modelGroup = data[array].modelGroup;
            singleData.price = data[array].price;
            singleData.active = data[array].active;
            singleData.amount = data[array].amount;
            singleData.modelStock = data[array].modelStock;
            singleData.modelPersLeft = Math.floor(singleData.amount / singleData.modelStock * 100);
            if (singleData.modelPersLeft > 100) {
                singleData.modelPersLeft = 100;
            }
            singleData.dailyUse = data[array].dailyUse;
            singleData.daysLeft = Math.floor(singleData.amount / singleData.dailyUse);
            flattendDatas.push(singleData);
        }
        // console.log(flattendDatas);
        return this.groupByArray(flattendDatas, 'category');
    }

}
