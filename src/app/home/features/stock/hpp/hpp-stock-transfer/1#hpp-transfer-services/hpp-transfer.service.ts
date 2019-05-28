import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { HppService } from '../../$hpp-services/hpp.service';
import { HppTransferApiService } from './hpp-transfer-api.service';

@Injectable({
    providedIn: 'root'
})
export class HppTransferService {

    private postHppData = new BehaviorSubject<any>(null);
    currentPostHppData$ = this.postHppData.asObservable();
    private preHppData = new BehaviorSubject<any>(null);
    currentPreHppData$ = this.preHppData.asObservable();
    private leakerData = new BehaviorSubject<any>(null);
    currentLeakerData$ = this.leakerData.asObservable();
    private meatriteStockData = new BehaviorSubject<any>(null);
    currentMeatriteStock$ = this.meatriteStockData.asObservable();

    constructor(private hppService: HppService, private hppTransferApiService: HppTransferApiService) {
        this.getInitialData();
    }

    getInitialData() {
        this.hppService.getPostHppStock().pipe(
            tap(data => console.log('HOTEL - postHpp', data)),
            tap(data => this.postHppData.next(data)),
            concatMap(() => this.hppService.getPreHppStock()),
            tap(data => console.log('HOTEL - preHpp', data)),
            tap(data => this.preHppData.next(data)),
            concatMap(() => this.hppService.getLeakersStock()),
            tap(data => console.log('HOTEL - leakers', data)),
            tap(data => this.leakerData.next(data)),
            concatMap(() => this.hppService.getMeatriteFactoryStock()),
            tap(data => console.log('HOTEL - meatriteStock', data)),
            tap(data => this.meatriteStockData.next(data)),
        ).subscribe();
    }

    changePostHppStock(newPostHppStock) {

        this.postHppData.next(newPostHppStock);
    }

    changePreHppStock(newPreHppStock) {
        this.preHppData.next(newPreHppStock);
    }

    changeLeakerHppStock(newLeakerHppStock) {
        console.log('I am running', newLeakerHppStock);
        this.leakerData.next(newLeakerHppStock);
    }

    changeMeatriteStock(newMeatriteStock) {
        console.log('I am running', newMeatriteStock);
        this.meatriteStockData.next(newMeatriteStock);
    }


    flattenTransferBatches(source, destination) {
        console.log('Flatten data: Source = ', source, ' destination = ', destination );
        // sometimes the data comes in here when it is still "null", and then you get errors

        // There is an error here somewhere
        // The problem is that the original array never gets updated. You create a new array, but the old one still just have one data point
        // Go through the two arrays, and put them together, if one of them doesn't have a partner, create one and give it 0
        const final = [];
        for (let src = 0; src < source.length; src++) {
            for (let batch = 0; batch < source[src].batches.length; batch++) {
                final.push({productName: source[src].productName, productid: source[src].productid,
                    batchNumber: source[src].batches[batch].batchNumber, sourceAmount: source[src].batches[batch].amount,
                    destinationAmount: 0, batchNumberid: source[src].batches[batch].batchNumberid});
            }
        }
        for (let dest = 0; dest < destination.length; dest++) {
            for (let batch = 0; batch < destination[dest].batches.length; batch++) {
                let flag = true;
                for (let fin = 0; fin < final.length; fin++) {
                    if (final[fin].productid === destination[dest].productid &&
                        final[fin].batchNumber === destination[dest].batches[batch].batchNumber) {
                            final[fin].destinationAmount = destination[dest].batches[batch].amount;
                            flag = false;
                            break;
                        }
                }
                if (flag) {
                    final.push({productName: destination[dest].productName, productid: destination[dest].productid,
                        batchNumber: destination[dest].batches[batch].batchNumber, sourceAmount: 0,
                        destinationAmount: destination[dest].batches[batch].amount,
                        batchNumberid: destination[dest].batches[batch].batchNumberid});
                }
            }
        }
        // this.cheaplyCreateNewArray(final, source, destination);
        // Because the arrays are still the same, and they should have these items extra now
        return final;
    }

    cheaplyCreateNewArray(final) {
        let newSource = [];
        let newDestination = [];
        for (let fin = 0; fin < final.length; fin++) {
            newSource[fin] = {productName: final[fin].productName, productid: final[fin].productid,
                amount: final[fin].sourceAmount, batchNumber: final[fin].batchNumber, batchNumberid: final[fin].batchNumberid};
            newDestination[fin] = {productName: final[fin].productName, productid: final[fin].productid,
                amount: final[fin].destinationAmount, batchNumber: final[fin].batchNumber, batchNumberid: final[fin].batchNumberid};
        }
        newSource = [... this.hppService.groupProductBatchesTogether(newSource)];
        newDestination = [... this.hppService.groupProductBatchesTogether(newDestination)];

        return  [newSource, newDestination];
    }

    changeCurrentStock(source, destination, changeData) {
        // Add and subtract the amount that was chosen by the user
        console.log('ZULU = ', destination);
        for (let prod = 0; prod < source.length; prod++) {
            if (source[prod].productid === changeData.index.productid) {
                for (let bat = 0; bat < source[prod].batches.length; bat++) {
                    if (source[prod].batches[bat].batchNumber === changeData.index.batchNumber) {
                        if (changeData.side === 'left') {
                            source[prod].batches[bat].amount = source[prod].batches[bat].amount + changeData.value;
                        } else {
                            source[prod].batches[bat].amount = source[prod].batches[bat].amount - changeData.value;
                        }
                    }
                }
            }
        }
        for (let prod = 0; prod < destination.length; prod++) {
            if (destination[prod].productid === changeData.index.productid) {
                for (let bat = 0; bat < destination[prod].batches.length; bat++) {
                    if (destination[prod].batches[bat].batchNumber === changeData.index.batchNumber) {
                        if (changeData.side === 'left') {
                            destination[prod].batches[bat].amount = destination[prod].batches[bat].amount - changeData.value;
                        } else {
                            destination[prod].batches[bat].amount = destination[prod].batches[bat].amount + changeData.value;
                        }
                    }
                }
            }
        }
        // if (destination.length === 0) {
        //     destination.push()destination[0].batches[0].amount = changeData.value;
        // }
        console.log('ZULU = ', destination);
    }

