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

    public changeProduct(name: any, desc: string): void { // Clears the window
        const prod = {name: name, description: desc};
        this.changeProductName.emit(prod);
    }

}
