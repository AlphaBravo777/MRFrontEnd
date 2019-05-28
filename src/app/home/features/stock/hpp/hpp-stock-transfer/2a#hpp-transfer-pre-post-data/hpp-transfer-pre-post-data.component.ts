import { Component, OnInit, OnDestroy } from '@angular/core';
import { HppService } from '../../$hpp-services/hpp.service';
import { tap, concatMap } from 'rxjs/operators';
import { HppTransferService } from '../1#hpp-transfer-services/hpp-transfer.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
    selector: 'app-hpp-transfer-pre-post-data',
    templateUrl: './hpp-transfer-pre-post-data.component.html',
    styleUrls: ['./hpp-transfer-pre-post-data.component.scss']
})
export class HppTransferPrePostDataComponent implements OnInit, OnDestroy {

    headingNames = {left: 'Pre-HPP', right: 'Post-HPP'};
    productArray;
    source;
    destination;
    subscription: Subscription;

    constructor( private hppTransferService: HppTransferService) {}

    ngOnInit() {
        this.getData();
    }

    getData() {
        const getPreData$ = this.hppTransferService.currentPreHppData$;
        const getPostData$ = this.hppTransferService.currentPostHppData$;
        this.subscription = combineLatest([getPreData$, getPostData$]).pipe(
            tap (data => {
                if (data[0] && data[1]) {
                    return this.productArray = this.hppTransferService.flattenTransferBatches(data[0], data[1]);
                }
            }),
            // tap(data => this.productArray = this.hppTransferService.flattenTransferBatches(data[0], data[1])),
            // Better way to do this at leaker component
            tap(data => {
                this.source = data[0];
                this.destination = data[1];
            })
        ).subscribe();
    }

    deleteOldStock() {
        localStorage.removeItem('hppPostHppData');
        localStorage.removeItem('hppPreHppData');
        this.hppTransferService.getInitialData();
    }

    changeAmount(changeData) {
        this.reCalculateStock();
        this.hppTransferService.changeCurrentStock(this.source, this.destination, changeData);
        this.reCalculateStock();
    }

    reCalculateStock() {
        this.productArray = this.hppTransferService.flattenTransferBatches(this.source, this.destination);
        const arr = this.hppTransferService.cheaplyCreateNewArray(this.productArray);
        console.log('Hippo - ', arr);
        this.hppTransferService.changePreHppStock(arr[0]);
        this.hppTransferService.changePostHppStock(arr[1]);
    }

    // changeAmount(changeData) {
    //     // It does not work the first click
    //     this.hppTransferService.changeCurrentStock(this.source, this.destination, changeData);
    //     this.productArray = this.hppTransferService.flattenTransferBatches(this.source, this.destination);
    //     const arr = this.hppTransferService.cheaplyCreateNewArray(this.productArray);
    //     this.hppTransferService.changePreHppStock(arr[0]);
    //     this.hppTransferService.changePostHppStock(arr[1]);
    // }

    submitForm() {
        this.hppTransferService.submitPreToPostStock(this.productArray);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
