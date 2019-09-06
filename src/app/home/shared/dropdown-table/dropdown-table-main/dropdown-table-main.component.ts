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

}
