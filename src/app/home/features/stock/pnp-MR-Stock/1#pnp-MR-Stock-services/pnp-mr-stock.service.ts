import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { PnpMrStockApiService } from './pnp-mr-stock-api.service';
import { take, tap, map, concatMap } from 'rxjs/operators';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';

@Injectable({
    providedIn: 'root'
})
export class PnpMrStockService {

    constructor(private pnpMRStockApiService: PnpMrStockApiService, private toolbox: ToolboxGroupService) {}

    getAllPnPStock(): Observable<any> {
        return this.pnpMRStockApiService.getAllPnPProducts().pipe(
            take(1),
            map(data => this.toolbox.sorting(data, 'rankingInGroup')),
            tap(data => console.log('PnP stock = ', data))
        );
    }

    submitPnPStock(pnpStockForm): Observable<any> {
        // const mrProductBatch
        // const batchids = this.getBatchIds(pnpStockForm.value.batches);
        return this.getBatchIds(pnpStockForm.value.batches).pipe(
            map(data => this.removeNullValuesAndFlatten(pnpStockForm.value.products, data)),
            tap(data => console.log('The batchdata here = ', data)),
            concatMap(data => this.pnpMRStockApiService.submitPnPStock(data))
        );
    }

    getBatchIds(batchMRids): Observable<any> {
        const batchGroupids$ = [];
        for (let batch = 0; batch < batchMRids.length; batch++) {
            const $obs = this.pnpMRStockApiService.getBatchGroupids(batchMRids[batch].batchNumber);
            batchGroupids$.push($obs);
        }
        return combineLatest(batchGroupids$).pipe(
            map(data => {
                const array = [];
                for (let arr = 0; arr < data.length; arr++) {
                    array.push(...data[arr]);
                }
                return array;
            }),
            // tap((data) => console.log('I am subscribed to and im running', data)),
        );
    }

    removeNullValuesAndFlatten(mrPnPStockForm, batchGroupJunctionArray) {
        let finalArray = [];
        mrPnPStockForm.forEach(prod => {
            const array1 = prod.amounts.filter(amount => amount.amount !== '');
            prod.amounts = [... array1];
        });
        const array2 = mrPnPStockForm.filter(prod => prod.amounts.length !== 0);
        mrPnPStockForm = array2;
        mrPnPStockForm.forEach(prod => {
            prod.amounts.forEach(amount => {
                amount.userid =  JSON.parse(localStorage.getItem('userID'));
                amount.productid =  prod.productid;
                amount.batchGroupid = prod.batchGroupid;
                finalArray.push(amount);
            });
        });
        finalArray.forEach(item => {
            item.amount = this.toolbox.changeEquationToNumber(item.amount);
        });
        // console.log('Here is the final DB admitted array ', finalArray);
        finalArray = this.addBatchGroupIdJunctions(finalArray, batchGroupJunctionArray);
        return finalArray;
    }

    addBatchGroupIdJunctions(currentProductsArray, batchGroupJunctionArray) {
        for (let prod = 0; prod < currentProductsArray.length; prod++) {
            for (let bat = 0; bat < batchGroupJunctionArray.length; bat++) {
                if (currentProductsArray[prod].batchNumber === batchGroupJunctionArray[bat].batchMRid &&
                    currentProductsArray[prod].batchGroupid === batchGroupJunctionArray[bat].batchGroupid) {
                        currentProductsArray[prod].batchNumberJunctionid = batchGroupJunctionArray[bat].batchGroupJunctionid;
                }
            }
        }
        return currentProductsArray;
    }

}

// {amount: 5, batchNumber: "09:4", userid: 15, productid: 127}
// {batchGroupJunctionid: 51, batchGroupid: 3, batchMRid: "09:4"}
