import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-dropdown-table-main',
    templateUrl: './dropdown-table-main.component.html',
    styleUrls: ['./dropdown-table-main.component.scss']
})
export class DropdownTableMainComponent implements OnInit {

    // @Input() topLevelData;
    @Input() indvTopDataPoints;
    @Output() dropDownTableState: EventEmitter<any> = new EventEmitter<any>();
    @Input() expandedIndex = false;

    constructor() { }

    ngOnInit() {
    }

    expandContract() {
        this.expandedIndex = !this.expandedIndex;
        this.dropDownTableState.emit(this.expandedIndex);
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
