import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IStockTakeInstance } from '../../#shared-services/production-stock.interface';
import { StockCreateData$Service } from '../1#stock-create-services/stock-create-data$.service';

@Component({
    selector: 'stock-stock-take-create-view',
    templateUrl: './stock-take-create-view.component.html',
    styleUrls: ['./stock-take-create-view.component.scss']
})
export class StockTakeCreateViewComponent implements OnInit {

    @Input() stockTakeInstances: IStockTakeInstance[]
    showStockTakeForm: boolean

    constructor(
        private stockCreateData$Service: StockCreateData$Service,
        private router: Router
        ) { }

    ngOnInit(): void {
    }

    stockTakeSelected(stockTakeInstance: IStockTakeInstance) {
        this.stockCreateData$Service.setStockInstance(stockTakeInstance)
        this.router.navigate(['main/stock-take/entry/production-stock']);
    }

    showNewStockTakeForm() {
        this.showStockTakeForm = !this.showStockTakeForm
    }

    closeForm(value) {
        this.showNewStockTakeForm()
    }

}
