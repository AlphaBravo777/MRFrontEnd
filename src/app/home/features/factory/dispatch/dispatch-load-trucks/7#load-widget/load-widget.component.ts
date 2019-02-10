import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IDispatchStockSideBySide, IStockSingleProduct, IRouteWorkingTree } from '../../$dispatch-services/dispatch-interface';
import { LoadTrucksInfoService } from '../1#load-trucks-services/load-trucks-info.service';
import { LoadTrucksService } from '../1#load-trucks-services/load-trucks.service';

@Component({
    selector: 'app-load-widget',
    templateUrl: './load-widget.component.html',
    styleUrls: ['./load-widget.component.scss']
})
export class LoadWidgetComponent implements OnInit, OnChanges {

    @Input() stock: IDispatchStockSideBySide;
    @Input() productNumber: number;
    @Input() workingRouteTree: IRouteWorkingTree;
    amountNeeded: number;
    // @Input() batches: IBatchAmounts[];
    differ: any;

    constructor(
        private loadTrucksInfoService: LoadTrucksInfoService,
        private loadTrucksService: LoadTrucksService) {}

    ngOnInit() {
        this.amountNeeded = this.stock.stockRequired.amount;
    }

    load(amount: number, index: number) {
        this.workingRouteTree.productNumber = this.productNumber;
        console.log('8 8 8 8 8 8 ', this.workingRouteTree);
        const changeMRStockWithBatch: IStockSingleProduct = this.stock.stockOnHand;
        changeMRStockWithBatch.batchAmounts = changeMRStockWithBatch.batchAmounts.filter(
            batch => batch.batchNumber === this.stock.stockOnHand.batchAmounts[index].batchNumber);
        // console.log('The order product that increased = ', amount, ' of ', this.stock.stockRequired);
        // console.log('The MR stock that decreased = ', changeMRStockWithBatch, ' of ', this.stock.stockOnHand,
        //     ' batch ', this.stock.stockOnHand.batchAmounts[index].batchNumber);
        this.loadTrucksInfoService.setOrderProduct(this.stock.stockRequired, amount);
        this.loadTrucksService.changeMeatriteStock(changeMRStockWithBatch, amount);
        this.loadTrucksService.changeRouteOrderStockRequired(this.workingRouteTree, amount);
    }

    ngOnChanges(changes: SimpleChanges): void {

        // if (changes.batches) {
        //     console.log('There were changes');
        // }
    }

    // make truck amount go down to zero to show what is need. When just start and needing 35, the let amount show -35, to show that you
    // need to plus to get it to zero. When you have 2 too many, then show +2 to show that you have to minus to be equal.
    // In the end the middle numbers must all be zero.
    // The number isn the begging must show how many is loaded, of the total. 0/35 or 12/35 or 35/35

}
