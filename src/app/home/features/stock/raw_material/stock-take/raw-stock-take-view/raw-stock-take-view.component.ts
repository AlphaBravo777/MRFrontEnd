import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-raw-stock-take-view',
    templateUrl: './raw-stock-take-view.component.html',
    styleUrls: ['./raw-stock-take-view.component.scss']
})
export class RawStockTakeViewComponent implements OnInit {

    @Input() topLevelData;
    @Input() viewHeading: string;
    expandedIndex = -1;
    text = 'Expand';
    expandedIndexArrow = [];
    @Input() headings = ['Name', 'Model Stock', 'Days', 'Supplier', 'Amt'];
    @Input() dataPoints = ['stockName', 'supplier', 'baseUnitSize', 'measureUnit'];

    constructor() { }

    ngOnInit() {
    }

    collaps(index: number) {
        this.expandedIndex = index === this.expandedIndex ? -1 : index;
        this.expandedIndexArrow[index] = !this.expandedIndexArrow[index];
    }

    expandAllTables() {
        // this.expandedIndex = !this.expandedIndex;
        // if (this.text === 'Expand') {
        //     this.text = 'Contract';
        // } else {
        //     this.text = 'Expand';
        // }
    }

    trackByamounts(index: number, stock ): string {
        return stock.key;
    }

}
