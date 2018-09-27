import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-table-second',
  templateUrl: './dropdown-table-second.component.html',
  styleUrls: ['./dropdown-table-second.component.scss']
})
export class DropdownTableSecondComponent implements OnInit {

    @Input() individualStockData;
    @Input() dataPoints;
    @Input() gridColmSizes;

    constructor() { }

    ngOnInit() {
    }

    trackByamounts(index: number, values): number {
      return values.amount;
  }

}
