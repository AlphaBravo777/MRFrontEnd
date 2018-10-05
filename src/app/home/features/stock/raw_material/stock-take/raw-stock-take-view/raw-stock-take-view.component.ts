import { Component, OnInit, Input } from '@angular/core';
import { IRawMaterialGroup } from '../../raw-material-services/RawMaterial';


@Component({
    selector: 'app-raw-stock-take-view',
    templateUrl: './raw-stock-take-view.component.html',
    styleUrls: ['./raw-stock-take-view.component.scss']
})
export class RawStockTakeViewComponent implements OnInit {

    @Input() topLevelData: IRawMaterialGroup[];
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
    }

    collapsInput(index: number) {
        this.expandedInput = index === this.expandedInput ? -1 : index;
        // this.expandedIndexArrow[index] = !this.expandedIndexArrow[index];
    }

    trackByamounts(index: number, stock ): string {
        return stock.key;
    }

}
