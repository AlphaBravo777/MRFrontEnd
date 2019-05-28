import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { HppTransferService } from '../1#hpp-transfer-services/hpp-transfer.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-hpp-transfer-post-delivered',
  templateUrl: './hpp-transfer-post-delivered.component.html',
  styleUrls: ['./hpp-transfer-post-delivered.component.scss']
})
export class HppTransferPostDeliveredComponent implements OnInit, OnDestroy {

    headingNames = {left: 'Post-Hpp', right: 'Delivered to PnP'};
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
        // const getMeatriteStockData$ = this.hppTransferService.currentMeatriteStock$;
        const getPostData$ = this.hppTransferService.currentPostHppData$;
        // const getPreData$ = this.hppTransferService.currentPreHppData$;
        this.subscription = combineLatest([getPostData$]).pipe(
            tap(data => {
                if (data[0]) {
                    return this.productArray = this.hppTransferService.flattenTransferBatches(data[0], []);
                }
            }),
            tap(data => {
                this.source = data[0];
                this.destination = [];
            }),
        ).subscribe();
    }

    deleteOldStock() {
        // localStorage.removeItem('hppPostHppData');
        // localStorage.removeItem('hppLeakerHppData');
        // this.hppTransferService.getInitialData();
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
        this.hppTransferService.changePostHppStock(arr[0]);   // change this!!
    }

    submitForm() {
        this.hppTransferService.submitPostToDeliveredStock(this.productArray);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
