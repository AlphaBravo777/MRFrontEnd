import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormGroup } from '@ng-stack/forms';
import { IProductionStockByFactoryArea, IStockTake } from '../../#shared-services/production-stock.interface';

@Component({
    selector: 'stock-production-stock-view',
    templateUrl: './production-stock-view.component.html',
    styleUrls: ['./production-stock-view.component.scss'],
    // encapsulation: ViewEncapsulation.None,
})
export class ProductionStockViewComponent implements OnInit {

    @Input() mainStockForm: FormGroup<IStockTake>
    showCreateBatchWindow = false;
    batchWindowButtonText = 'Insert Batches'

    constructor(private router: Router) { }

    ngOnInit(): void {
        console.log('the data = ', this.mainStockForm)
        this.mainStockForm.get('containers').controls
    }

    createBatch() {
        this.showCreateBatchWindow = !this.showCreateBatchWindow;
        if (!this.showCreateBatchWindow) {
            this.batchWindowButtonText = 'Insert Batches'
        } else {
            this.batchWindowButtonText = 'Hide batch window'
        }
        // Here we want to subscribe and create a batch with the current dates data, if there is a batch return is id, if there is not a batch, create and return its id
    }

    returnToStockTakes() {
        this.router.navigate(['main/stock-take/entry/create-stock-take']);
    }   

    reloadContainers() {
        localStorage.removeItem('stockTakeContainers')
        // this.ngOnInit()
        this.router.navigate(['main/stock-take/entry/create-stock-take'])
    }

}
