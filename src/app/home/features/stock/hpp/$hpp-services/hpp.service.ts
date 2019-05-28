import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HppApiService } from './hpp-api.service';
import { delay, take, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HppService {

    constructor(private hppApiService: HppApiService) {}

    getPnpProducts(): Observable<any> {
        return this.hppApiService.getAllPnPProducts().pipe(
            take(1),
        );
    }

    // getMeatriteStock(): Observable<any> {
    //     return this.hppApiService.getMeatriteStock().pipe(
    //         take(1),
    //         tap(data => console.log('The Meatrite Stock = ', data))
    //     );
    // }

    getPostHppStock(): Observable<any> {
        return this.hppApiService.getHppMeatriteStock('SFBQUHJvZHVjdFN0YXR1c1R5cGU6MQ==').pipe(
            take(1),
            map(data => JSON.parse(JSON.stringify(data))),
            map(data => this.groupProductBatchesTogether(data)),
        );
    }

    getPreHppStock(): Observable<any> {
        return this.hppApiService.getHppMeatriteStock('SFBQUHJvZHVjdFN0YXR1c1R5cGU6Mg==').pipe(
            take(1),
            map(data => JSON.parse(JSON.stringify(data))),
            map(data => this.groupProductBatchesTogether(data)),
        );
    }

    getLeakersStock(): Observable<any> {
        return this.hppApiService.getHppMeatriteStock('SFBQUHJvZHVjdFN0YXR1c1R5cGU6Mw==').pipe(
            take(1),
            map(data => JSON.parse(JSON.stringify(data))),
            map(data => this.groupProductBatchesTogether(data)),
        );
    }

    getMeatriteFactoryStock(): Observable<any> {
        return this.hppApiService.getMeatriteStock().pipe(
            take(1),
            map(data => JSON.parse(JSON.stringify(data))),
            map(data => this.groupProductBatchesTogether(data)),
        );
    }

    groupProductBatchesTogether(primitiveStock) {  // This is almost the same code as hpp-summary service.consolidateMeatriteStock
        const consolidatedStock = [];
        if (consolidatedStock.length === 0 && primitiveStock.length !== 0) {
            consolidatedStock.push({
                productName: primitiveStock[0].productName, productid: primitiveStock[0].productid,
                batches: [{batchNumber: primitiveStock[0].batchNumber,
                    amount: primitiveStock[0].amount, batchNumberid: primitiveStock[0].batchNumberid}]
            });
            primitiveStock.splice(0, 1);
        }
        while (primitiveStock.length > 0) {
            let flag = false;
            for (let con = 0; con < consolidatedStock.length; con++) {
                if (primitiveStock[0].productid === consolidatedStock[con].productid) {
                    consolidatedStock[con].batches.push(
                        {batchNumber: primitiveStock[0].batchNumber,
                            amount: primitiveStock[0].amount, batchNumberid: primitiveStock[0].batchNumberid}
                    );
                    flag = true;
                }
            }
            if (!flag) {
                consolidatedStock.push({
                    productName: primitiveStock[0].productName, productid: primitiveStock[0].productid,
                    batches: [{batchNumber: primitiveStock[0].batchNumber,
                        amount: primitiveStock[0].amount, batchNumberid: primitiveStock[0].batchNumberid}]
                });
            }
            primitiveStock.splice(0, 1);
        }
        return consolidatedStock;
    }

}
