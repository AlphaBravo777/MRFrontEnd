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

    productArray;
    source;
    destination;
    subscription: Subscription;

    constructor( private hppTransferService: HppTransferService) {}

    ngOnInit() {
        this.getData();
        // setTimeout(() => console.log(this.productArray), 2000);
    }

    getData() {
        const getPreData$ = this.hppTransferService.currentPreHppData$;
        const getPostData$ = this.hppTransferService.currentPostHppData$;
        this.subscription = combineLatest([getPreData$, getPostData$]).pipe(
            tap(data => this.productArray = this.hppTransferService.flattenTransferBatches(data[0], data[1])),
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
