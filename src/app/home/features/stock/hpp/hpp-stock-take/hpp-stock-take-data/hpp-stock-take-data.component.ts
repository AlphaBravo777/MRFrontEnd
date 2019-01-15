import { Component, OnInit, OnDestroy } from '@angular/core';
import { HppStockTakeService } from '../hpp-stock-take-services/hpp-stock-take.service';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IHppStockDataMain } from '../hpp-stock-take-services/hpp-stock-interface';

@Component({
    selector: 'app-hpp-stock-take-data',
    templateUrl: './hpp-stock-take-data.component.html',
    styleUrls: ['./hpp-stock-take-data.component.scss']
})
export class HppStockTakeDataComponent implements OnInit, OnDestroy {

    hppStockDataMain: IHppStockDataMain = {};
    subscription: Subscription;

    constructor(private hppStockTakeService: HppStockTakeService) { }

    // tslint:disable
    // Get orders that needs to be fabricated
    // Read that stock into the working sheet, it will be under the day that it arrives at the dc (maybe two days into the future)
    // The working sheet will now show stock on hand which will be zero, what we are sending, which is zero for now
    // Then what we need will basically be the whole order showing up as minuses in the "stock left over column"
    // Then on the day that the truck is leaving we enter the product that it is leaving with. Now the "stock left over" column will all be positive
    // Then when you go to the next day, the order will already have been entered, the 'stock left over' would be carried over to the beginning 
    // This will now show you how much stock you will need to send to make up the difference. Then the same process starts all over again



    ngOnInit() {
        this.getDailyHppStockData();
    }

    getDailyHppStockData() {
        this.subscription = this.hppStockTakeService.getHppOrders().pipe(
            tap(data => this.hppStockDataMain = data),
        ).subscribe(() => console.log('Total hpp data', this.hppStockDataMain));
    }

    // getDailyHppStockData() {
    //     this.subscription = this.hppStockTakeService.currentTestDate$.pipe(
    //         switchMap(date => this.hppStockTakeService.getHppOrders(date)),
    //         tap(data => this.hppStockDataMain.pnpOrder = data),
    //     ).subscribe(() => console.log(this.hppStockDataMain));
    // }

    changeDate(newDate: number) {
        this.hppStockTakeService.changeTestDate(newDate);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


}
