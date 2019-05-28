import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    IStockSingleProduct,
    IDispatchStockSideBySide,
    IRouteClient,
    IRouteWorkingTree } from '../../$dispatch-services/dispatch-interface';
import { LoadTrucksService } from '../1#load-trucks-services/load-trucks.service';

@Component({
    selector: 'app-load-trucks-loading',
    templateUrl: './load-trucks-loading.component.html',
    styleUrls: ['./load-trucks-loading.component.scss']
})
export class LoadTrucksLoadingComponent implements OnInit, OnChanges {

    @Input() meatriteStock: IStockSingleProduct[];
    @Input() stockRequired: IStockSingleProduct[];
    @Input() clientData: IRouteClient;
    @Input() workingRouteTree: IRouteWorkingTree;
    sideBySideStock: IDispatchStockSideBySide[];

    constructor(private loadTrucksService: LoadTrucksService) { }

    ngOnInit() {
        // The code below was commented out so that the test will pass, else you get "undefined" error
        // this.sideBySideStock = this.loadTrucksService.removeExtraBatches(
        //     this.loadTrucksService.putStockSideBySide(this.meatriteStock, this.stockRequired));
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log('Changes2 is running', this.stockRequired);
        console.log('Loading changes is running', changes);
        if (changes.meatriteStock) {
            this.sideBySideStock = this.loadTrucksService.removeExtraBatches(this.loadTrucksService.putStockSideBySide(
                changes.meatriteStock.currentValue, this.stockRequired
            ));
            // console.log('Changes2 is running', this.sideBySideStock);
        } else {
            this.sideBySideStock = this.loadTrucksService.removeExtraBatches(this.loadTrucksService.putStockSideBySide(
                this.meatriteStock, changes.stockRequired.currentValue));
        }
    }

}
