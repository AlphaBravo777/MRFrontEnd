import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { HppTransferService } from '../1#hpp-transfer-services/hpp-transfer.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-hpp-transfer-mr-pre-data',
  templateUrl: './hpp-transfer-mr-pre-data.component.html',
  styleUrls: ['./hpp-transfer-mr-pre-data.component.scss']
})
export class HppTransferMrPreDataComponent implements OnInit, OnDestroy {


    headingNames = {left: 'MeatriteStock', right: 'Pre-HPP'};
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
        const getMeatriteStockData$ = this.hppTransferService.currentMeatriteStock$;
        const getPreData$ = this.hppTransferService.currentPreHppData$;
        this.subscription = combineLatest([getMeatriteStockData$, getPreData$]).pipe(
            tap(data => {
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
        this.hppTransferService.changeMeatriteStock(arr[0]);   // change this!!
        this.hppTransferService.changePreHppStock(arr[1]);  // change this !!
    }

    submitForm() {
        this.hppTransferService.submitMeatriteToPreHppStock(this.productArray);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
