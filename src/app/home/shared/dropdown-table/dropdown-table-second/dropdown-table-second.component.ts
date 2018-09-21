import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-table-second',
  templateUrl: './dropdown-table-second.component.html',
  styleUrls: ['./dropdown-table-second.component.scss']
})
export class DropdownTableSecondComponent implements OnInit {

    @Input() indvTopDataPoints;
    @Input() expandedIndex;
    @Input() headings = ['Name', 'Model Stock', 'Days', 'Supplier', 'Amt'];
    @Input() dataPoints = ['stockName', 'supplier', 'baseUnitSize', 'measureUnit'];
    gridColmSizes = 'grid4';

    constructor() { }

    ngOnInit() {
    }

    collaps() {
        this.expandedIndex = !this.expandedIndex;
    }

    trackByamounts(index: number, values): number {
      return values.amount;
  }

}
