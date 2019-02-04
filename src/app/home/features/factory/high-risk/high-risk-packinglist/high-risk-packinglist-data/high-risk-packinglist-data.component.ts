import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { IPackingListStock } from '../../high-risk-services/high-risk-interfaces';
import { HighRiskData$Service } from '../../high-risk-services/high-risk-data.service';

@Component({
  selector: 'app-high-risk-packinglist-data',
  templateUrl: './high-risk-packinglist-data.component.html',
  styleUrls: ['./high-risk-packinglist-data.component.css']
})
export class HighRiskPackinglistDataComponent implements OnInit, OnDestroy {

    loadingListStock: IPackingListStock[];
    subscription: Subscription;
    viewHeading = 'High-Risk Packinglist';
    headings = ['Product Name', 'Description', 'Current Stock', 'Total Needed', 'Difference'];
    dataPoints = ['stockName', 'supplier', 'baseUnitSize', 'measureUnit'];
    gridColmSizes = 'grid5';


    constructor(private highRiskDataService: HighRiskData$Service) { }

    ngOnInit() {

        this.highRiskDataService.currentProcessedStock$.subscribe(data => {
            this.loadingListStock = data;
        });
        this.subscription = interval(300000).subscribe(x => {
            console.log('highRiskDataService reloaded');
            this.highRiskDataService.getDBProcessedStock();
        });

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
