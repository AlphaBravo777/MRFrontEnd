import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormGroup } from '@ng-stack/forms';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { SnackBarAlertService } from 'src/app/home/core/alerts/snack-bar-alert-service/snack-bar-alert.service';
import { IProductionStockByFactoryArea, IStockTake } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../1#product-stock-services/production-stock.service';

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

    constructor(
        private router: Router,
        private productionStockService: ProductionStockService,
        private snackBarAlertService: SnackBarAlertService
    ) { }

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

    onSubmit() {
        this.productionStockService.submitStockTakeAPI(this.mainStockForm).pipe(
            take(1),
            tap(result => console.log('The stock result = ', result)),
            tap(result => this.router.navigate(['main/stock-take/entry/create-stock-take'])),
            catchError(error => {
                this.snackBarAlertService.alert(Object.keys(error.error)[0] + ': ' + error.error[Object.keys(error.error)[0]], 'X');
                return of(error)
            })
        ).subscribe()
    }

}
