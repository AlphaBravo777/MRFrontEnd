import { Component, OnInit, OnDestroy } from '@angular/core';
import { HppSummaryService } from '../1#hpp-summary-services/hpp-summary.service';
import { Subscription, Observable } from 'rxjs';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { tap } from 'rxjs/operators';
import { map } from 'async';

@Component({
    selector: 'app-hpp-summary-data',
    templateUrl: './hpp-summary-data.component.html',
    styleUrls: ['./hpp-summary-data.component.scss']
})
export class HppSummaryDataComponent implements OnInit, OnDestroy {

    // For meatrite stock, have a column where you pick the batchNumber, and a button that says add batch to create another colm
    // Then just have input boxes where you enter the product under the batch number, and tab to the next batch for the same product
    // Carry on to the end and then press enter to enter all the products with batch numbers.
    // You will need productid, productMRid, batchNumber, amount, stockTakeTime, userid

    pnpProducts;
    meatriteStock;
    preHppStock;
    postHppStock;
    pnpOrder;
    pnpOutstandingOrders;
    hppLeakers;
    outstandingStock;
    amountOfOrders;
    subscription: Subscription;
    subscription2: Subscription;

    constructor(private hppSummaryService: HppSummaryService, private getDate: GetDate$Service) {}

    ngOnInit() {
        this.getWorkingDate();
    }

    getWorkingDate() {
        this.subscription2 = this.getDate.currentDatePackage$.pipe(
            tap(data => {
                if (data.id) {
                    this.getHppData(data);
                }
            })
        ).subscribe();
    }

    getHppData(datePackage: IDate) {
        this.subscription = this.hppSummaryService.getHppStartingData(datePackage).pipe(
        ).subscribe(data => {
            console.log('Alfa ', data);
            this.pnpProducts = data[0];
            this.meatriteStock = data[1];
            this.preHppStock = data[2];
            this.pnpOrder = data[3];
            this.pnpOutstandingOrders = data[4].data;
            this.amountOfOrders = data[4].amountOfOrders;
            this.postHppStock = data[5];
            this.hppLeakers = data[6];
            this.outstandingStock = this.getOutstandingStock();
        });
    }

    // 0 pnpProducts
    // 1 meatriteProducts
    // 2 preHppProducts
    // 3 pnpOrders
    // 4 oustandingPnPOrders + number
    // 5 postHppProducts
    // 6 hppLeakers

    getOutstandingStock() {
        return this.hppSummaryService.calculateStockTable(
            this.pnpProducts,
            this.meatriteStock,
            this.preHppStock,
            this.pnpOrder,
            this.postHppStock,
            this.hppLeakers,
            this.amountOfOrders,
            this.pnpOutstandingOrders
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
        }
    }
}
