import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, combineLatest } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { HppService } from '../../$hpp-services/hpp.service';

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

    constructor(private hppService: HppService) {
        this.getInitialData();
    }

    getInitialData() {
            let data = JSON.parse(localStorage.getItem('hppPostHppData'));
            if (data) {
                this.postHppData.next(data);
            } else {
                this.hppService.getPostHppStock().pipe(
                    take(1),
                    tap(data2 => this.postHppData.next(data2)),
                    tap(data2 => localStorage.setItem('hppPostHppData',  JSON.stringify(data2)))
                ).subscribe();
            }
            data = JSON.parse(localStorage.getItem('hppPreHppData'));
            if (data) {
                this.preHppData.next(data);
            } else {
                this.hppService.getPreHppStock().pipe(
                    take(1),
                    tap(data2 => this.preHppData.next(data2)),
                    tap(data2 => localStorage.setItem('hppPreHppData',  JSON.stringify(data2)))
                ).subscribe();
            }
            data = JSON.parse(localStorage.getItem('hppLeakerHppData'));
            if (data) {
                this.leakerData.next(data);
            } else {
                this.hppService.getLeakersStock().pipe(
                    take(1),
                    tap(data2 => this.leakerData.next(data2)),
                    tap(data2 => localStorage.setItem('hppLeakerHppData',  JSON.stringify(data2)))
                ).subscribe();
            }
        }

    flattenTransferBatches(source, destination) {
        const final = [];
        for (let src = 0; src < source.length; src++) {
            for (let batch = 0; batch < source[src].batches.length; batch++) {
                final.push({productName: source[src].productName, productid: source[src].productid,
                    batchNumber: source[src].batches[batch].batchNumber, sourceAmount: source[src].batches[batch].amount,
                    destinationAmount: 0});
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
                        destinationAmount: destination[dest].batches[batch].amount});
                }
            }
        }
        console.log('The final form = ', final);
        return final;
    }

    changeCurrentStock(source, destination, changeData) {
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
    }

}
