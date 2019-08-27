import { Injectable } from '@angular/core';
// tslint:disable-next-line
import {
    IProcessedStock,
    IProcessedStockAmounts,
    IProcessedStockWithAmount
} from 'src/app/home/features/stock/processed/stock-take/proc-stock-services/processed-stock';

@Injectable({
    providedIn: 'root'
})
export class ToolboxGroupService {
    constructor() {}

    groupByArray(dataArray, key) {
        return dataArray.reduce(function(rv, x) {
            const v = key instanceof Function ? key(x) : x[key];
            const el = rv.find(r => r && r.key === v);
            if (el) {
                el.values.push(x);
            } else {
                rv.push({ key: v, values: [x] });
            }
            return rv;
        }, []);
    }

    // To call this function:
    // const result = this.toolBox.multipleGroupByArray(
    //    dataArray, (property: IProperty) => [property.prop1, property.prop2, property.prop3]);
    multipleGroupByArray(dataArray, groupPropertyArray) {
        const groups = {};
        dataArray.forEach(item => {
            const group = JSON.stringify(groupPropertyArray(item));
            groups[group] = groups[group] || [];
            groups[group].push(item);
        });
        return Object.keys(groups).map(function(group) {
            return groups[group];
        });
    }

    sorting(dataArray: any[], sortProperty: string) {
        function compare(a, b) {
            if (a[sortProperty] < b[sortProperty]) {
                return -1;
            }
            if (a[sortProperty] > b[sortProperty]) {
                return 1;
            }
            return 0;
        }
        return dataArray.sort(compare);
    }

    multiFieldSorting(dataArray: any[], sortPropertyArray: string[]) {
        // sortPropertyArray = ['date', 'time']
        // sortPropertyArray, first item in array will be primary sort - it will override second item.
        'use strict';
        const fieldSorter = fields => (a, b) =>
            fields
                .map(o => {
                    let dir = 1;
                    if (o[0] === '-') {
                        dir = -1;
                        o = o.substring(1);
                    }
                    return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
                })
                .reduce((p, n) => (p ? p : n), 0);

        const sortedHomes = dataArray.sort(fieldSorter(sortPropertyArray));
        return sortedHomes;
    }

    mergeTwoArrays(
        emptyContainers: IProcessedStock[],
        timeAmounts: IProcessedStockAmounts[],
        amountsArray: IProcessedStockWithAmount[]
    ): IProcessedStockWithAmount[] {
        amountsArray = emptyContainers.slice();
        for (let i = amountsArray.length - 1; i >= 0; i--) {
            if (amountsArray[i].amount) {
                delete amountsArray[i].amount;
            }
        }
        const b = amountsArray.slice();
        // console.log('Sierra second value ', b, timeAmounts);
        for (let small = timeAmounts.length - 1; small >= 0; small--) {
            for (let large = amountsArray.length - 1; large >= 0; large--) {
                if (
                    timeAmounts[small].containerID ===
                    amountsArray[large].containerID
                ) {
                    amountsArray[large].amount = timeAmounts[small].amount;
                    break;
                }
            }
        }
        const c = amountsArray.slice();
        // console.log('papa third value ', c, timeAmounts);
        return amountsArray;
    }

    changeEquationToNumber(string) {
        if (string === '') {
            return 0;
        }

        for (let i = string.length - 1; i >= 0; i--) {
            if (string[i] === ')') {
                const n = /[+*]$/.test(string[string.length - 1]);
                if (!n) {
                    return Function('"use strict"; return (' + string + ')')();
                } else {
                    return undefined;
                }
            } else if (string[i] === '(') {
                return undefined;
            }
        }
        const m = /[+*]$/.test(string[string.length - 1]);
        if (!m) {
            return Function('"use strict"; return (' + string + ')')();
        } else {
            return undefined;
        }
    }

    removeObjectsWithDuplicatePropertiesInArray(arr: Array<any>, key: string) {
        // call using removeObjectsWithDuplicatePropertiesInArray(arrayOfObjects, 'propertyName')
        const values = {};
        return arr.filter(function(item) {
            const val = item[key];
            const exists = values[val];
            values[val] = true;
            return !exists;
        });
    }
}
