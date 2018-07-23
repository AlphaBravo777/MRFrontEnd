import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-ind-stock-table',
    templateUrl: './ind-stock-table.component.html',
    styleUrls: ['./ind-stock-table.component.css']
})
export class IndStockTableComponent implements OnInit {

    constructor() { }

    @Input() processedGroup;
    @Input() batch;
    @Output() changeProductName: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
    }

    public changeProduct(name: any): void { // Clears the window
        this.changeProductName.emit(name);
    }

}
