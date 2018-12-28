import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { StockAPIService } from '../../stock-services/stock-api.service';

@Component({
    selector: 'app-processed-menu',
    templateUrl: './processed-menu.component.html',
    styleUrls: ['./processed-menu.component.css']
})
export class ProcessedMenuComponent implements OnInit {

    constructor(private stockApiService: StockAPIService) { }

    @Input() processedStockMain;
    @Output() timeToSave: EventEmitter<any> = new EventEmitter<any>();
    stockTimes: string;

    ngOnInit() {
        this.stockApiService.getStockTimes().subscribe(times => {
            this.stockTimes = times;
        });
    }

    public sendTime(time: any): void {
        this.timeToSave.emit(time);
    }


}
