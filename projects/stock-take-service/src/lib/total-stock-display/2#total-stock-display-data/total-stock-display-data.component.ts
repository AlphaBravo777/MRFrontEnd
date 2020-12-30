import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@ng-stack/forms';
import { IContainerInfoHash } from 'projects/production-service/src/lib/#shared-services/production.interface';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { SnackBarAlertService } from 'src/app/home/core/alerts/snack-bar-alert-service/snack-bar-alert.service';
import { ITotalStockGroupedByBatches } from '../../#shared-services/total-stock.interface';
import { TotalStockFormService } from '../1#total-stock-display-services/total-stock-form.service';
import { TotalStockService } from '../1#total-stock-display-services/total-stock.service';

@Component({
    selector: 'stock-total-stock-display-data',
    templateUrl: './total-stock-display-data.component.html',
    styleUrls: ['./total-stock-display-data.component.scss']
})
export class TotalStockDisplayDataComponent implements OnInit, OnDestroy {

    subscription: Subscription
    totalStockForm: FormArray<ITotalStockGroupedByBatches>
    totalStockData$: Observable<ITotalStockGroupedByBatches[]>
    containerHash$: Observable<IContainerInfoHash>

    constructor(
        private totalStockService: TotalStockService,
        private snackBarAlertService: SnackBarAlertService,
        private totalStockFormService: TotalStockFormService
    ) { }

    ngOnInit(): void {
        this.createTotalStockForm()
    }

    // This is test change 1

    // For the excel sheet it may be best to do most of the hard work in the backend where the programming is easier. 

    // With form, check how many containers there are, then create a form array for those many containers and set each value to null, as you then go through all the contianers in the data, for every container, get its index, and set that index to the amount. Let each container have their number, as well as the wieght and total weight of the container to easily use and add up
    // First we can put all the data into a form, we have to make a null/zero value for all the data that is not available for a container (or leave it undefined and make it null in the contianer element). Maybe we should set the contianer data into a form with a 
    // Then we go through the form, and send all the batches to a batch template
    // Then in the batch template we send all the containers to a container element
    // It should be possible to change each data, and when it changes, in the end we submit that data again, and this changes the stock total. This is also the main view to see how much stock we have on hand. 
    // Let is be able to hide a container column

    private createTotalStockForm() {

        this.totalStockData$ = this.totalStockService.getLatestTotalStockDataPublicAPI()
        this.containerHash$ = this.totalStockService.getContainerHash()

        this.subscription = combineLatest([this.totalStockData$, this.containerHash$]).pipe(
            tap(data => this.totalStockForm = this.totalStockFormService.createTotalStockFormAPI(data[0], data[1])),
            tap(() => console.log('THIS IS THE WORKING DATA: ', this.totalStockForm)),
            catchError(error => {
                this.snackBarAlertService.alertBackendError(error)
                return of(error)
            })
        ).subscribe()
    }

    // private createTotalStockForm() {
    //     const totalStockData$ = this.totalStockService.getLatestTotalStockDataPublicAPI()
    //     const containerHash$ = this.totalStockService.getContainerHash()
    //     this.subscription = this.totalStockService.getLatestTotalStockDataPublicAPI().pipe(
    //         tap(data => console.log('THIS IS THE WORKING DATA: ',data)),
    //         concatMap(() => this.totalStockService.getContainerHash()),
    //         tap(data2 => console.log('This is the container data ',data2)),
    //         map()
    //         catchError(error => {
    //                 this.snackBarAlertService.alertBackendError(error)
    //                 return of(error)
    //             })
    //     ).subscribe()
    // }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}
