import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-processed-menu',
    templateUrl: './processed-menu.component.html',
    styleUrls: ['./processed-menu.component.css']
})
export class ProcessedMenuComponent implements OnInit {

    constructor() { }

    @Input() processedStockMain;
    @Output() timeToSave: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
    }

    public sendTime(time: any): void {
        this.timeToSave.emit(time);
    }


}
