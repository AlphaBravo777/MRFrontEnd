import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { IBatchAmounts, IDispatchStockSideBySide } from '../../$dispatch-services/dispatch-interface';
import { LoadTrucksInfoService } from '../1#load-trucks-services/load-trucks-info.service';

@Component({
    selector: 'app-load-widget',
    templateUrl: './load-widget.component.html',
    styleUrls: ['./load-widget.component.scss']
})
export class LoadWidgetComponent implements OnInit, OnChanges {

    @Input() stock: IDispatchStockSideBySide;
    amountNeeded: number;
    @Input() batches: IBatchAmounts[];

    constructor(private loadTrucksInfoService: LoadTrucksInfoService) { }

    ngOnInit() {
        this.amountNeeded = this.stock.stockRequired.amount;
    }

    load(amount: number, index: number) {
        console.log('The order product that increased = ', amount, ' of ', this.stock.stockRequired);
        console.log('The MR stock that decreased = ', amount, ' of ', this.stock.stockOnHand,
            ' batch ', this.stock.stockOnHand.batchAmounts[index].batchNumber);
        this.loadTrucksInfoService.setOrderProduct(amount);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('There were changes');
        if (changes.stock) {

        }
    }

    // make truck amount go down to zero to show what is need. When just start and needing 35, the let amount show -35, to show that you
    // need to plus to get it to zero. When you have 2 too many, then show +2 to show that you have to minus to be equal.
    // In the end the middle numbers must all be zero.
    // The number isn the begging must show how many is loaded, of the total. 0/35 or 12/35 or 35/35

}
