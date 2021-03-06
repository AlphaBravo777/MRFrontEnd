import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { IProductionStockByFactoryArea, IStockTake } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../1#product-stock-services/production-stock.service';
import { ProductStockFormService } from '../1#product-stock-services/product-stock-form.service';
import { FormArray, FormGroup } from '@ng-stack/forms';
import { SnackBarAlertService } from 'src/app/home/core/alerts/snack-bar-alert-service/snack-bar-alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'stock-production-stock-data',
    templateUrl: './production-stock-data.component.html',
    styleUrls: ['./production-stock-data.component.scss']
})
export class ProductionStockDataComponent implements OnInit, OnDestroy {

    stockTakeData$: Observable<IStockTake>
    mainStockForm: FormGroup<IStockTake>;
    subscription: Subscription;
    noDataMessage = "No data found ..."
    errorMessage: string;

    constructor(
        private productionStockService: ProductionStockService,
        private productStockFormService: ProductStockFormService,
        private snackBarAlertService: SnackBarAlertService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getProductionStock()
    }

    getProductionStock() {
        this.stockTakeData$ = this.productionStockService.getStockTakeDataAPI()
        this.subscription = this.stockTakeData$.pipe(
            tap(data => console.log('THIS IS THE WORKING DATA: ',data)),
            tap(data => this.mainStockForm = this.productStockFormService.createMainStockFormGroup(data)),
            catchError(error => {
                    console.error(error)
                    this.snackBarAlertService.alertBackendError(error)
                    return of(error)
                })
        ).subscribe()
    }




    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}
