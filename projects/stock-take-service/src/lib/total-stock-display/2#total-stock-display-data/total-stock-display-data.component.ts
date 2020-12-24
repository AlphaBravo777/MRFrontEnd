import { Component, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SnackBarAlertService } from 'src/app/home/core/alerts/snack-bar-alert-service/snack-bar-alert.service';
import { TotalStockService } from '../1#total-stock-display-services/total-stock.service';

@Component({
    selector: 'stock-total-stock-display-data',
    templateUrl: './total-stock-display-data.component.html',
    styleUrls: ['./total-stock-display-data.component.scss']
})
export class TotalStockDisplayDataComponent implements OnInit {

    subscription: Subscription

    constructor(
        private totalStockService: TotalStockService,
        private snackBarAlertService: SnackBarAlertService
    ) { }

    ngOnInit(): void {
        this.getTotalStockData()
    }

    private getTotalStockData() {
        this.subscription = this.totalStockService.getLatestTotalStockDataPublicAPI().pipe(
            tap(data => console.log('THIS IS THE WORKING DATA: ',data)),
            // tap(data => this.mainStockForm = this.productStockFormService.createMainStockFormGroup(data)),
            catchError(error => {
                    this.snackBarAlertService.alertBackendError(error)
                    return of(error)
                })
        ).subscribe()
    }

}
