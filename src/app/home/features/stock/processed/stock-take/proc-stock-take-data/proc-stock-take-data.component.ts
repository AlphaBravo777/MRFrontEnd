import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProcStockData$Service } from '../proc-stock-services/proc-stock-data$.service';
import { IProcessedStockGroup } from '../proc-stock-services/processed-stock';
import { Subscription } from 'rxjs';
import { ProcStockService } from '../proc-stock-services/proc-stock.service'    ;

@Component({
    selector: 'app-proc-stock-take-data',
    templateUrl: './proc-stock-take-data.component.html',
    styleUrls: ['./proc-stock-take-data.component.scss']
})
export class ProcStockTakeDataComponent implements OnInit, OnDestroy {

    productGroups: IProcessedStockGroup[];
    subscription: Subscription;
    current;

    constructor(private procStockData$Service: ProcStockData$Service, private procStockService: ProcStockService) { }

    ngOnInit() {
        this.subscribeToContainers();
    }

    subscribeToContainers() {
        this.procStockData$Service.currentprocessedStockWithAmounts$.subscribe(data => {
            // console.log('Alfa1 = ', data);
            this.productGroups = this.procStockService.addFactoryGroupAndFilters(data);
            // console.log('Alfa2 = ', this.productGroups);
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
        this.subscription.unsubscribe();
        }
    }


}
