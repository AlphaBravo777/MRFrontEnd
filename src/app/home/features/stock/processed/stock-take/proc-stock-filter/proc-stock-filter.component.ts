import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-proc-stock-filter',
    templateUrl: './proc-stock-filter.component.html',
    styleUrls: ['./proc-stock-filter.component.scss']
})
export class ProcStockFilterComponent implements OnInit {


    @Input() filters;
    @Output() filterPicked: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    public pickDate(filter): void {
        // console.log(filter);
        this.filterPicked.emit(filter);
    }

}
