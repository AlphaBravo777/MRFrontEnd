import { Component, OnInit } from '@angular/core';
import { IPackingListStock } from '../high-risk-services/high-risk-interfaces';
import { HighRiskDataService } from '../high-risk-services/high-risk-data.service';

@Component({
    selector: 'app-high-risk-data',
    templateUrl: './high-risk-data.component.html',
    styleUrls: ['./high-risk-data.component.css']
})
export class HighRiskDataComponent implements OnInit {

    loadingListStock: IPackingListStock[];
    data2;

    constructor(private highRiskDataService: HighRiskDataService) { }

    ngOnInit() {
        this.highRiskDataService.getGraphQLdata().subscribe(result => {
            this.loadingListStock = result;
            console.log(this.loadingListStock);
        });
        // this.highRiskDataService.groupProducts().subscribe(data => {
        // this.loadingListStock = data;
        // console.log('--- ', this.loadingListStock);
        // });
    }

}
