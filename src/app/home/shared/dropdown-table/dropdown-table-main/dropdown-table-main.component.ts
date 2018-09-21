import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-dropdown-table-main',
    templateUrl: './dropdown-table-main.component.html',
    styleUrls: ['./dropdown-table-main.component.scss']
})
export class DropdownTableMainComponent implements OnInit {

    // @Input() topLevelData;
    @Input() indvTopDataPoints;
    @Input() heading: string;
    @Input() expandedIndex = -1;
    text = 'Expand';

    constructor() { }

    ngOnInit() {
    }

    collaps(index: number) {
        this.expandedIndex = index === this.expandedIndex ? -1 : index;
    // collaps() {
    //     this.expandedIndex = !this.expandedIndex;
    }

    trackByamounts(index: number, values): number {
      return values.amount;
  }
    // expandAllTables() {
    //     this.expandedIndex = !this.expandedIndex;
    //     if (this.text === 'Expand') {
    //         this.text = 'Contract';
    //     } else {
    //         this.text = 'Expand';
    //     }
    // }

    // trackByamounts(index: number, stock ): string {
    //     return stock.key;
    // }

}
