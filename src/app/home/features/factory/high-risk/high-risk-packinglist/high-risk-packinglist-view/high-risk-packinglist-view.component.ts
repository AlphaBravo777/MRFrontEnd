import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-high-risk-packinglist-view',
    templateUrl: './high-risk-packinglist-view.component.html',
    styleUrls: ['./high-risk-packinglist-view.component.css']
})
export class HighRiskPackinglistViewComponent implements OnInit {

    @Input() topLevelData;
    @Input() viewHeading: string;
    @Input() headings;
    @Input() dataPoints;
    @Input() gridColmSizes;
    expandedIndex = -1;
    expandedInput = -1;
    buttonText = 'Expand';
    expandedIndexArrow = [];

    constructor() { }

    ngOnInit() {
    }

    collaps(index: number) {
        this.expandedIndex = index === this.expandedIndex ? -1 : index;
        this.expandedIndexArrow[index] = !this.expandedIndexArrow[index];
        console.log(this.expandedIndex, index);
    }

    trackByamounts(index: number, stock ): string {
        return stock.key;
    }

    collapsInput(index: number) {
        this.expandedInput = index === this.expandedInput ? -1 : index;
    }

}
