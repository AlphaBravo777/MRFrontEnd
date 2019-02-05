import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IStockSingleProduct, IDispatchStockSideBySide } from '../../$dispatch-services/dispatch-interface';
import { LoadTrucksService } from '../1#load-trucks-services/load-trucks.service';

@Component({
    selector: 'app-load-trucks-compare',
    templateUrl: './load-trucks-compare.component.html',
    styleUrls: ['./load-trucks-compare.component.scss']
})
export class LoadTrucksCompareComponent implements OnInit, OnChanges {

    @Input() stockOnHand: IStockSingleProduct[];
    @Input() stockRequired: IStockSingleProduct[];
    sideBySideStock: IDispatchStockSideBySide[];

    constructor(private loadTrucksService: LoadTrucksService) { }

    ngOnInit() {
        this.sideBySideStock = this.loadTrucksService.putStockSideBySide(this.stockOnHand, this.stockRequired);
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log('Changes is running', changes);
        if (changes.stockOnHand) {
            this.sideBySideStock = this.loadTrucksService.putStockSideBySide(
                changes.stockOnHand.currentValue, changes.stockRequired.currentValue
            );
        } else {
            this.sideBySideStock = this.loadTrucksService.putStockSideBySide(
                this.stockOnHand, changes.stockRequired.currentValue);
        }
    }

}
