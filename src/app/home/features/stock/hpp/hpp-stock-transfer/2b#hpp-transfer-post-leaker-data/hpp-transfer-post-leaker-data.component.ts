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

    productArray;
    source;
    destination;
    subscription: Subscription;

    constructor( private hppTransferService: HppTransferService) {}

    ngOnInit() {
        this.getData();
        setTimeout(() => console.log(this.productArray), 2000);
    }

    getData() {
        const getLeakerData$ = this.hppTransferService.currentLeakerData$;
        const getPostData$ = this.hppTransferService.currentPostHppData$;
        this.subscription = combineLatest([getPostData$, getLeakerData$]).pipe(
            tap(data => this.productArray = this.hppTransferService.flattenTransferBatches(data[0], data[1])),
            tap(data => {
                this.source = data[0];
                this.destination = data[1];
            })
        ).subscribe();
    }

    deleteOldStock() {
        localStorage.removeItem('hppPostHppData');
        localStorage.removeItem('hppLeakerHppData');
        this.hppTransferService.getInitialData();
    }

    changeAmount(changeData) {
        console.log('The change amount = ', changeData);
        this.hppTransferService.changeCurrentStock(this.source, this.destination, changeData);
        this.productArray = this.hppTransferService.flattenTransferBatches(this.source, this.destination);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}

