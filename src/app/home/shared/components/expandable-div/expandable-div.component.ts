import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-expandable-div',
    templateUrl: './expandable-div.component.html',
    styleUrls: ['./expandable-div.component.scss']
})
export class ExpandableDivComponent implements OnInit {

    @Input() heading: string;
    @Input() styleSheet: Object;
    @Input() className: string;
    @Output() dropDownTableState: EventEmitter<any> = new EventEmitter<any>();
    @Input() expandedIndex = false;

    constructor() {}

    ngOnInit() {}

    expandContract() {
        this.expandedIndex = !this.expandedIndex;
        this.dropDownTableState.emit(this.expandedIndex);
    }

    trackByamounts(index: number, values): number {
      return values.amount;
    }

    getStyleSheet(): Object {
        return this.styleSheet;
    }

    getClass(): string {
        return this.className;
    }

}
