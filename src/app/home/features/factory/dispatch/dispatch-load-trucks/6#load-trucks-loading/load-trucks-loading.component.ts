import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IStockSingleProduct, IDispatchStockSideBySide } from '../../$dispatch-services/dispatch-interface';
import { LoadTrucksService } from '../1#load-trucks-services/load-trucks.service';

@Component({
    selector: 'app-load-trucks-loading',
    templateUrl: './load-trucks-loading.component.html',
    styleUrls: ['./load-trucks-loading.component.scss']
})
export class LoadTrucksLoadingComponent implements OnInit, OnChanges {

    @Input() stockOnHand: IStockSingleProduct[];
    @Input() stockRequired: IStockSingleProduct[];
    sideBySideStock: IDispatchStockSideBySide[];

    constructor(private loadTrucksService: LoadTrucksService) { }

    ngOnInit() {
        this.sideBySideStock = this.removeExtraBatches(this.loadTrucksService.putStockSideBySide(this.stockOnHand, this.stockRequired));
    }

    removeExtraBatches(sideBySideStock: IDispatchStockSideBySide[]): IDispatchStockSideBySide[] {
        const newSideBySideStock: IDispatchStockSideBySide[] = JSON.parse(JSON.stringify(sideBySideStock));
        newSideBySideStock.map(product => {
            let currentAmount = 0;
            const newStockOnHand = product.stockOnHand;
            for (let index = 0; index < product.stockOnHand.batchAmounts.length; index++) {
                currentAmount = currentAmount + product.stockOnHand.batchAmounts[index].amount;
                if (currentAmount >= product.stockRequired.amount) {
                    newStockOnHand.batchAmounts.length = index + 1;
                }
            }
        });
        return newSideBySideStock;
    }

    load(amount, index) {
        console.log('Something was loaded', amount, index);
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log('Changes is running', changes);
        if (changes.stockOnHand) {
            this.sideBySideStock = this.removeExtraBatches(this.loadTrucksService.putStockSideBySide(
                changes.stockOnHand.currentValue, changes.stockRequired.currentValue
            ));
        } else {
            this.sideBySideStock = this.removeExtraBatches(this.loadTrucksService.putStockSideBySide(
                this.stockOnHand, changes.stockRequired.currentValue));
        }
    }

}
