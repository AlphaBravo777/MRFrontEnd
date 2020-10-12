import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IProductionStockByFactoryArea } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../1#product-stock-services/production-stock.service';
import { ProductStockFormService } from '../1#product-stock-services/product-stock-form.service';
import { FormArray, FormGroup } from '@ng-stack/forms';

@Component({
    selector: 'stock-production-stock-data',
    templateUrl: './production-stock-data.component.html',
    styleUrls: ['./production-stock-data.component.scss']
})
export class ProductionStockDataComponent implements OnInit, OnDestroy {

    productionStockData$: Observable<IProductionStockByFactoryArea[]>
    mainStockForm: FormArray<IProductionStockByFactoryArea>;
    subscription: Subscription;
    noDataMessage = "No data found ..."
    errorMessage: string;

    constructor(
        private productionStockService: ProductionStockService,
        private productStockFormService: ProductStockFormService
    ) { }

    ngOnInit(): void {
        this.getProductionStock()
    }

    getProductionStock() {
        this.productionStockData$ = this.productionStockService.getAllProducts()
        this.subscription = this.productionStockData$.pipe(
            tap(data => this.mainStockForm = this.productStockFormService.createMainStockFormGroup(data)),
        ).subscribe()
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}
