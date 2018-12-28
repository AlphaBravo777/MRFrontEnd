import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPackingListStock } from '../high-risk-services/high-risk-interfaces';
import { HighRiskData$Service } from '../high-risk-services/high-risk-data.service';
import { interval } from 'rxjs';

@Component({
    selector: 'app-high-risk-data',
    templateUrl: './high-risk-data.component.html',
    styleUrls: ['./high-risk-data.component.css']
})
export class HighRiskDataComponent implements OnInit, OnDestroy {

    loadingListStock: IPackingListStock[];
    subscription;
    data2;


    constructor(private highRiskDataService: HighRiskData$Service) { }

    ngOnInit() {

        this.highRiskDataService.currentProcessedStock$.subscribe(data => {
            this.loadingListStock = data;
        });
        this.subscription = interval(3000).subscribe(x => {
            console.log('highRiskDataService reloaded');
            this.highRiskDataService.getDBProcessedStock();
        });

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
    // TODO: Show which products can be packed on what machine, and give option to just show machines and what can be packed
