import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { HppTransferService } from '../1#hpp-transfer-services/hpp-transfer.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-hpp-transfer-post-leaker-data',
  templateUrl: './hpp-transfer-post-leaker-data.component.html',
  styleUrls: ['./hpp-transfer-post-leaker-data.component.scss']
})
export class HppTransferPostLeakerDataComponent implements OnInit, OnDestroy {

    headingNames = {left: 'Post-HPP', right: 'Leakers'};
    productArray;
    source;
    destination;
    subscription: Subscription;

    constructor( private hppTransferService: HppTransferService) {}

    ngOnInit() {
        this.getData();
    }


    // If there is a leaker data, then the leakers work, if there are no leaker data, then leakers do not work.
    getData() {
        const getLeakerData$ = this.hppTransferService.currentLeakerData$;
        const getPostData$ = this.hppTransferService.currentPostHppData$;
        this.subscription = combineLatest([getPostData$, getLeakerData$]).pipe(
            tap (data => {
                if (data[0] && data[1]) {
                    return this.productArray = this.hppTransferService.flattenTransferBatches(data[0], data[1]);
                }
            }),
            tap(data => {
                this.source = data[0];
                this.destination = data[1];
            }),
        ).subscribe();
    }

    deleteOldStock() {
        localStorage.removeItem('hppPostHppData');
        localStorage.removeItem('hppLeakerHppData');
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
        this.hppTransferService.changePostHppStock(arr[0]);
        this.hppTransferService.changeLeakerHppStock(arr[1]);
    }

    submitForm() {
        this.hppTransferService.submitPostToLeakerStock(this.productArray);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}