    submitPreToPostStock(rawData) {
        console.log(rawData);
        const preHppStock = [];
        const postHppStock = [];
        const userid = JSON.parse(localStorage.getItem('userID'));
        for (let arr = 0; arr < rawData.length; arr++) {
            if (rawData[arr].sourceAmount !== 0) {
                preHppStock.push(
                    this.createRecord(
                        2, rawData[arr].productid, rawData[arr].batchNumberid, rawData[arr].sourceAmount, userid
                ));
            }
            if (rawData[arr].destinationAmount !== 0) {
                postHppStock.push(
                    this.createRecord(
                        1, rawData[arr].productid, rawData[arr].batchNumberid, rawData[arr].destinationAmount, userid
                ));
            }
        }
        console.log(preHppStock, postHppStock);
        if (preHppStock.length > 0) {
            this.hppTransferApiService.hppUpdateStock(preHppStock).subscribe();
            console.log('ZULU = ', preHppStock);
        } else {
            this.hppTransferApiService.hppDeleteStock(2).subscribe();
        }
        if (postHppStock.length > 0) {
            this.hppTransferApiService.hppUpdateStock(postHppStock).subscribe();
        } else {
            this.hppTransferApiService.hppDeleteStock(1).subscribe();
        }
    }

    submitPostToLeakerStock(rawData) {
        console.log(rawData);
        const postHppStock = []; // change names, not orderes
        const leakerHppStock = []; // change names, not orders
        const userid = JSON.parse(localStorage.getItem('userID'));
        for (let arr = 0; arr < rawData.length; arr++) {
            if (rawData[arr].sourceAmount !== 0) {
                postHppStock.push(
                    this.createRecord(
                        1, rawData[arr].productid, rawData[arr].batchNumberid, rawData[arr].sourceAmount, userid  // change number
                ));
            }
            if (rawData[arr].destinationAmount !== 0) {
                leakerHppStock.push(
                    this.createRecord(
                        3, rawData[arr].productid, rawData[arr].batchNumberid, rawData[arr].destinationAmount, userid // change number
                ));
            }
        }
        console.log(postHppStock, leakerHppStock);
        this.hppTransferApiService.hppUpdateStock(postHppStock).pipe(
            concatMap(() => this.hppTransferApiService.hppUpdateStock(leakerHppStock))
        ).subscribe();
    }

    submitMeatriteToPreHppStock(rawData) {
        console.log(rawData);
        const meatriteStock = [];
        const preHppStock = [];
        const userid = JSON.parse(localStorage.getItem('userID'));
        for (let arr = 0; arr < rawData.length; arr++) {
            if (rawData[arr].sourceAmount !== 0) {
                meatriteStock.push(
                    this.createRecord(
                        2, rawData[arr].productid, rawData[arr].batchNumberid, rawData[arr].sourceAmount, userid
                ));
            }
            if (rawData[arr].destinationAmount !== 0) {
                preHppStock.push(
                    this.createRecord(
                        2, rawData[arr].productid, rawData[arr].batchNumberid, rawData[arr].destinationAmount, userid
                ));
            }
        }
        console.log('Submit meatriteToPreHPPStock', meatriteStock, preHppStock);
        this.hppTransferApiService.submitPnPStock(meatriteStock).pipe(
            concatMap(() => this.hppTransferApiService.hppUpdateStock(preHppStock))
        ).subscribe();
    }

    submitPostToDeliveredStock(rawData) {
        console.log(rawData);
        const postHppStock = [];
        const deliveredStock = [];
        const userid = JSON.parse(localStorage.getItem('userID'));
        for (let arr = 0; arr < rawData.length; arr++) {
            if (rawData[arr].sourceAmount !== 0) {
                postHppStock.push(
                    this.createRecord(
                        1, rawData[arr].productid, rawData[arr].batchNumberid, rawData[arr].sourceAmount, userid
                ));
            }
            if (rawData[arr].destinationAmount !== 0) {
                deliveredStock.push(
                    this.createRecord(
                        5, rawData[arr].productid, rawData[arr].batchNumberid, rawData[arr].destinationAmount, userid
                ));
            }
        }
        if (postHppStock.length > 0) {
            this.hppTransferApiService.hppUpdateStock(postHppStock).subscribe();
        } else {
            this.hppTransferApiService.hppDeleteStock(1).subscribe();
        }
        // if (deliveredStock.length > 0) {
        //     this.hppTransferApiService.hppUpdateStock(deliveredStock).subscribe();
        // } else {
        //     this.hppTransferApiService.hppDeleteStock('').subscribe();
        // }
    }

    createRecord(hppProductStatus, productid, batchNumberJunctionid, amount, userid) {
        return {
            amount: amount, batchNumberJunctionid: batchNumberJunctionid,
            productStatusid: hppProductStatus, productid: productid, userid: userid };
    }

    // deleteHppStockGroup(groupStatusNumber) {
    //     this.hppTransferApiService.hppDeleteStock(groupStatusNumber).subscribe();
    // }

}
